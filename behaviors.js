
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======
// ======= ======= ======= BEHAVIORS ======= ======= =======

// ======= initMove =======
Item.prototype.initMove = function(e) {
    console.log("initMove");

    // == get active item element
    var page = clientApp.activePage;
    var item = clientApp.activeActor;
    var itemType = item.itemType;
    item.itemEl = $("#" + item.itemId).eq(0);
    console.log("item.itemTargets:", item.itemTargets);

    // == strip "px" suffix from left and top properties
    var locL = parseInt($(item.itemEl).css('left').substring(0, $(item.itemEl).css('left').length - 2));
    var locT = parseInt($(item.itemEl).css('top').substring(0, $(item.itemEl).css('top').length - 2));
    $('#locXYWH').html("<p class='info-text'>left: " + locL + "</p><p class='info-text'>top: " + locT + "</p>");

    // == limit moves to max canvas boundaries
    if (item.bounds.W > (displayItems.studio.canW - item.initLoc.W)) {
        var itemBoundsW = displayItems.studio.canW - item.initLoc.W;
    } else {
        var itemBoundsW = item.bounds.W;
    }
    if (item.bounds.H > (displayItems.studio.canH - item.initLoc.H)) {
        var itemBoundsH = displayItems.studio.canH - item.initLoc.H;
    } else {
        var itemBoundsH = item.bounds.H;
    }

    // == set item/mouse locations and bounds (absolute position)
    item.startXY.itemL = locL;
    item.startXY.itemT = locT;
    item.startXY.mouseX = e.clientX;
    item.startXY.mouseY = e.clientY;
    item.startXY.diffX = e.clientX - locL;
    item.startXY.diffY = e.clientY - locT;
    item.minMaxLT.minL = displayItems.studio.canX + item.bounds.L;      // absolute
    item.minMaxLT.minT = displayItems.studio.canY + item.bounds.T;      // absolute
    item.minMaxLT.maxL = displayItems.studio.canX + item.bounds.L + itemBoundsW;      //  - item.initLoc.W;
    item.minMaxLT.maxT = displayItems.studio.canY + item.bounds.T + itemBoundsH;      //  - item.initLoc.H;

    // == set relative bounds to absolute bounds
    var target, setup;
    if ((item.itemTargets.length > 0) && (page.SetupItems.length > 0)) {
        setup = page.SetupItems[0];
        for (var i = 0; i < item.itemTargets.length; i++) {
            target = item.itemTargets[i];
            target.absLoc.L = target.initLoc.L + setup.initLoc.L + displayItems.studio.canX;
            target.absLoc.T = target.initLoc.T + setup.initLoc.T + displayItems.studio.canY;
            target.absLoc.W = target.initLoc.L + setup.initLoc.L + displayItems.studio.canX + target.initLoc.W;
            target.absLoc.H = target.initLoc.T + setup.initLoc.T + displayItems.studio.canY + target.initLoc.H;
        }
    }

    window.addEventListener('mousemove', item.moveItem, true);
    window.addEventListener('mouseup', item.mouseUp, true);
}

