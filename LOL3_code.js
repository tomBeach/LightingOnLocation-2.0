
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======

var displayItems = {
    monitor: { itemName: "monitor", itemText: "Monitor", canvasName: "studioCanvas", can:null, ctx:null, canW:384, canH:180 },
    studio: { itemName: "studio", itemText: "Studio View", canvaNames: "monitorCanvas", can:null, ctx:null, canW:720, canH:405 },
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
        this.lessons = initLessons();
        this.actors = initActors();
        this.pages = initPages(this.actors);
        this.activePage = this.pages.page_0_01;
        this.activeActor = this.activePage.ActorItems[0];
        this.activateDisplayItems();
    },

    // ======= makeLessonPage =======
    makeLessonPage: function(lesson) {
        console.log("makeLessonPage");

        this.makeLessonText(lesson);
        this.makeLessonActors();
        this.initLessonCanvases();
        this.makeLessonCanvases();
        this.makeActorGuides();
        this.activateLessonActors();

    },

    // ======= makeLessonText =======
    makeLessonText: function(lesson) {
        console.log("makeLessonText");

        // == get selected lesson elements
        var lessonText = clientApp.activePage.pageText;
        var lessonId = $(lesson).attr('id');
        var lessonHtml = $(lesson).parents().eq(0).html();
        var lessonBox = $('#' + lessonId).parents().eq(2);

        // == make prevNext openClose buttons
        var navPanel = "<nav id='navPanel'><div id='prev' class='panelBtn'><span>P</span></div>";
        var navPanel += "<div id='next' class='panelBtn'><span>N</span></div></nav>";

        // == get all lesson elements
        var lessonItems = $('.lessonItem:gt(1)');
        var lessonItems = $('.lessonItem');
        var index = $(lessonItems).index(lesson);

        // == replace lesson menu with lesson text
        $('#' + lessonId).parents().eq(1).remove();
        $(lessonBox).append(lessonHtml);
        var lessonTextHtml = "<div class='lessonText hide'><p>" + lessonText + "</p></div>";
        $(lessonBox).append(lessonTextHtml);
        $( ".lessonText" ).animate({
            height: "200px",
            opacity: 1.0
        }, 500, function() {
            console.log("done");
        });

    },

    // ======= makeLessonActors =======
    makeLessonActors: function() {
        console.log("makeLessonActors");

        for (var i = 0; i < this.activePage.ActorItems.length; i++) {
            var urlString = "url('images/" + this.activePage.ActorItems[i].actorImage + ".png') 0 0";
            var newDiv = document.createElement('div');
            newDiv.id = this.activePage.ActorItems[i].actorId;
            newDiv.classList.add(this.activePage.ActorItems[i].actorType);
            newDiv.style.left = this.activePage.ActorItems[i].initLoc.X + 'px';
            newDiv.style.top = this.activePage.ActorItems[i].initLoc.Y + 'px';
            newDiv.style.width = this.activePage.ActorItems[i].initLoc.W + 'px';
            newDiv.style.height = this.activePage.ActorItems[i].initLoc.H + 'px';
            newDiv.style.position = "absolute";
            newDiv.style.zIndex = 10;
            newDiv.style.background = urlString;
            newDiv.style.backgroundSize =  this.activePage.ActorItems[i].initLoc.W + 'px ' + this.activePage.ActorItems[i].initLoc.H + 'px';
            $('#actors').append(newDiv);
        }
    },

    // ======= initLessonCanvases =======
    initLessonCanvases: function(lesson) {
        console.log("initLessonCanvases");

        var canvases = ["studio", "monitor"];
        for (var i = 0; i < canvases.length; i++) {
            var can = document.getElementById(canvases[i] + "Canvas");
            var ctx = can.getContext("2d");
            var width = can.offsetWidth;
            var height = can.offsetHeight;
            var scaleFactor = backingScale(ctx);

            if (scaleFactor > 1) {
                var canW = width / scaleFactor;
                var canH = height / scaleFactor;
                var ctx = can.getContext('2d');
            } else {
                var canW = width;
                var canH = height;
            }
            displayItems[canvases[i]].can = can;
            displayItems[canvases[i]].canW = canW;
            displayItems[canvases[i]].canH = canH;
            displayItems[canvases[i]].ctx = ctx;
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
    },

    // ======= makeLessonCanvases =======
    makeLessonCanvases: function(lesson) {
        console.log("makeLessonCanvases");

        loadCanvasImages("studio");
        loadCanvasImages("monitor");

        // ======= loadCanvasImages =======
        function loadCanvasImages(canvas) {
            console.log("loadCanvasImages");

            var imageFilesArray = [];
            var imageName = clientApp.activePage[canvas].image;
            var startFrame = clientApp.activePage[canvas].startFrame;
            var endFrame = clientApp.activePage[canvas].endFrame + 1;
            var initFrame = clientApp.activePage[canvas].initFrame;

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
                        }, 50);
                    }
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

    // ======= makeActorGuides =======
    makeActorGuides: function() {
        console.log("makeActorGuides");

        var canW = this.activeActor.bounds.R - this.activeActor.bounds.L;
        var canH = this.activeActor.bounds.B - this.activeActor.bounds.T;

        // ======= elements =======
        var guidesEl = document.getElementById("guides");
        guidesEl.style.position = "absolute";
        guidesEl.style.left = this.activeActor.bounds.L + 'px';
        guidesEl.style.top = this.activeActor.bounds.T + 30 + 'px';
        guidesEl.style.width = canW + 'px';
        guidesEl.style.height = canH + 'px';
        guidesEl.style.zIndex = 10;

        var data = [[0, canH], [canW, 0]];
        var line = d3.line(data);

        var lineGenerator = d3.line();
        var pathString = lineGenerator(data);

        var svgEl = d3.select(guidesEl)
            .append("svg")
                .attr("width", canW)
                .attr("height", canH);

        svgEl.append("path");
        d3.select('path')
        	.attr('d', pathString)
            .style("stroke", "red")
            .style("stroke-weight", "2")
            .style("fill", "none");
    },

    // ======= makeMenuItem =======
    makeMenuItem: function(key, lesson, menuType) {
        console.log("makeMenuItem");
        var itemHtml = ""
        switch(menuType) {
            case "lesson":
                itemHtml += "<li><div id='" + key + "' class='lessonItem'>";
                itemHtml += "<p class='menu_title_active'>" + lesson.lessonTitle + "</p>"
                itemHtml += "<p class='menu_text_active'>" + lesson.lessonSubtitle + "</p>"
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

    // ======= makeLessonMenu =======
    makeLessonMenu: function(menu) {
        console.log("makeLessonMenu");
        var menuHtml = "<ul id='lessonMenu'>";
        $.each(this.lessons, function(key, lesson) {
            menuHtml += clientApp.makeMenuItem(key, lesson, "lesson");
        });
        $('#shopLesson_display').html(menuHtml);
    },

    // ======= makeGridMenu =======
    makeGridMenu: function(item) {
        console.log("makeGridMenu");
        console.log("this.activeLesson:", this.activeLesson);
        menuHtml = clientApp.makeMenuItem(null, this.activeLesson, "grid");
        $('#shopLesson_display').html(menuHtml);
    },

    // ======= activateGridItems =======
    activateGridItems: function() {
        console.log("activateGridItems");
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

    // ======= getNextPage =======
    getNextPage: function(pageRequest) {
        console.log("getNextPage");

        var lessonIndex = clientApp.activeLesson.lessonIndex;
        var pageIndex = getPageIndex();
        switch(pageRequest) {
            case "prev":
            if (lessonIndex > 0) {
                var nextLesson = lessonIndex - 1;
            } else {
                var nextLesson = 0;
            }
            case "next":
            if (lessonIndex < clientApp.lessons.length) {
                var nextLesson = lessonIndex + 1;
            } else {
                var nextLesson = clientApp.lessons.length - 1;
            }
        }

        // ======= getPageIndex =======
        function getPageIndex() {
            console.log("getPageIndex");
            $.each(clientApp.activeLesson.pages, function(key, value) {

            })
        }
    },

    // ======= activateLessonActors =======
    activateLessonActors: function() {
        console.log("activateLessonActors");

        for (var i = 0; i < this.activePage.ActorItems.length; i++) {
            $('#' + this.activePage.ActorItems[i].actorId).on('mousedown', function(e) {
                console.log("\nmousedown");
                var actor = clientApp.actors[$(e.currentTarget).attr('id')];
                var dragger = $(e.currentTarget);
                e.preventDefault();
                actor.initMove(e, dragger, actor);
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

    },

    // ======= activateMenuItems =======
    activateMenuItems: function(menu) {
        console.log("activateMenuItems");

        switch(menu) {
            case "panelNav":

                // == select panel button (CLICK)
                $('#panelNav').children('div').on('click', function(e) {
                    console.log("\n-- click");
                    console.log("e.currentTarget.id:", e.currentTarget.id);
                    clientApp.getNextPage(e.currentTarget);
                    clientApp.makeLessonPage(e.currentTarget);
                    e.stopPropagation();
                });
                break;

            case "lessonMenu":

                // == select lesson (CLICK)
                $('#lessonMenu').children('li').children('div').on('click', function(e) {
                    console.log("\n-- click");
                    clientApp.displayItems.activeLesson = e.currentTarget;
                    console.log("e.currentTarget.id:", e.currentTarget.id);
                    clientApp.activeLesson = e.currentTarget.id;
                    clientApp.makeLessonPage(e.currentTarget);
                    e.stopPropagation();
                });

                // == lesson menu hover text
                $('#lessonMenu').children('li').children('div').on('mouseenter', function(e) {
                    // console.log("\n-- mouseenter");
                    clientApp.displayItems.activeLesson = e.currentTarget;
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

    // ======= updateCanvas =======
    updateCanvas: function(left, top, frameIndex) {
        // console.log("updateCanvas");

        // == move actor to new location
        $(clientApp.activeActor.actorEl).css('top', top + 'px');
        $(clientApp.activeActor.actorEl).css('left', left + 'px');

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

    // ======= toggleHoverText =======
    toggleHoverText: function(item, itemType) {
        // console.log("toggleHoverText');
        if ($(item).attr('id')) {
            if (itemType == "display") {
                var itemText = clientApp.displayItems[$(item).attr('id')].itemText;
            } else if (itemType == "lesson") {
                var itemText = clientApp.lessons[$(item).attr('id')].itemText;
            } else if (itemType == "actor") {
                var itemText = clientApp.activeActor.actorText;
            }
            $('#hover_text').text(itemText);
        } else {
            $('#hover_text').text('');
        }
    }

};

clientApp.initialize();
