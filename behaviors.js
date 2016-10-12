
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======

// ======= initDrag =======
Actor.prototype.initDrag = function(e) {
    console.log("initDrag");

    // == get active actor element
    var actor = clientApp.activeActor;
    actor.actorEl = $("#" + actor.actorId).eq(0);

    // == strip "px" suffix from left and top properties
    var locL = parseInt($(actor.actorEl).css('left').substring(0, $(actor.actorEl).css('left').length - 2));
    var locT = parseInt($(actor.actorEl).css('top').substring(0, $(actor.actorEl).css('top').length - 2));
    console.log("locL:", locL);
    console.log("locT:", locT);

    // == set actor/mouse locations and actor offsets (pixels relative to window)
    actor.startXY.actorL = locL;
    actor.startXY.actorT = locT;
    actor.startXY.mouseX = e.clientX;
    actor.startXY.mouseY = e.clientY;
    actor.startXY.diffX = e.clientX - locL;
    actor.startXY.diffY = e.clientY - locT;

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

    // == get movement boundaries (relative to canvas; add canvas offsets)
    var minX = actor.locator.L + displayItems.studio.canX;
    var maxX = actor.locator.L + actor.locator.W + displayItems.studio.canX;
    var minY = actor.locator.T + displayItems.studio.canY;
    var maxY = actor.locator.T + actor.locator.H + displayItems.studio.canY;

    // == calculate change in mouse X/Y location in pixels
    var dX = parseInt(e.clientX - actor.startXY.mouseX);
    var dY = parseInt(e.clientY - actor.startXY.mouseY);
    var deltaX = ((dX + actor.dropLoc.L)/actor.locator.W).toFixed(2);
    var deltaY = ((dY + actor.dropLoc.T)/actor.locator.H).toFixed(2);
    var left = parseInt(actor.startXY.actorL + dX);
    var top = parseInt(actor.startXY.actorT - actor.dropLoc.T - (actor.locator.H * deltaX));

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
    indexX = Math.round(-deltaX * clientApp.activePage.studio.endFrame);
    if (indexX < 0) {
        indexX = 0;
    }
    if (indexX > clientApp.activePage.studio.endFrame) {
        indexX = clientApp.activePage.studio.endFrame;
    }

    // == set real-time actor loc and canvas frame based on slider position
    $(clientApp.activeActor.actorEl).css('top', top + 'px');
    $(clientApp.activeActor.actorEl).css('left', left + 'px');
    actor.startXY.dragL = left;
    actor.startXY.dragT = top;
    clientApp.updateCanvas(left, top, indexX);
}

// ======= mouseUp =======
Actor.prototype.mouseUp = function(e) {
    console.log("mouseUp");
    var actor = clientApp.activeActor;
    if (actor.actorType == "dragger") {
        $(clientApp.activeActor.actorEl).off();
        window.removeEventListener('mousemove', actor.draggerMove, true);
    } else if (actor.actorType == "slider") {
        $(clientApp.activeActor.actorEl).off();
        window.removeEventListener('mousemove', actor.sliderMove, true);
    }

    // == store relative loc where actor was dropped
    actor.dropLoc.L = actor.startXY.dragL - (clientApp.displayItems.studio.canX + actor.locator.L + actor.locator.W);
    actor.dropLoc.T = actor.startXY.dragT - (clientApp.displayItems.studio.canY + actor.locator.T);
    actor.dropLoc.W = null;
    actor.dropLoc.H = null;
    console.log("\n******* dropLoc:", actor.dropLoc.L, actor.dropLoc.T);

    // == reactivate actor
    clientApp.activateLessonActors();
}

// ======= draggerMove =======
// Actor.prototype.draggerMove = function(e) {
//     // console.log("draggerMove");
//     var actor = clientApp.activeActor;
//     var dX = actor.startXY.mouseX - e.clientX;
//     var dY = actor.startXY.mouseY - e.clientY;
//     var left = actor.startXY.actorL - dX;
//     var top = actor.startXY.actorT - dY;
//     var minX = actor.locator.L;
//     var maxX = actor.locator.R;
//     var minY = actor.locator.T;
//     var maxY = actor.locator.B;
//     if (left < minX) {
//         left = minX;
//     }
//     if (left > maxX) {
//         left = maxX;
//     }
//     if (top < minY) {
//         top = minY;
//     }
//     if (top > maxY) {
//         top = maxY;
//     }
//     $(clientApp.activeActor.actorEl).css('top', top + 'px');
//     $(clientApp.activeActor.actorEl).css('left', left + 'px');
//
//     // == set canvas frame based on slider position
//     clientApp.updateCanvas(left, top, indexX);
// }
