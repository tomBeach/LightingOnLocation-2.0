// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======

// var Actor_Data = initActors(this.pages);
// var Setup_Data = {};
// var Group_Data = {};
// var Menu_Data = {};
// var Target_Data = {};
var displayItems = {
    monitor: { itemName: "monitor", itemText: "Monitor", canvasName: "studioCanvas", can:null, ctx:null, canX:740, canY:10, canW:384, canH:216 },
    studio: { itemName: "studio", itemText: "Studio View", canvaNames: "monitorCanvas", can:null, ctx:null, canX:10, canY:280, canW:720, canH:405 },
    shop: { itemName: "shop", itemText: "Shop Menu" },
    lessons: { itemName: "lessons", itemText: "Lesson Menu" },
    activeLesson: null
}

// ======= ======= ======= ======= ======= initialize ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= initialize ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= initialize ======= ======= ======= ======= =======

var clientApp = {
    pages: null,
    lessons: null,
    activePage: null,
    activeActor: null,
    activeLesson: null,
    displayItems: displayItems,
    monitorImages: [],
    studioImages: [],

    // ======= initialize =======
    initialize: function() {
        console.log("initialize");
        this.targets = initTargets();
        this.items = initItems(this.targets);
        this.pages = initPages(this.items, this.targets);
        this.lessons = initLessons();
        this.activePage = this.pages.page_0_0;
        this.activeLesson = this.lessons.lesson_0;
        this.activeActor = null;
        this.activateDisplayItems();

    },

    // ======= makeLessonPage =======
    makeLessonPage: function(lessonEl) {
        console.log("\n ******* makeLessonPage *******");
        console.log("activeLesson:", clientApp.activeLesson.lessonIndex);
        console.log("activePage:", clientApp.activePage.pageKey);

        this.initLessonCanvases();
        this.clearLessonCanvases();
        this.removeActorsGuides();
        this.makeLessonCanvases();
        this.makeLessonItems();
        this.activateLessonItems();
        if (lessonEl.className == "panelBtn") {
            this.updateLessonText();
        } else {
            this.makeLessonText(lessonEl);
        }
    },

    // ======= initLessonCanvases =======
    initLessonCanvases: function(lesson) {
        console.log("initLessonCanvases");

        if (!this.displayItems["studio"].can) {

            // == make canvas and context objects
            var canvases = ["studio", "monitor"];
            for (var i = 0; i < canvases.length; i++) {
                var can = document.getElementById(canvases[i] + "Canvas");
                var ctx = can.getContext("2d");
                var width = can.offsetWidth;
                var height = can.offsetHeight;
                var scaleFactor = backingScale(ctx);
                console.log("width:", width);
                console.log("height:", height);

                // == detect retina display
                if (scaleFactor > 1) {
                    var canW = width / scaleFactor;
                    var canH = height / scaleFactor;
                    var ctx = can.getContext('2d');
                } else {
                    var canW = width;
                    var canH = height;
                }

                // == store can/ctx on app object
                this.displayItems[canvases[i]].can = can;
                this.displayItems[canvases[i]].ctx = ctx;
                this.displayItems[canvases[i]].canW = canW;
                this.displayItems[canvases[i]].canH = canH;
            }

            // ======= backingScale =======
            function backingScale(context) {
                if ('devicePixelRatio' in window) {
                    if (window.devicePixelRatio > 1) {
                        return window.devicePixelRatio;
                    }
                }
                return 1;
            }
        }
    },

    // ======= makeLessonCanvases =======
    makeLessonCanvases: function(lesson) {
        console.log("makeLessonCanvases");

        if (this.activePage.studio.image) {
            loadCanvasImages("studio");
            loadCanvasImages("monitor");
        }

        // ======= loadCanvasImages =======
        function loadCanvasImages(canvas) {
            console.log("loadCanvasImages");

            // == get frameset params
            var imageFilesArray = [];
            var imageName = clientApp.activePage[canvas].image;
            var startFrame = clientApp.activePage[canvas].startFrame;
            var endFrame = clientApp.activePage[canvas].endFrame + 1;
            var initFrame = clientApp.activePage[canvas].initFrame;

            // == make list of image files for active page canvases
            for (var i = startFrame; i < endFrame; i++) {
                var imageFileName = (imageName + '_' + i + '.png');
                imageFilesArray.push(imageFileName);
            }

            var can = clientApp.displayItems[canvas].can;
            var canW = clientApp.displayItems[canvas].canW;
            var canH = clientApp.displayItems[canvas].canH;
            var ctx = clientApp.displayItems[canvas].ctx;

            // ======= loadNextImage =======
            loadNextImage(null, 0);
            function loadNextImage(image, imageIndex) {
                console.log("loadNextImage");

                // == make image elements; assure image loading via timeout
                var imageString = "images/" + imageFilesArray[imageIndex];
                if (imageIndex < imageFilesArray.length) {
                    var canvasImage = new Image();
                    canvasImage.id = imageName + "_" + imageIndex;
                    canvasImage.src = imageString;
                    canvasImage.onload = function() {
                        setTimeout(function(){
                            if (canvas == "studio") {
                                clientApp.studioImages.push(canvasImage);
                            } else {
                                clientApp.monitorImages.push(canvasImage);
                            }
                            loadNextImage(imageFilesArray[imageIndex++], imageIndex);
                        }, 10);
                    }

                // == display init image (usually first in frameset)
                } else {

                    if (canvas == "studio") {
                        var initImage = clientApp.studioImages[initFrame];
                    } else {
                        var initImage = clientApp.monitorImages[initFrame];
                    }
                    ctx.clearRect(0, 0, 720, 405);
                    ctx.drawImage(initImage, 0, 0, 720, 405, 0, 0, 280, 140);
                    ctx.save();
                }
            }
        }
    },

    // ======= makeLessonItems =======
    makeLessonItems: function() {
        console.log("makeLessonItems");

        var setups = this.activePage.SetupItems;
        var groups = this.activePage.GroupItems;
        var items = this.activePage.MenuItems;
        var actors = this.activePage.ActorItems;
        var targets = this.activePage.TargetItems;
        var guides = this.activePage.guides;
        console.log("setups:", setups);
        console.log("actors:", actors);
        console.log("items:", items);

        var lessonItemsArray = [setups, groups, items, actors, targets];

        for (var i = 0; i < lessonItemsArray.length; i++) {
            if ((lessonItemsArray[i]) && (lessonItemsArray[i].length > 0)) {
                makeItemEls(lessonItemsArray[i]);
                if (guides.length > 0) {
                    this.makeItemGuides(lessonItemsArray[i]);
                }
            }
        }

        // ======= makeItemEls =======
        function makeItemEls(items) {
            console.log("makeItemEls");
            console.log("items:", items);
            var item, itemType, urlString, newDiv, target;
            var locL = clientApp.displayItems.studio.canX + 10;
            var locT = clientApp.displayItems.studio.canY + 10;

            for (var i = 0; i < items.length; i++) {
                item = items[i];
                itemType = item.itemType;
                console.log("itemType:", itemType);

                switch(itemType) {
                    case "grid":
                    newDiv = makeItemHtml(item);
                    $('#grid').css('left', locL + 'px');
                    $('#grid').css('top', locT + 'px');
                    locateGridItem(item, newDiv);
                    break;
                    case "actor":
                    newDiv = makeItemHtml(item);
                    locateNewActor(item, newDiv);
                    break;
                    case "setup":
                    newDiv = makeItemHtml(item);
                    locateNewSetup(item, newDiv);
                    if (item.itemTargets.length > 0) {
                        for (var j = 0; j < item.itemTargets.length; j++) {
                            target = item.itemTargets[j];
                            console.log("target:", target);
                            newDiv = makeTargetHtml(target);
                            locateSetupTarget(target, item, newDiv);
                        }
                    }
                    break;
                }
            }

            // ======= locateSetupTarget =======
            function locateSetupTarget(target, item, newDiv) {
                console.log("locateSetupTarget");
                console.log("target:", target);
                console.log("item:", item);
                console.log("newDiv:", newDiv);
                newDiv.style.left = item.initLoc.L + displayItems.studio.canX + target.initLoc.L + 'px';
                newDiv.style.top = item.initLoc.T + displayItems.studio.canY + target.initLoc.T + 'px';
                newDiv.style.width = target.initLoc.W + 'px';
                newDiv.style.height = target.initLoc.H + 'px';
                $('body').append(newDiv);
            }

            // ======= locateGridItem =======
            function locateGridItem(item, newDiv) {
                console.log("locateGridItem");

                newDiv.style.left = locL + 'px';
                newDiv.style.top = locT + 'px';
                newDiv.style.width = item.initLoc.W + 'px';
                newDiv.style.height = item.initLoc.H + 'px';
                newDiv.style.zIndex = 4;
                $('#grid').append(newDiv);
                if (locT < (locT + items[i].initLoc.H + 10)) {
                    locT = locT + items[i].initLoc.H + 10;
                } else {
                    locT = clientApp.displayItems.studio.canY + 10;
                    locL = clientApp.displayItems.studio.canX + items[i].initLoc.W + 10;
                }
                console.log("locL:", locL);
                console.log("locT:", locT);
            }

            // ======= locateNewActor =======
            function locateNewActor(item, newDiv) {
                console.log("locateNewActor");
                newDiv.style.left = item.initLoc.L + displayItems.studio.canX + 'px';
                newDiv.style.top = item.initLoc.T + displayItems.studio.canY + 'px';
                newDiv.style.width = item.initLoc.W + 'px';
                newDiv.style.height = item.initLoc.H + 'px';
                newDiv.style.zIndex = 4;
                $('#actors').append(newDiv);
            }

            // ======= makeTargetHtml =======
            function makeTargetHtml(item) {
                console.log("makeTargetHtml");
                newDiv = document.createElement('div');
                newDiv.id = item.itemId;
                newDiv.classList.add(item.itemType);
                newDiv.style.position = "absolute";
                newDiv.style.zIndex = 3;
                return newDiv;
            }

            // ======= locateNewSetup =======
            function locateNewSetup(item, newDiv) {
                console.log("locateNewSetup");
                newDiv.style.left = item.initLoc.L + displayItems.studio.canX + 'px';
                newDiv.style.top = item.initLoc.T + displayItems.studio.canY + 'px';
                newDiv.style.width = item.initLoc.W + 'px';
                newDiv.style.height = item.initLoc.H + 'px';
                newDiv.style.zIndex = 2;
                $('#setup').append(newDiv);
            }

            // ======= makeItemHtml =======
            function makeItemHtml(item) {
                console.log("makeItemHtml");
                newDiv = document.createElement('div');
                newDiv.id = item.itemId;
                newDiv.classList.add(item.itemType);
                newDiv.style.position = "absolute";
                if (item.itemImage) {
                    urlString = "url('images/" + item.itemImage + ".png') 0 0";
                    newDiv.style.background = urlString;
                    newDiv.style.backgroundSize =  item.initLoc.W + 'px ' + item.initLoc.H + 'px';
                }
                return newDiv;
            }
        }
    },

    // ======= makeItemGuides =======
    makeItemGuides: function(items) {
        console.log("makeItemGuides");
        console.log("items:", items);

        var item, itemId;
        var guides = this.activePage.guides;

        for (var i = 0; i < items.length; i++) {
            item = items[i];
            itemId = items[i].itemId;
            console.log("itemId:", itemId);

            for (var i = 0; i < guides.length; i++) {
                var guideId = guides[i].itemId;
                console.log("guideId:", guideId);
                if (guideId == itemId) {
                    makeItemGuide(item);
                }
            }

            // ======= makeItemGuide =======
            function makeItemGuide(item) {
                console.log("makeItemGuide");

                // == make svg guide elements
                var guidesEl = document.getElementById("guides");
                guidesEl.style.position = "absolute";
                guidesEl.style.left = (item.bounds.L + displayItems.studio.canX) + 'px';
                guidesEl.style.top = (item.bounds.T + displayItems.studio.canY + 30) + 'px';
                guidesEl.style.width = item.bounds.W + 'px';
                guidesEl.style.height = item.bounds.H + 'px';
                guidesEl.style.zIndex = 1;

                var data = [[0, item.bounds.H], [item.bounds.W, 0]];
                var line = d3.line(data);
                var lineGenerator = d3.line();
                var pathString = lineGenerator(data);

                // == make svg line element
                var svgEl = d3.select(guidesEl)
                    .append("svg")
                        .attr("width", item.bounds.W)
                        .attr("height", item.bounds.H);
                svgEl.append("path");
                d3.select('path')
                	.attr('d', pathString)
                    .style("stroke", "red")
                    .style("stroke-weight", "2")
                    .style("fill", "none");
            }
        }
    },

    // ======= makeLessonMenu =======
    makeLessonMenu: function(menu) {
        console.log("makeLessonMenu");
        var index = -1;
        var menuHtml = "<ul id='lessonMenu'>";
        $.each(this.lessons, function(key, lesson) {
            index++;
            menuHtml += clientApp.makeMenuItem(key, lesson, "lesson", index);
        });
        $('#shopLesson_display').html(menuHtml);
    },

    // ======= makeMenuItem =======
    makeMenuItem: function(key, lesson, menuType, index) {
        console.log("makeMenuItem");
        var itemHtml = ""
        if (index > 2) {
            var menuState = "lessonItem inactive";
        } else {
            var menuState = "lessonItem active";
        }
        switch(menuType) {
            case "lesson":
            itemHtml += "<li><div id='" + key + "' class='" + menuState + "'>";
            itemHtml += "<span class='menu_title_active'>" + lesson.lessonIndex + " - " + lesson.lessonTitle + "</span>"
            itemHtml += "<span class='menu_text_active'>" + lesson.lessonSubtitle + "</span>"
            itemHtml += "</div>";
            break;
            case "grid":
            itemHtml += "<div class='grid_item'>";
            itemHtml += "<img class='grid_image' src='images/f150_0.png' alt='f150'>";
            itemHtml += "<span class='grid_text'>150W</span>";
            itemHtml += "</div>";
            break;
        }
        return itemHtml;
    },

    // ======= makeMenuGrid =======
    makeMenuGrid: function(item) {
        console.log("makeMenuGrid");
        console.log("this.activeLesson:", this.activeLesson);
        menuHtml = clientApp.makeMenuItem(null, this.activeLesson, "grid");
        $('#shopLesson_display').html(menuHtml);
    },

    // ======= updateLessonText =======
    updateLessonText: function(errorText) {
        console.log("updateLessonText");

        // == no page found... display msg
        if (errorText) {
            var lessonText = errorText;
        } else {
            var lessonText = clientApp.activePage.pageText;
        }

        // == update title/subtile
        $('.menu_title_active').text(clientApp.activeLesson.lessonIndex + " - " + clientApp.activeLesson.lessonTitle);
        $('.menu_text_active').text(clientApp.activeLesson.lessonSubtitle);

        if ($('#lessonText').length > 0) {
            $('#lessonText').animate({
                height: 0,
                opacity: 0
            }, 500, function() {
                console.log("collapsed");
                // == replace prev lesson text with new text
                $('#lessonText').children('p').html(lessonText);
                $('#lessonText').animate({
                    height: "200px",
                    opacity: 1.0
                }, 500, function() {
                    console.log("expanded");
                });
            });
        } else {

            // == replace lessons list with lesson text
            var lessonBox = $('#shopLesson_display');
            var lessonTextHtml = "<div id='lessonText' class='hide'><p>" + lessonText + "</p></div>";
            $(lessonBox).append(lessonTextHtml);
            $('#lessonText').removeClass('hide');
            $('#lessonText').animate({
                height: "200px",
                opacity: 1.0
            }, 500, function() {
                console.log("expanded");
            });
        }
    },

    // ======= makeLessonText =======
    makeLessonText: function(lessonEl) {
        console.log("makeLessonText");

        var navPanel = "";

        // == get selected lesson elements
        var lessonId = $(lessonEl).attr('id');
        var lessonBox = $('#shopLesson_display');
        var lessonHtml = $(lessonEl).parents().eq(0).html();

        // == make prevNext openClose buttons
        navPanel += "<nav id='navPanel'><div id='prevBtn' class='panelBtn'><span>P</span></div>";
        navPanel += "<div id='nextBtn' class='panelBtn'><span>N</span></div></nav>";

        // == get all lesson elements
        var lessonItems = $('.lessonItem:gt(1)');
        var index = $(lessonItems).index(lessonEl);

        // == replace lesson menu with selected lesson and lesson text
        $('#' + lessonId).parents().eq(1).remove();
        $(lessonBox).append(lessonHtml);

        // == change lesson container class to hold prevNext buttons
        $('#' + lessonId).removeClass('lessonItem');
        $('#' + lessonId).addClass('selectedLesson');
        $(lessonBox).append(navPanel);

        this.updateLessonText();
        this.activatePrevNext();
    },

    // ======= selectSectionItem =======
    selectSectionItem: function(item) {
        console.log("selectSectionItem");
        var itemId = $(item).attr('id');

        switch (itemId) {
            case "lessons":
                deselectItem("shop");
                selectItem(itemId);
                this.removeGridItems();
                this.makeLessonMenu();
                this.activateMenuItems("lessonMenu");
                break;
            case "shop":
                deselectItem("lessons");
                selectItem(itemId);
                this.removeLessonItems();
                this.makeMenuGrid();
                this.activateMenuGrid("lessonMenu");
                break;
        }

        // == modify tab css between selected and active states
        function selectItem(itemId) {
            // console.log("selectItem");
            var itemParentId = $('#' + itemId).parent('div').attr('id');
            $('#' + itemParentId).removeClass('tab_box_active');
            $('#' + itemParentId).addClass('tab_box_selected');
            $('#' + itemId).removeClass('label_text_active');
            $('#' + itemId).addClass('label_text_selected');
        }

        function deselectItem(itemId) {
            // console.log("deselectItem");
            var itemParentId = $('#' + itemId).parent('div').attr('id');
            $('#' + itemParentId).removeClass('tab_box_selected');
            $('#' + itemParentId).addClass('tab_box_active');
            $('#' + itemId).removeClass('label_text_selected');
            $('#' + itemId).addClass('label_text_active');
        }
    },

// ======= ======= ======= ACTIVATORS ======= ======= =======
// ======= ======= ======= ACTIVATORS ======= ======= =======
// ======= ======= ======= ACTIVATORS ======= ======= =======

    // ======= activateLessonItems =======
    activateLessonItems: function() {
        console.log("activateLessonItems");

        var setups = this.activePage.SetupItems;
        var groups = this.activePage.GroupItems;
        var items = this.activePage.MenuItems;
        var actors = this.activePage.ActorItems;
        var targets = this.activePage.TargetItems;
        var guides = this.activePage.guides;
        console.log("setups:", setups);
        console.log("actors:", actors);
        console.log("items:", items);
        var lessonItemsArray = [setups, groups, items, actors, targets];

        for (var i = 0; i < lessonItemsArray.length; i++) {
            for (var i = 0; i < lessonItemsArray.length; i++) {
                if ((lessonItemsArray[i]) && (lessonItemsArray[i].length > 0)) {
                    activatePageItems(lessonItemsArray[i]);
                }
            }
        }

        // ======= activatePageItems =======
        function activatePageItems(items) {
            console.log("activatePageItems");

            for (var i = 0; i < items.length; i++) {
                $('#' + items[i].itemId).on('mousedown', function(e) {
                    console.log("\nmousedown");
                    console.log("clientApp.items:", clientApp.items);
                    var actor = clientApp.items[$(e.currentTarget).attr('id')];
                    var actorEl = $(e.currentTarget);
                    e.preventDefault();
                    clientApp.activeActor = actor;
                    actor.initMove(e, actorEl, actor);
                });
                $('#' + items[i].itemId).on('mouseenter', function(e) {
                    // console.log("\nmouseenter");
                    clientApp.toggleHoverText(e.currentTarget, "actor");
                });
                $('#' + items[i].itemId).on('mouseleave', function(e) {
                    // console.log("\nmouseleave");
                    clientApp.toggleHoverText(null, null);
                });
            }
        }
    },

    // ======= activateMenuGrid =======
    activateMenuGrid: function() {
        console.log("activateMenuGrid");
    },

    // ======= activateDisplayItems =======
    activateDisplayItems: function() {
        console.log("activateDisplayItems");

        // == studio, shop, lesson select (CLICK)
        $(".label_text_selected, .label_text_active").on('click', function(e) {
            // console.log("\n-- click");
            e.stopPropagation();
            clientApp.selectSectionItem(e.currentTarget);
        });

        // == studio, shop, lesson hover text (ENTER/LEAVE)
        $(".label_text_selected, .label_text_active").on('mouseenter', function(e) {
            // console.log("\n-- mouseenter");
            clientApp.toggleHoverText(e.currentTarget, "display");
            e.stopPropagation();
        });
        $(".label_text_selected, .label_text_active").on('mouseleave', function(e) {
            // console.log("\n-- mouseleave");
            clientApp.toggleHoverText(null, null);
            e.stopPropagation();
        });

    },

    // ======= activateMenuItems =======
    activateMenuItems: function(menu) {
        console.log("activateMenuItems");

        switch(menu) {
            case "lessonMenu":

            // == select lesson (CLICK)
            $('#lessonMenu').children('li').children('div').on('click', function(e) {
                console.log("\n-- click LESSON menu");
                clientApp.activeLesson = clientApp.lessons[e.currentTarget.id];
                clientApp.activePage = clientApp.pages["page_" + clientApp.lessons[e.currentTarget.id].lessonIndex + "_" + "0"];
                clientApp.makeLessonPage(e.currentTarget);
                e.stopPropagation();
            });

            // == lesson menu hover text
            $('#lessonMenu').children('li').children('div').on('mouseenter', function(e) {
                // console.log("\n-- mouseenter");
                clientApp.activeLesson = e.currentTarget;
                clientApp.toggleHoverText(e.currentTarget, "lesson");
                e.stopPropagation();
            });
            $('#lessonMenu').children('li').children('div').on('mouseleave', function(e) {
                // console.log("\n-- mouseleave");
                clientApp.toggleHoverText(null, null);
                e.stopPropagation();
            });
            break;
        }
    },

    // ======= activatePrevNext =======
    activatePrevNext: function() {
        console.log("activatePrevNext");

        $('#navPanel').children('div').on('click', function(e) {
            console.log("\n -- click PREV/NEXT buttons");
            var lessonPage = clientApp.getNextPage(e.currentTarget.id);
            if ((lessonPage[0] != null) && (lessonPage[1] != null))   {
                var nextLessonName = "lesson_" + lessonPage[0];
                var nextPageName = "page_" + lessonPage[0] + "_" + lessonPage[1];
                if (clientApp.lessons[nextLessonName] && clientApp.pages[nextPageName]) {
                    clientApp.activeLesson = clientApp.lessons[nextLessonName];
                    clientApp.activePage = clientApp.pages[nextPageName];
                    clientApp.makeLessonPage(e.currentTarget);
                } else {
                    clientApp.updateLessonText("Sorry... requested page is missing.  Please return to home page");
                }
            } else {
                clientApp.updateLessonText("Sorry... requested page is missing.  Please return to home page");
            }
        });
        $('#navPanel').children('div').on('mouseenter', function(e) {
            // console.log("-- mouseenter");
            clientApp.toggleHoverText(e.currentTarget, null);
        });
        $('#navPanel').children('div').on('mouseleave', function(e) {
            // console.log("-- mouseleave");
            clientApp.toggleHoverText(e.currentTarget, null);
        });
    },

    // ======= getNextPage =======
    getNextPage: function(prevOrNext) {
        console.log("getNextPage");
        console.log("prevOrNext:", prevOrNext);

        var lessonIndex = parseInt(clientApp.activeLesson.lessonIndex);
        var lessonCount = _.size(clientApp.lessons);
        var pageIndex = parseInt(clientApp.activePage.pageKey.split("_")[1]);
        var pageCount = clientApp.activeLesson.pageKeys.length;

        if (pageCount > 0) {

            // == loop through pages of active lesson
            for (var i = 0; i < pageCount; i++) {
                var checkLessonIndex = parseInt(clientApp.activeLesson.pageKeys[i].split("_")[0]);
                var checkPageIndex = parseInt(clientApp.activeLesson.pageKeys[i].split("_")[1]);

                // == current page found
                if ((lessonIndex == checkLessonIndex) && (pageIndex == checkPageIndex)) {
                    if (prevOrNext == "nextBtn") {
                        var nextPageIndex = parseInt(pageIndex + 1);
                        if (nextPageIndex >= pageCount) {
                            var nextLessonIndex = parseInt(lessonIndex + 1);
                            var nextPageIndex = 0;
                            if (nextLessonIndex == lessonCount) {
                                var nextLessonIndex = 0;
                            }
                        } else {
                            var nextLessonIndex = lessonIndex;
                        }
                    } else if (prevOrNext == "prevBtn") {
                        var nextPageIndex = parseInt(pageIndex - 1);
                        console.log("nextPageIndex:", nextPageIndex);
                        if (nextPageIndex < 0) {
                            var nextLessonIndex = parseInt(lessonIndex - 1);
                            console.log("nextLessonIndex:", nextLessonIndex);
                            if (nextLessonIndex >= 0) {
                                var lessonName = "lesson_" + nextLessonIndex;
                                console.log("lessonName:", lessonName);
                                var nextPageIndex = parseInt(clientApp.lessons[lessonName].pageKeys.length - 1);
                            } else {
                                var nextLessonIndex = 0;
                            }
                        } else {
                            var nextLessonIndex = lessonIndex;
                        }
                    }
                    return [nextLessonIndex, nextPageIndex]
                }
                    }
        }
    },

    // ======= ======= ======= UTILITIES ======= ======= =======
    // ======= ======= ======= UTILITIES ======= ======= =======
    // ======= ======= ======= UTILITIES ======= ======= =======

    // ======= updateCanvas =======
    updateCanvas: function(left, top, frameIndex) {
        // console.log("updateCanvas");

        // == canvas parameters
        var studioImage = clientApp.studioImages[frameIndex];
        var studioString = ('images/' + studioImage + '_' + frameIndex + '.png');
        var studioCan = document.getElementById("studioCanvas");
        var studioCtx = studioCan.getContext("2d");
        studioCtx.clearRect(0, 0, 720, 405);
        studioCtx.drawImage(studioImage, 0, 0, 720, 405, 0, 0, 280, 140);

        var monitorImage = clientApp.monitorImages[frameIndex];
        var monitorString = ('images/' + monitorImage + '_' + frameIndex + '.png');
        var monitorCan = document.getElementById("monitorCanvas");
        var monitorCtx = monitorCan.getContext("2d");
        monitorCtx.clearRect(0, 0, 384, 180);
        monitorCtx.drawImage(monitorImage, 0, 0, 720, 405, 0, 0, 280, 140);
    },

    // ======= clearLessonCanvases =======
    clearLessonCanvases: function() {
        console.log("clearLessonCanvases");

        var canvases = ["studio", "monitor"];
        for (var i = 0; i < canvases.length; i++) {
            this.displayItems[canvases[i]].ctx.clearRect(0, 0, 720, 405);
        }
    },

    // ======= removeActorsGuides =======
    removeActorsGuides: function() {
        console.log("removeActorsGuides");
        var actors = $('#actors').empty();
        var guides = $('#guides').empty();
        var actors = $('#grid').empty();
        var actors = $('#setup').empty();
    },

    // ======= removeLessonItems =======
    removeLessonItems: function() {
        console.log("removeLessonItems");
        var lessonItems = $('#lessonMenu').remove();
    },

    // ======= removeGridItems =======
    removeGridItems: function(menu) {
        console.log("removeGridItems");
        var gridItems = $('.grid_item').remove();
    },

    // ======= toggleHoverText =======
    toggleHoverText: function(item, itemType) {
        // console.log("toggleHoverText');
        if ($(item).attr('id')) {
            if (itemType == "display") {
                var itemText = clientApp.displayItems[$(item).attr('id')].itemText;
            } else if (itemType == "lesson") {
                var itemText = clientApp.lessons[$(item).attr('id')].itemText;
            } else if (itemType == "actor") {
                var itemText = clientApp.items[$(item).attr('id')].itemText;
            } else {
                var itemText = $(item).attr('id');
            }
            $('#hover_text').text(itemText);
        } else {
            $('#hover_text').text('');
        }
    }

};

clientApp.initialize();
