
if (left > (displayItems.studio.canX + displayItems.studio.canW)) {
    left = item.minMaxLT.maxL - item.initLoc.W;
}


if (items.length > 0) {
    var gridParams = getGridHW(items);
}

// ======= getGridHW =======
function getGridHW(items) {
    console.log("getGridHW");
    var totalW = 0;
    var totalH = 0;
    var gridParams = { L:0, T:0, W:100, H:100 };
    for (var i = 0; i < items.length; i++) {
        totalW += items[i].initLoc.W;
        totalH += items[i].initLoc.H;
    }
    var gridAvgH = totalH/items.length;
    var gridAvgW = totalW/items.length;
    var gridRows = 405/gridAvgH;
    var gridCols = 405/gridAvgW;
    console.log("totalW:", totalW);
    console.log("totalH:", totalH);
    console.log("gridAvgH:", gridAvgH);
    console.log("gridAvgW:", gridAvgW);
    console.log("gridRows:", gridRows);
    console.log("gridCols:", gridCols);
    return gridParams;
}



// ======= getNextPage =======
function getNextPage(prevOrNext) {
    console.log("getNextPage");
    console.log("prevOrNext:", prevOrNext);

    // == remove event listeners
    $('#navPanel').children('div').off();

    // == loop throuhg pages of active lesson
    for (var i = 0; i < clientApp.activeLesson.pageKeys.length; i++) {
        var lessonIndex = clientApp.activeLesson.pageKeys[i].split("_")[0];
        var pageIndex = clientApp.activeLesson.pageKeys[i].split("_")[1];
        console.log("  *** lessonIndex:", lessonIndex);
        console.log("  pageIndex:", pageIndex);

        // == current page found
        if (pageIndex == clientApp.activePage.pageKey.split("_")[1]) {
            if (prevOrNext == "nextBtn") {
                // == load next page in same lesson
                if (pageIndex < clientApp.activeLesson.pageKeys.length - 1) {
                    var nextPageIndex = i + 1;
                    console.log("  nextPageIndex:", nextPageIndex);
                    return clientApp.pages["page_" + lessonIndex + "_" + nextPageIndex];

                // == load first page in next lesson
                } else {
                    lessonIndex++;
                    console.log("  lessonIndex:", lessonIndex);
                    clientApp.activeLesson = clientApp.lessons["lesson_" + lessonIndex];
                    return clientApp.pages["page_" + lessonIndex + "_" + 0];
                }
            } else {
                // == load prev page in same lesson
                if (pageIndex > clientApp.activeLesson.pageKeys[0].split("_")[1]) {
                    var nextPageIndex = i - 1;
                    console.log("  nextPageIndex:", nextPageIndex);
                    return clientApp.pages["page_" + lessonIndex + "_" + nextPageIndex];

                // == load last page in prev lesson
                } else {
                    lessonIndex--;
                    console.log("  lessonIndex:", lessonIndex);
                    clientApp.activeLesson = clientApp.lessons["lesson_" + lessonIndex];
                    return clientApp.pages["page_" + lessonIndex + "_" + clientApp.lessons["lesson_" + lessonIndex].pageKeys.length];
                }
            }

        }
    }
}





// ======= makeLessonText =======
makeLessonText: function(lesson) {
    console.log("makeLessonText");

    // == get selected lesson elements
    var navPanel = "";
    var lessonText = clientApp.activePage.pageText;
    var lessonId = $(lesson).attr('id');
    var lessonHtml = $(lesson).parents().eq(0).html();
    var lessonBox = $('#' + lessonId).parents().eq(2);
    console.log("lessonId:", lessonId);

    // == get all lesson elements
    // var lessonItems = $('.lessonItem:gt(1)');
    // var lessonItems = $('.lessonItem');
    // var index = $(lessonItems).index(lesson);

    // == replace prev text or lesson menu with next lesson text
    $('#' + lessonId).parents().eq(1).remove();

    // == replace lessons list with lesson text
    var lessonTextHtml = "<div class='lessonText hide'><p>" + lessonText + "</p></div>";
    $(lessonBox).append(lessonTextHtml);
    $( ".lessonText" ).animate({
        height: "200px",
        opacity: 1.0
    }, 500, function() {
        console.log("done");
    });

    if (clientApp.activePage.pageKey.split('_')[1] == 0) {

        // == make prevNext openClose buttons
        navPanel += "<nav id='navPanel'><div id='prevBtn' class='panelBtn'><span>P</span></div>";
        navPanel += "<div id='nextBtn' class='panelBtn'><span>N</span></div></nav>";

        // == change container class for prevNext buttons
        $('#' + lessonId).removeClass('lessonItem');
        $('#' + lessonId).addClass('selectedLesson');
        $(lessonBox).append(navPanel);
        $(lessonBox).append(lessonHtml);

        this.activatePrevNext();
    }
},



//     append menuHtml
//     style buttons
//     activate buttons
//
// // == slide next lessons
//     lesson collection
//     style lessons
//     set lesson position
//
// // == load selected lesson text
//     selectedLesson.lessonText
//     build menuHtml
//     style lessonText
//     append menuHtml
//
// // == lesson text links
//     link to lesson/page




loadNextImage(null, 0);

