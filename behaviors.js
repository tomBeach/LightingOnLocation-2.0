
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======

// ======= initDrag =======
Item.prototype.initDrag = function(e) {
    console.log("initDrag");

    // == get active item element
    var item = clientApp.activeActor;
    item.itemEl = $("#" + item.itemId).eq(0);

    // == strip "px" suffix from left and top properties
    var locL = parseInt($(item.itemEl).css('left').substring(0, $(item.itemEl).css('left').length - 2));
    var locT = parseInt($(item.itemEl).css('top').substring(0, $(item.itemEl).css('top').length - 2));
    console.log("locL:", locL);
    console.log("locT:", locT);

    // == set item/mouse locations and item offsets (pixels relative to window)
    item.startXY.itemL = locL;
    item.startXY.itemT = locT;
    item.startXY.mouseX = e.clientX;
    item.startXY.mouseY = e.clientY;
    item.startXY.diffX = e.clientX - locL;
    item.startXY.diffY = e.clientY - locT;

    if (item.itemMove == "dragger") {
        window.addEventListener('mousemove', item.draggerMove, true);
    } else if (item.itemMove == "slider") {
        window.addEventListener('mousemove', item.sliderMove, true);
    }
    window.addEventListener('mouseup', item.mouseUp, true);
}

/// ======= sliderMove =======
Item.prototype.sliderMove = function(e) {
    // console.log("sliderMove");

    var item = clientApp.activeActor;

    // == get movement boundaries (relative to canvas; add canvas offsets)
    var minX = item.locator.L + displayItems.studio.canX;
    var maxX = item.locator.L + item.locator.W + displayItems.studio.canX;
    var minY = item.locator.T + displayItems.studio.canY;
    var maxY = item.locator.T + item.locator.H + displayItems.studio.canY;

    // == calculate change in mouse X/Y location in pixels
    var dX = parseInt(e.clientX - item.startXY.mouseX);
    var dY = parseInt(e.clientY - item.startXY.mouseY);
    var deltaX = ((dX + item.dropLoc.L)/item.locator.W).toFixed(2);
    var deltaY = ((dY + item.dropLoc.T)/item.locator.H).toFixed(2);
    var left = parseInt(item.startXY.itemL + dX);
    var top = parseInt(item.startXY.itemT - item.dropLoc.T - (item.locator.H * deltaX));

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

    // == set real-time item loc and canvas frame based on slider position
    $(clientApp.activeActor.itemEl).css('top', top + 'px');
    $(clientApp.activeActor.itemEl).css('left', left + 'px');
    item.startXY.dragL = left;
    item.startXY.dragT = top;
    clientApp.updateCanvas(left, top, indexX);
}

// ======= mouseUp =======
Item.prototype.mouseUp = function(e) {
    console.log("mouseUp");
    var item = clientApp.activeActor;
    if (item.itemMove == "dragger") {
        $(clientApp.activeActor.itemEl).off();
        window.removeEventListener('mousemove', item.draggerMove, true);
    } else if (item.itemMove == "slider") {
        $(clientApp.activeActor.itemEl).off();
        window.removeEventListener('mousemove', item.sliderMove, true);
    }

    // == store relative loc where item was dropped
    item.dropLoc.L = item.startXY.dragL - (clientApp.displayItems.studio.canX + item.locator.L + item.locator.W);
    item.dropLoc.T = item.startXY.dragT - (clientApp.displayItems.studio.canY + item.locator.T);
    item.dropLoc.W = null;
    item.dropLoc.H = null;
    console.log("\n******* dropLoc:", item.dropLoc.L, item.dropLoc.T);

    // == reactivate item
    clientApp.activateLessonItems();
}

// ======= draggerMove =======
// Item.prototype.draggerMove = function(e) {
//     // console.log("draggerMove");
//     var item = clientApp.activeActor;
//     var dX = item.startXY.mouseX - e.clientX;
//     var dY = item.startXY.mouseY - e.clientY;
//     var left = item.startXY.itemL - dX;
//     var top = item.startXY.itemT - dY;
//     var minX = item.locator.L;
//     var maxX = item.locator.R;
//     var minY = item.locator.T;
//     var maxY = item.locator.B;
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
//     $(clientApp.activeActor.itemEl).css('top', top + 'px');
//     $(clientApp.activeActor.itemEl).css('left', left + 'px');
//
//     // == set canvas frame based on slider position
//     clientApp.updateCanvas(left, top, indexX);
// }
