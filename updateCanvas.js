// ======= updateCanvas ======= ======= ======= ======= ======= ======= =======
function updateCanvas(paramsArray, behaviorsArray, whichCanvas) {
    console.log("updateCanvas");

    var multiObjectFlag = false;
    var frameIndex = paramsArray[0];
    var pageObject = paramsArray[1];
    var actorObject = paramsArray[2];
    var canvasLimg = paramsArray[8];
    var canvasMimg = paramsArray[9];

    // ======= set imagePool to take image elements from =======
    if (whichCanvas == 'canvasL') {
        var canvasFrameset = pageObject.canvasL;
    } else {
        var canvasFrameset = pageObject.canvasM;
    }

    // ======= object animates while moving =======
    if (Array.isArray(canvasFrameset)) {
        var imageName = canvasFrameset[0];
        var checkGroupFrames = canvasFrameset[1];

        // ======= multiple object canvas control =======
        if (Array.isArray(checkGroupFrames)) {
            multiObjectFlag = true;
            var actorName = actorObject.itemKey;
            var groupArray = getGroupBehaviors(actorName, behaviorsArray);
            var groupIndex = groupArray[0];
            var bClass = groupArray[1];
            var bGroup = groupArray[2];
            var boxXYWH = groupArray[3];
            var groupKey = groupArray[4];

            // ======= set frameIndex at proper key =======
            canvasFrameset[1][groupIndex] = frameIndex;
            var frameA = canvasFrameset[1][0];
            var frameB = canvasFrameset[1][1];
            var frameC = canvasFrameset[1][2];
            var frameset = canvasFrameset[2][groupIndex];

        // ======= single object canvas control =======
        } else {
            var frameset = canvasFrameset[2];
        }

    // ======= object does not animate (moves only) =======
    } else {
        var imageName = canvasFrameset;
        var frameset = 1;
    }

    // ======= Left canvas =======
    if (whichCanvas == 'canvasL') {
        var sourceW = 720;
        var sourceH = 405;
        var canvasW = parseInt(pageObject.canLw);
        var canvasH = parseInt(pageObject.canLh);
        var canvasL = document.getElementById("canvasL");
        var context = canvasL.getContext("2d");
        var canvasImage = pageObject.imagePoolL[frameIndex];

    // ======= Monitor canvas =======
    } else {
        var sourceW = 720;
        var sourceH = 405;
        var canvasW = parseInt(pageObject.canMw);
        var canvasH = parseInt(pageObject.canMh);
        var canvasM = document.getElementById("canvasM");
        var context = canvasM.getContext("2d");
        var canvasImage = pageObject.imagePoolM[frameIndex];
    }

    if (multiObjectFlag == false) {
        var imageString = ('images/' + imageName + '_' + frameIndex + '.png');   //  + '.png'
    } else {
        var imageString = ('images/' + imageName + '_' + frameA + frameB + frameC + '.png');   //  + '.png'
    }

    context.clearRect(0, 0, canvasW, canvasH);
    context.drawImage(canvasImage, 0, 0, 720, 405, 0, 0, canvasW, canvasH);
}
