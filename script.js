
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======
// ======= ======= ======= ======= ======= objects ======= ======= ======= ======= =======


// // ======= ======= ======= nextGameScreen ======= ======= =======

// function Dragger(actorName, actorType, actorImage, initLoc, dropLoc) {
//     this.actorName = actorName;
//     this.actorType = actorType;
//     this.actorImage = actorImage;
//     this.initLoc = initLoc;
//     this.dropLoc = dropLoc;
// }
//
// var drag_0_01 = new Dragger(
//     /*actorName*/ "distance_650",
//     /*actorType*/ "dragger",
//     /*actorImage*/ "f650_0",
//     /*initLoc*/ { X:100, Y:100, W:100, H:100 },
//     /*dropLoc*/ { X:200, Y:200, W:100, H:100 }
// );
//
// // ======= activateDrag =======
// Dragger.prototype.activateDrag = function() {
//     console.log("activateDrag");
// }
//
// // ======= initDrag =======
// Dragger.prototype.initDrag = function() {
//     console.log("initDrag");
// }

var displayItems = {
    monitor: { itemName: "monitor", itemText: "Monitor" },
    studio: { itemName: "studio", itemText: "Studio View", W:720, H:405 },
    shop: { itemName: "shop", itemText: "Shop Menu" },
    lessons: { itemName: "lessons", itemText: "Lesson Menu" },
    activeLesson: null
}

var Setup_Data = null;
var Group_Data = null;
var Menu_Data = null;
var Actor_Data = null;
var Target_Data = null;

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
        this.pages = initPages(Setup_Data, Group_Data, Menu_Data, Actor_Data, Target_Data);
        this.lessons = initLessons(this.pages);
        this.activePage = this.pages.page_0_01;
        this.activateDisplayItems();
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
            console.log("initFrame:", initFrame);

            for (var i = startFrame; i < endFrame; i++) {
                var imageFileName = (imageName + '_' + i + '.png');
                imageFilesArray.push(imageFileName);
            }

            var can = document.getElementById(canvas);
            var ctx = can.getContext("2d");
            var width = can.offsetWidth;
            var height = can.offsetHeight;
            var scaleFactor = backingScale(ctx);
            console.log("width:", width);
            console.log("height:", height);

            if (scaleFactor > 1) {
                var canW = width / scaleFactor;
                var canH = height / scaleFactor;
                var ctx = can.getContext('2d');
            } else {
                var canW = width;
                var canH = height;
            }
            console.log("can:", can);
            console.log("ctx:", ctx);
            console.log("canW:", canW);
            console.log("canH:", canH);

            loadNextImage(null, 0);
            function loadNextImage(image, imageIndex) {
                console.log("loadNextImage");
                console.log("imageIndex/imageName:", imageIndex, imageName);
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
                    console.log("clientApp.studioImages[initFrame]:", clientApp.studioImages[initFrame]);
                    console.log("clientApp.monitorImages[initFrame]:", clientApp.monitorImages[initFrame]);

                    if (canvas == "studioCanvas") {
                        var initImage = clientApp.studioImages[initFrame];
                    } else {
                        var initImage = clientApp.monitorImages[initFrame];
                    }
                    console.log("initImage:", initImage);
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
        var lessonText = clientApp.activePage.pageText;
        var lessonId = $(lesson).attr('id');
        var lessonHtml = $(lesson).parents().eq(0).html();
        var lessonBox = $('#' + lessonId).parents().eq(2);
        $('#' + lessonId).parents().eq(1).remove();
        $(lessonBox).append(lessonHtml);
        var lessonTextHtml = "<div class='lessonText hide'><p>" + lessonText + "</p></div>";
        $(lessonBox).append(lessonTextHtml);
        $( ".lessonText" ).animate({
            height: "300px",
            opacity: 1.0
        }, 2000, function() {
            console.log("done");
        });
    },

    // ======= makeLessonPage =======
    makeLessonPage: function(lesson) {
        console.log("makeLessonPage");
        console.log("lesson:", lesson);

        this.makeLessonText();
        this.makeLessonCanvases();

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
            console.log("selectItem");
            var itemParentId = $('#' + itemId).parent('div').attr('id');
            console.log("itemParentId:", itemParentId);
            $('#' + itemParentId).removeClass('tab_box_active');
            $('#' + itemParentId).addClass('tab_box_selected');
            $('#' + itemId).removeClass('label_text_active');
            $('#' + itemId).addClass('label_text_selected');
        }

        function deselectItem(itemId) {
            console.log("deselectItem");
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
        console.log("menu:", menu);

        switch(menu) {
            case "lessonMenu":

            // == select lesson (CLICK)
            $('#lessonMenu').children('li').children('div').on('click', function(e) {
                console.log("\n-- click");
                clientApp.displayItems.activeLesson = e.currentTarget;
                console.log("e.currentTarget:", e.currentTarget);
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
            }
            $('#hover_text').text(itemText);
        } else {
            $('#hover_text').text('');
        }
    }

};

clientApp.initialize();