// ======= loadNextImage =======
function loadNextImage(image, imageIndex) {
    console.log("loadNextImage");
    console.log("imageIndex/image:", imageIndex, image);
    var nextImage = imagesArray[imageIndex];
    if (imageIndex < imagesArray.length) {
        nextImage.onload = function() {
            loadedImagesArray.push(nextImage);
            loadNextImage(imagesArray[imageIndex++], imageIndex);
        }
    }
}
console.log("imagesArray:", imagesArray);
console.log("loadedImagesArray:", loadedImagesArray);



// document.addEventListener("DOMContentLoaded", preloadImages, true);
preloadImages();
var loadedImages = 0;

// var imageArray = new Array("path/image.png", "path/image2.png", "path/image3.png)";
function preloadImages(e) {
    console.log("preloadImages");
    for (var i = 0; i < imageArray.length; i++) {
        var tempImage = new Image();
        tempImage.src = imageArray[i];
        tempImage.addEventListener("load", function() {
            console.log("tempImage:", tempImage);
            trackProgress(tempImage);
        });
    }
}
function trackProgress(tempImage) {
    console.log("trackProgress");
    clientApp.studioImages.push(tempImage)
    loadedImages++;
    if (loadedImages == imageArray.length) {
        imagesLoaded();
    }
}
function imagesLoaded() {
    console.log("imagesLoaded");

    var initFrame = clientApp.activePage[canvas].initFrame;
    if (canvas == "studioCanvas") {
        var initImage = clientApp.studioImages[initFrame];
    } else {
        var initImage = clientApp.monitorImages[initFrame];
    }
    console.log("initImage:", initImage);

    function backingScale(context) {
        if ('devicePixelRatio' in window) {
            if (window.devicePixelRatio > 1) {
                return window.devicePixelRatio;
            }
        }
        return 1;
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
    console.log("can:", can);
    console.log("ctx:", ctx);
    console.log("canW:", canW);
    console.log("canH:", canH);

    ctx.clearRect(0, 0, 720, 405);
    ctx.drawImage(initImage, 0, 0, 720, 405, 0, 0, canW, canH);
    ctx.save();
}

// loadCanvasImages("studioCanvas");
// initCanvasImage("studioCanvas");

// ======= loadCanvasImages =======
function loadCanvasImages(canvas) {
    console.log("loadCanvasImages");

    var imageName = clientApp.activePage[canvas].image;
    var startFrame = clientApp.activePage[canvas].startFrame;
    var endFrame = clientApp.activePage[canvas].endFrame + 1;
    for (var i = startFrame; i < endFrame; i++) {
        var imageString = ('images/' + imageName + '_' + i + '.png');
        var canvasImage = new Image();
        canvasImage.id = imageName + '_' + i;
        canvasImage.src = imageString;
        canvasImage.onload = function() {
            console.log("canvasImage.id:", canvasImage.id);
            clientApp.canvasImages.push(canvasImage);
        }
    }
}

// ======= initCanvasImage =======
function initCanvasImage(canvas) {
    console.log("initCanvasImage");

    var initFrame = clientApp.activePage[canvas].initFrame;
    function backingScale(context) {
        if ('devicePixelRatio' in window) {
            if (window.devicePixelRatio > 1) {
                return window.devicePixelRatio;
            }
        }
        return 1;
    }

    if (canvas == "studioCanvas") {
        var initImage = clientApp.studioImages[initFrame];
    } else {
        var initImage = clientApp.monitorImages[initFrame];
    }
    console.log("initImage:", initImage);
    initImage.onload = function() {
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
        console.log("can:", can);
        console.log("ctx:", ctx);
        console.log("canW:", canW);
        console.log("canH:", canH);

        ctx.clearRect(0, 0, 720, 405);
        ctx.drawImage(initImage, 0, 0, 720, 405, 0, 0, canW, canH);
        ctx.save();
    }
// }




function executeFunctionByName(functionName, context /*, args */) {
    var args = [].slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}





function init() {
    console.log('init');

    $(".label_text_selected, .label_text_active").on('mouseenter', function(e) {
        // console.log("\n-- mouseenter");
        toggleHoverText(e.currentTarget);
        e.stopPropagation();
    });
    $(".label_text_selected, .label_text_active").on('mouseleave', function(e) {
        // console.log("\n-- mouseleave");
        toggleHoverText();
        e.stopPropagation();
    });
    $('#textLink').on('mouseenter', function() {
        console.log("\n-- mouseenter");
        $('#lesson_header').removeClass('hidden');
        $('#lesson_header').removeClass('hide');
        $('#lesson_header').addClass('show');
        $('#lesson_box').addClass('show');
    });
    $('#textLink').on('mouseleave', function() {
        console.log("\n-- mouseleave");
        $('#lesson_header').addClass('hide');
        if ($('#lesson_box').css('display') != 'none') {
            $("#lesson_box").slideToggle( "fast", function() {
                console.log('done');
            });
        }
    });
    $('#textLink').on('click', function() {
        console.log("\n-- click");
        $('#lesson_box').slideToggle( 'fast', function() {
            console.log('done');
        });
    });
}

function toggleHoverText(item) {
    console.log("toggleHoverText");
    console.log("item:", item);
    console.log("$(item).attr('id'):", $(item).attr('id'));
    if (item) {
        $('#hover_text').text($(item).attr('id'));
    } else {
        $('#hover_text').text('');
    }
}
