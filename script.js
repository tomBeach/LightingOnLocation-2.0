
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======

// var Actor_Data = initActors(this.pages);
// var Setup_Data = {};
// var Group_Data = {};
// var Menu_Data = {};
// var Target_Data = {};

var displayItems = {
    monitor: { itemName: "monitor", itemText: "Monitor", canW:384, canH:180 },
    studio: { itemName: "studio", itemText: "Studio View", canW:720, canH:405 },
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

    // ======= activateLessonActors =======
    activateLessonActors: function() {
        console.log("activateLessonActors");

        for (var i = 0; i < this.activePage.ActorItems.length; i++) {
            $('#' + this.activePage.ActorItems[i].actorId).on('mousedown', function(e) {
                console.log("\nmousedown");
                var actor = clientApp.actors[$(e.currentTarget).attr('id')];
                var dragger = $(e.currentTarget);
                console.log("actor:", actor);
                e.preventDefault();
                actor.initDrag(e, dragger, actor);
            });
            $('#' + this.activePage.ActorItems[i].actorId).on('mouseenter', function(e) {
                console.log("\nmouseenter");
                clientApp.toggleHoverText(e.currentTarget, "actor");
            });
            $('#' + this.activePage.ActorItems[i].actorId).on('mouseleave', function(e) {
                console.log("\nmouseleave");
                clientApp.toggleHoverText(null, null);
            });
        }

    },

    // ======= makeLessonPage =======
    makeLessonPage: function(lesson) {
        console.log("makeLessonPage");

        this.makeLessonText(lesson);
        this.makeLessonActors();
        this.makeLessonCanvases();
        this.activateLessonActors();

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

    // ======= makeLessonCanvases =======
    makeLessonCanvases: function(lesson) {
        console.log("makeLessonCanvases");

        loadCanvasImages("studioCanvas");
        loadCanvasImages("monitorCanvas");

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

            var can = document.getElementById(canvas);
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
                            if (canvas == "studioCanvas") {
                                clientApp.studioImages.push(canvasImage);
                            } else {
                                clientApp.monitorImages.push(canvasImage);
                            }
                            loadNextImage(imageFilesArray[imageIndex++], imageIndex);
                        }, 50);
                    }
                } else {

                    if (canvas == "studioCanvas") {
                        var initImage = clientApp.studioImages[initFrame];
                    } else {
                        var initImage = clientApp.monitorImages[initFrame];
                    }
                    ctx.clearRect(0, 0, 720, 405);
                    ctx.drawImage(initImage, 0, 0, 720, 405, 0, 0, 280, 140);
                    ctx.save();
                }
            }
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

    // ======= makeLessonText =======
    makeLessonText: function(lesson) {
        console.log("makeLessonText");

        // == get lesson element objects
        var lessonText = clientApp.activePage.pageText;
        var lessonId = $(lesson).attr('id');
        var lessonHtml = $(lesson).parents().eq(0).html();
        var lessonBox = $('#' + lessonId).parents().eq(2);

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
        }
        return itemHtml;
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

    // ======= selectDisplayItem =======
    selectDisplayItem: function(item) {
        console.log("selectDisplayItem");
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

    // ======= activateMenuItems =======
    activateMenuItems: function(menu) {
        console.log("activateMenuItems");

        switch(menu) {
            case "lessonMenu":

            // == select lesson (CLICK)
            $('#lessonMenu').children('li').children('div').on('click', function(e) {
                console.log("\n-- click");
                clientApp.displayItems.activeLesson = e.currentTarget;
                console.log("e.currentTarget.id:", e.currentTarget.id);
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
            clientApp.selectDisplayItem(e.currentTarget);
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

    // ======= toggleHoverText =======
    toggleHoverText: function(item, itemType) {
        // console.log("toggleHoverText');
        if ($(item).attr('id')) {
            if (itemType == "display") {
                var itemText = clientApp.displayItems[$(item).attr('id')].itemText;
            } else if (itemType == "lesson") {
                var itemText = clientApp.lessons[$(item).attr('id')].itemText;
            } else if (itemType == "actor") {
                var itemText = $(item).attr('id');
            }
            $('#hover_text').text(itemText);
        } else {
            $('#hover_text').text('');
        }
    }

};

clientApp.initialize();
