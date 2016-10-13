// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======

// var Actor_Data = initActors(this.pages);
// var Setup_Data = {};
// var Group_Data = {};
// var Menu_Data = {};
// var Target_Data = {};

var displayItems = {
    monitor: { itemName: "monitor", itemText: "Monitor", canvasName: "studioCanvas", can:null, ctx:null, canX:740, canY:10, canW:384, canH:180 },
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
        this.actors = initActors();
        this.pages = initPages(this.actors);
        this.lessons = initLessons();
        this.activePage = this.pages.page_0_0;
        this.activeLesson = this.lessons.lesson_0;
        this.activeActor = null;
        this.activateDisplayItems();

    },

    // ======= makeLessonPage =======
    makeLessonPage: function(lessonEl) {
        console.log("\n ******* makeLessonPage *******");
        console.log("activateLesson:", clientApp.activeLesson.lessonIndex);
        console.log("activatePage:", clientApp.activePage.pageKey);

        this.initLessonCanvases();
        this.clearLessonCanvases();
        this.makeLessonCanvases();
        this.makeLessonActors();
        this.activateLessonActors();
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

    // ======= makeLessonActors =======
    makeLessonActors: function() {
        console.log("makeLessonActors");

        if (this.activePage.ActorItems.length > 0) {
            var actor, urlString, newDiv;
            for (var i = 0; i < this.activePage.ActorItems.length; i++) {
                actor = this.activePage.ActorItems[i];
                urlString = "url('images/" + this.activePage.ActorItems[i].actorImage + ".png') 0 0";
                newDiv = document.createElement('div');
                newDiv.id = this.activePage.ActorItems[i].actorId;
                newDiv.classList.add(this.activePage.ActorItems[i].actorType);
                newDiv.style.left = this.activePage.ActorItems[i].initLoc.L + displayItems.studio.canX + 'px';
                newDiv.style.top = this.activePage.ActorItems[i].initLoc.T + displayItems.studio.canY + 'px';
                newDiv.style.width = this.activePage.ActorItems[i].initLoc.W + 'px';
                newDiv.style.height = this.activePage.ActorItems[i].initLoc.H + 'px';
                newDiv.style.position = "absolute";
                newDiv.style.zIndex = 2;
                newDiv.style.background = urlString;
                newDiv.style.backgroundSize =  this.activePage.ActorItems[i].initLoc.W + 'px ' + this.activePage.ActorItems[i].initLoc.H + 'px';
                $('#actors').append(newDiv);

                this.makeActorGuides(actor);
            }
        }
    },

    // ======= makeActorGuides =======
    makeActorGuides: function(actor) {
        console.log("makeActorGuides");

        // == make svg guide elements
        var guidesEl = document.getElementById("guides");
        guidesEl.style.position = "absolute";
        guidesEl.style.left = (actor.locator.L + displayItems.studio.canX) + 'px';
        guidesEl.style.top = (actor.locator.T + displayItems.studio.canY + 30) + 'px';
        guidesEl.style.width = actor.locator.W + 'px';
        guidesEl.style.height = actor.locator.H + 'px';
        guidesEl.style.zIndex = 1;

        var data = [[0, actor.locator.H], [actor.locator.W, 0]];
        var line = d3.line(data);
        var lineGenerator = d3.line();
        var pathString = lineGenerator(data);

        // == make svg line element
        var svgEl = d3.select(guidesEl)
            .append("svg")
                .attr("width", actor.locator.W)
                .attr("height", actor.locator.H);
        svgEl.append("path");
        d3.select('path')
        	.attr('d', pathString)
            .style("stroke", "red")
            .style("stroke-weight", "2")
            .style("fill", "none");
    },

    // ======= makeLessonMenu =======
    makeLessonMenu: function(menu) {
        console.log("makeLessonMenu");
        var menuHtml = "<ul id='lessonMenu'>";
        $.each(this.lessons, function(key, lesson) {
            menuHtml += clientApp.makeMenuItem(key, lesson, "lesson");
        });
        $('#shopLesson_display').html(menuHtml);
    },

    // ======= makeMenuItem =======
    makeMenuItem: function(key, lesson, menuType) {
        console.log("makeMenuItem");
        var itemHtml = ""
        switch(menuType) {
            case "lesson":
            itemHtml += "<li><div id='" + key + "' class='lessonItem'>";
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

    // ======= makeGridMenu =======
    makeGridMenu: function(item) {
        console.log("makeGridMenu");
        console.log("this.activeLesson:", this.activeLesson);
        menuHtml = clientApp.makeMenuItem(null, this.activeLesson, "grid");
        $('#shopLesson_display').html(menuHtml);
    },

    // ======= updateLessonText =======
    updateLessonText: function(errorText) {
        console.log("updateLessonText");
        console.log("errorText: ", errorText);
        console.log("$('#lessonText').length:", $('#lessonText').length);

        if (errorText) {
            var lessonBox = $('#shopLesson_display');
            var lessonText = errorText;
            var lessonTextHtml = "<div id='lessonText' class='hide'><p>" + lessonText + "</p></div>";
            $(lessonBox).append(lessonTextHtml);
            $('#lessonText').removeClass('hide');
            $('#lessonText').animate({
                height: "200px",
                opacity: 1.0
            }, 500, function() {
                console.log("done");
            });
        } else {
            if ($('#lessonText').length > 0) {
                $('#lessonText').animate({
                    height: 0,
                    opacity: 0
                }, 500, function() {
                    console.log("done");
                    // == replace prev lesson text with new text
                    console.log("clientApp.activePage.pageText:", clientApp.activePage.pageText);
                    $('#lessonText').children('p').html(clientApp.activePage.pageText);
                    $('#lessonText').animate({
                        height: "200px",
                        opacity: 1.0
                    }, 500, function() {
                        console.log("done");
                    });
                });
            } else {

                // == replace lessons list with lesson text
                console.log("clientApp.activePage.pageText:", clientApp.activePage.pageText);
                var lessonBox = $('#shopLesson_display');
                var lessonText = clientApp.activePage.pageText;
                var lessonTextHtml = "<div id='lessonText' class='hide'><p>" + lessonText + "</p></div>";
                $(lessonBox).append(lessonTextHtml);
                $('#lessonText').removeClass('hide');
                $('#lessonText').animate({
                    height: "200px",
                    opacity: 1.0
                }, 500, function() {
                    console.log("done");
                });
            }
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
        console.log("lessonId:", lessonId);
        console.log("lessonBox:", lessonBox);

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
                this.makeGridMenu();
                this.activateGridItems("lessonMenu");
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

    // ======= activateLessonActors =======
    activateLessonActors: function() {
        console.log("activateLessonActors");

        if (this.activePage.ActorItems.length > 0) {
            for (var i = 0; i < this.activePage.ActorItems.length; i++) {
                $('#' + this.activePage.ActorItems[i].actorId).on('mousedown', function(e) {
                    console.log("\nmousedown");
                    var actor = clientApp.actors[$(e.currentTarget).attr('id')];
                    var dragger = $(e.currentTarget);
                    e.preventDefault();
                    clientApp.activeActor = actor;
                    actor.initDrag(e, dragger, actor);
                });
                $('#' + this.activePage.ActorItems[i].actorId).on('mouseenter', function(e) {
                    // console.log("\nmouseenter");
                    clientApp.toggleHoverText(e.currentTarget, "actor");
                });
                $('#' + this.activePage.ActorItems[i].actorId).on('mouseleave', function(e) {
                    // console.log("\nmouseleave");
                    clientApp.toggleHoverText(null, null);
                });
            }
        }
    },

    // ======= activateGridItems =======
    activateGridItems: function() {
        console.log("activateGridItems");
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
                console.log("activeLesson:", clientApp.activeLesson.lessonIndex);
                console.log("activePage:", clientApp.activePage.pageKey);
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

        // == loop through pages of active lesson
        for (var i = 0; i < pageCount; i++) {
            var checkLessonIndex = clientApp.activeLesson.pageKeys[i].split("_")[0];
            var checkPageIndex = clientApp.activeLesson.pageKeys[i].split("_")[1];

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
                    if (nextPageIndex < 0) {
                        var nextLessonIndex = parseInt(lessonIndex - 1);
                        if (nextLessonIndex >= 0) {
                            var nextPageIndex = clientApp.lessons["lesson_ " + nextLessonIndex].pageKeys.length - 1;
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
                var itemText = clientApp.actors[$(item).attr('id')].actorText;
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
