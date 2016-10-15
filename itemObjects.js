
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======

function initItems(targets) {
    console.log("initItems");

    var items = {};
    var canvasS = clientApp.displayItems.studio;

    items.scrim1_0 = new Item(
        /* itemId */ "scrim1_0",
        /* itemEl */ null,
        /* itemName */ "half stop",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemText */ "half-stop scrim (minor brightness tweak)",
        /* itemImage */ "scrim1_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.scrim2_0 = new Item(
        /* itemId */ "scrim2_0",
        /* itemEl */ null,
        /* itemName */ "full stop",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemText */ "full-stop scrim (reduces brightness more)",
        /* itemImage */ "scrim2_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.scrim3_0 = new Item(
        /* itemId */ "scrim3_0",
        /* itemEl */ null,
        /* itemName */ "gradiated",
        /* itemType */ "grid",
        /* itemMove */ "dragger",
        /* itemText */ "gradiated scrim -- cuts light more at bottom of beam",
        /* itemImage */ "scrim3_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* bounds */ { L:0, T:0, W:canvasS.canW, H:canvasS.canH }      // relative
    );
    items.f650_0_2 = new Item(
        /* itemId */ "f650_0_2",
        /* itemEl */ null,
        /* itemName */ "scrims_650",
        /* itemType */ "setup",
        /* itemMove */ "none",
        /* itemText */ "",
        /* itemImage */ "f650_0",
        /* itemTargets */ [targets.barndoorFrame],
        /* itemControls */ [],
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
        /* itemControls */ [],
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* minMaxLT */ { minL:0, minT:0, maxL:0, maxT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:600, T:30, W:52, H:40 },      // relative
        /* bounds */ { L:290, T:20, W:340, H:110 }      // relative
    );
    return items;
}

function Item(itemId, itemEl, itemName, itemType, itemMove, itemText, itemImage, itemTargets, itemControls, startXY, minMaxLT, dropLoc, initLoc, bounds) {
    this.itemId = itemId;
    this.itemEl = itemEl;
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemMove = itemMove;
    this.itemText = itemText;
    this.itemImage = itemImage;
    this.itemTargets = itemTargets;
    this.itemControls = itemControls;
    this.startXY = startXY;
    this.minMaxLT = minMaxLT;
    this.initLoc = initLoc;
    this.dropLoc = dropLoc;
    this.bounds = bounds;
}
