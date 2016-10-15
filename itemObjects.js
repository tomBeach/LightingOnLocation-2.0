
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======

function initItems(targets) {
    console.log("initItems");

    var items = {};

    items.scrim1_0 = new Item(
        /* itemId */ "scrim1_0",
        /* itemEl */ null,
        /* itemName */ "half stop",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemText */ "move scrims to the barndoor frame",
        /* itemImage */ "scrim1_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:studioCanvas.canX, R:studioCanvas.canX + studioCanvas.canW, T:studioCanvas.canY, B:studioCanvas.canY + studioCanvas.canH }
    );
    items.scrim2_0 = new Item(
        /* itemId */ "scrim2_0",
        /* itemEl */ null,
        /* itemName */ "full stop",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemText */ "move scrims to the barndoor frame",
        /* itemImage */ "scrim2_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:studioCanvas.canX, R:studioCanvas.canX + studioCanvas.canW, T:studioCanvas.canY, B:studioCanvas.canY + studioCanvas.canH }
    );
    items.scrim3_0 = new Item(
        /* itemId */ "scrim3_0",
        /* itemEl */ null,
        /* itemName */ "gradiated",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemText */ "move scrims to the barndoor frame",
        /* itemImage */ "scrim3_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* bounds */ {L:studioCanvas.canX, R:studioCanvas.canX + studioCanvas.canW, T:studioCanvas.canY, B:studioCanvas.canY + studioCanvas.canH }
    );
    items.f650_0_2 = new Item(
        /* itemId */ "f650_0_2",
        /* itemEl */ null,
        /* itemName */ "scrims_650",
        /* itemType */ "setup",
        /* itemMove */ "none",
        /* itemText */ "650 Watts",
        /* itemImage */ "f650_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:400, T:80, W:350, H:270 },
        /* bounds */ { L:400, T:80, W:350, H:270 }
    );
    items.distance_0_1 = new Item(
        /* itemId */ "distance_0_1",
        /* itemEl */ null,
        /* itemName */ "distance_650",
        /* itemType */ "actor",
        /* itemMove */ "slider",
        /* itemText */ "click and drag light icon to change position",
        /* itemImage */ "f650_0",
        /* itemTargets */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:560, T:20, W:52, H:40 },      // relative
        /* bounds */ { L:260, T:20, W:300, H:100 }      // relative
    );
    return items;
}

function Item(itemId, itemEl, itemName, itemType, itemMove, itemText, itemImage, itemTargets, startXY, minMaxLT, dropLoc, initLoc, bounds) {
    this.itemId = itemId;
    this.itemEl = itemEl;
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemMove = itemMove;
    this.itemText = itemText;
    this.itemImage = itemImage;
    this.itemTargets = itemTargets;
    this.startXY = startXY;
    this.minMaxLT = minMaxLT;
    this.initLoc = initLoc;
    this.dropLoc = dropLoc;
    this.bounds = bounds;
}