// ======= moveItem =======
Item.prototype.moveItem = function(e) {
    // console.log("moveItem");

    var item = clientApp.activeActor;
    var itemMove = item.itemMove;

    // == calculate change in mouse X/Y location in pixels
    var dX = parseInt(e.clientX - item.startXY.mouseX);
    var dY = parseInt(e.clientY - item.startXY.mouseY);
    var deltaX = ((dX + item.dropLoc.L)/item.bounds.W).toFixed(2);
    var deltaY = ((dY + item.dropLoc.T)/item.bounds.H).toFixed(2);

    // ======= getMoveBoundaries =======
    function getMoveBoundaries(left, top) {
        // console.log("getMoveBoundaries");
        if (left < item.minMaxLT.minL) {
            left = item.minMaxLT.minL;
        }
        if (left > item.minMaxLT.maxL) {
            left = item.minMaxLT.maxL;
        }
        if (top < item.minMaxLT.minT) {
            top = item.minMaxLT.minT;
        }
        if (top > item.minMaxLT.maxT) {
            top = item.minMaxLT.maxT;
        }
        return [left, top];
    }

    switch(itemMove) {
        case "slider":
            var left = parseInt(item.startXY.itemL + dX);
            var top = parseInt(item.startXY.itemT - item.dropLoc.T - (item.bounds.H * deltaX));
            var itemLT = getMoveBoundaries(left, top);
            updateItemLoc(itemLT[0], itemLT[1]);
            break;
        case "dragger":
            var left = parseInt(item.startXY.itemL + dX);
            var top = parseInt(item.startXY.itemT + dY);
            var itemLT = getMoveBoundaries(left, top);
            if (item.itemTargets.length > 0) {
                checkItemTargets(itemLT[0], itemLT[1]);
            } else {
                updateItemLoc(itemLT[0], itemLT[1]);
            }
        break;
    }

    // ======= updateItemLoc =======
    function updateItemLoc(left, top) {
        // console.log("updateItemLoc");

        var item = clientApp.activeActor;

        // == calculate percent movement through frameset/limit frames to start/end
        indexX = Math.round(-deltaX * clientApp.activePage.studio.endFrame);
        if (indexX < 0) {
            indexX = 0;
        }
        if (indexX > clientApp.activePage.studio.endFrame) {
            indexX = clientApp.activePage.studio.endFrame;
        }

        // == set real-time item loc and canvas frame based on slider position
        $(item.itemEl).css('z-index', '10');
        $(item.itemEl).css('top', top + 'px');
        $(item.itemEl).css('left', left + 'px');
        item.startXY.dragL = left;
        item.startXY.dragT = top;
        clientApp.updateCanvas(left, top, indexX);
        $('#locXYWH').html("<p class='info-text'>left: " + left + "</p><p class='info-text'>top: " + top + "</p>");
    }

    // ======= checkItemTargets =======
    function checkItemTargets(left, top) {
        // console.log("checkItemTargets");

        var item = clientApp.activeActor;

        // == set real-time item loc and canvas frame based on slider position
        $(item.itemEl).css('z-index', '10');
        $(item.itemEl).css('top', top + 'px');
        $(item.itemEl).css('left', left + 'px');
        item.startXY.dragL = left;
        item.startXY.dragT = top;
        clientApp.updateCanvas(left, top, 0);

        // == collision detector for target
        var overlap = 10;

        for (var i = 0; i < item.itemTargets.length; i++) {
            var targetL = item.itemTargets[i].absLoc.L;
            var targetR = item.itemTargets[i].absLoc.W;
            var targetT = item.itemTargets[i].absLoc.T;
            var targetB = item.itemTargets[i].absLoc.H;

            // == set real-time item loc and canvas frame based on slider position
            $(item.itemEl).css('top', top + 'px');
            $(item.itemEl).css('left', left + 'px');
            item.startXY.dragL = left;
            item.startXY.dragT = top;

            if ((left < targetR) && (top > targetT) && (left > targetL) && (top < targetB)) {
                console.log("-- HIT -- HIT -- HIT --");
            }
        }
        clientApp.updateCanvas(left, top, 0);
        $('#locXYWH').html("<p class='info-text'>left: " + left + "</p><p class='info-text'>top: " + top + "</p>");
    }

}

// ======= mouseUp =======
Item.prototype.mouseUp = function(e) {
    console.log("mouseUp");
    var item = clientApp.activeActor;
    $(clientApp.activeActor.itemEl).off();
    $(clientApp.activeActor.itemEl).css('z-index', '2');
    window.removeEventListener('mousemove', item.moveItem, true);

    // == store relative loc where item was dropped
    item.dropLoc.L = item.startXY.dragL - (clientApp.displayItems.studio.canX + item.bounds.L + item.bounds.W);
    item.dropLoc.T = item.startXY.dragT - (clientApp.displayItems.studio.canY + item.bounds.T);
    item.dropLoc.W = null;
    item.dropLoc.H = null;
    console.log("\n******* dropLoc:", item.dropLoc.L, item.dropLoc.T);

    // == reactivate item
    clientApp.activateLessonItems();
}
