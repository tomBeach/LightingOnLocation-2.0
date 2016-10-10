
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
