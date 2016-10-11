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
    var dX = actor.startXY.mouseX - e.clientX;
    var dY = actor.startXY.mouseY - e.clientY;
    var left = actor.startXY.actorX - dX;
    var deltaX = dX/(actor.locator.R - actor.locator.L);
    var top = actor.startXY.actorY + (actor.locator.B - actor.locator.T)*deltaX;
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
