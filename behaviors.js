
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======

    // actors.drag_0_01 = new Actor(
    //     /* actorId */ "drag_0_01",
    //     /* actorEl */ null,
    //     /* actorName */ "distance_650",
    //     /* actorType */ "dragger",
    //     /* actorImage */ "f650_0",
    //     /* startXY */ { actorX:0, actorY:0, mouseX:0, mouseY:0, diffX:0, diffY:0 },
    //     /* initLoc */ { X:560, Y:290, W:100, H:100 },
    //     /* dropLoc */ { X:0, Y:0, W:0, H:0 },
    //     /* locator */ { L:250, R:540, T:300, B:400 }
    // );

// ======= initDrag =======
Actor.prototype.initDrag = function(e) {
    console.log("initDrag");
    var actor = clientApp.activeActor;
    actor.actorEl = $("#" + actor.actorId).eq(0);
    var locX = parseInt($(actor.actorEl).css('left').substring(0, $(actor.actorEl).css('left').length - 2));
    var locY = parseInt($(actor.actorEl).css('top').substring(0, $(actor.actorEl).css('top').length - 2));
    $(actor.actorEl).css('position', 'absolute');
    actor.startXY.actorX = locX;
    actor.startXY.actorY = locY;
    actor.startXY.mouseX = e.clientX;
    actor.startXY.mouseY = e.clientY;
    actor.startXY.diffX = e.clientX - locX;
    actor.startXY.diffY = e.clientY - locY;
    console.log("actor.startXY:", actor.startXY);

    if (actor.actorType == "dragger") {
        window.addEventListener('mousemove', actor.draggerMove, true);
    } else if (actor.actorType == "slider") {
        window.addEventListener('mousemove', actor.sliderMove, true);
    }
    window.addEventListener('mouseup', actor.mouseUp, true);
}

/// ======= sliderMove =======
Actor.prototype.sliderMove = function(e) {
    // console.log("sliderMove");

    var actor = clientApp.activeActor;

    // == get movement boundaries
    var minX = actor.locator.L;
    var maxX = actor.locator.R;
    var minY = actor.locator.T;
    var maxY = actor.locator.B;
    var boxW = actor.locator.R - actor.locator.L;
    var boxH = actor.locator.B - actor.locator.T;

    // == calculate change in X/Y location in pixels
    var dX = parseInt(e.clientX - actor.startXY.mouseX);
    var dY = parseInt(e.clientY - actor.startXY.mouseY);
    var deltaX = (dX/boxW).toFixed(2);
    var deltaY = (dY/boxH).toFixed(2);
    var left = parseInt(actor.startXY.actorX + dX);
    var top = parseInt(actor.startXY.actorY - (boxH * deltaX));

    // == set movement boundaries
    if (left < minX) {
        left = minX;
    }
    if (left > maxX) {
        left = maxX;
    }
    if (top < minY) {
        top = minY;
    }
    if (top > maxY) {
        top = maxY;
    }

    // == calculate percent movement through frameset/limit frams to start/end
    indexX = Math.round(-deltaX * clientApp.activePage.studioCanvas.endFrame);
    if (indexX < 0) {
        indexX = 0;
    }
    if (indexX > clientApp.activePage.studioCanvas.endFrame) {
        indexX = clientApp.activePage.studioCanvas.endFrame;
    }

    clientApp.updateCanvas(left, top, indexX);
}

// ======= draggerMove =======
Actor.prototype.draggerMove = function(e) {
    // console.log("draggerMove");
    var actor = clientApp.activeActor;
    var dX = actor.startXY.mouseX - e.clientX;
    var dY = actor.startXY.mouseY - e.clientY;
    var left = actor.startXY.actorX - dX;
    var top = actor.startXY.actorY - dY;
    var minX = actor.locator.L;
    var maxX = actor.locator.R;
    var minY = actor.locator.T;
    var maxY = actor.locator.B;
    if (left < minX) {
        left = minX;
    }
    if (left > maxX) {
        left = maxX;
    }
    if (top < minY) {
        top = minY;
    }
    if (top > maxY) {
        top = maxY;
    }
    $(clientApp.activeActor.actorEl).css('top', top + 'px');
    $(clientApp.activeActor.actorEl).css('left', left + 'px');
    clientApp.updateCanvas();
}

// ======= mouseUp =======
Actor.prototype.mouseUp = function(e) {
    console.log("mouseUp");
    var actor = clientApp.activeActor;
    if (actor.actorType == "dragger") {
        window.removeEventListener('mousemove', actor.draggerMove, true);
    } else if (actor.actorType == "slider") {
        window.removeEventListener('mousemove', actor.sliderMove, true);
    }
}
