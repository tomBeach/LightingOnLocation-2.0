
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======

function initItems() {
    console.log("initItems");

    var items = {};

    items.scrim1_0 = new Item(
        /* itemId */ "scrim1_0",
        /* itemEl */ null,
        /* itemName */ "half stop",
        /* itemType */ "menu",
        /* itemMove */ "dragger",
        /* itemText */ "move scrims to the barndoor frame",
        /* itemImage */ "scrim1_0",
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* locator */ { L:0, R:100, T:0, B:100 }
    );
    items.scrim2_0 = new Item(
        /* itemId */ "scrim2_0",
        /* itemEl */ null,
        /* itemName */ "full stop",
        /* itemType */ "menu",
        /* itemMove */ "dragger",
        /* itemText */ "move scrims to the barndoor frame",
        /* itemImage */ "scrim2_0",
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* locator */ { L:0, R:100, T:110, B:210 }
    );
    items.scrim3_0 = new Item(
        /* itemId */ "scrim3_0",
        /* itemEl */ null,
        /* itemName */ "gradiated",
        /* itemType */ "menu",
        /* itemMove */ "dragger",
        /* itemText */ "move scrims to the barndoor frame",
        /* itemImage */ "scrim3_0",
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:0, T:0, W:100, H:100 },
        /* locator */ { L:0, R:100, T:320, B:420 }
    );
    items.f650_0_2 = new Item(
        /* itemId */ "f650_0_2",
        /* itemEl */ null,
        /* itemName */ "scrims_650",
        /* itemType */ "setup",
        /* itemMove */ "none",
        /* itemText */ "barndoor frame",
        /* itemImage */ "f650_0",
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:200, T:80, W:350, H:270 },
        /* locator */ { L:200, R:650, T:80, B:370 }
    );
    items.distance_0_1 = new Item(
        /* itemId */ "distance_0_1",
        /* itemEl */ null,
        /* itemName */ "distance_650",
        /* itemType */ "actor",
        /* itemMove */ "slider",
        /* itemText */ "click and drag light icon to change position",
        /* itemImage */ "f650_0",
        /* startXY */ { itemL:0, itemT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:560, T:20, W:52, H:40 },
        /* locator */ { L:260, T:20, W:300, H:100 }
    );
    return items;
}

function Item(itemId, itemEl, itemName, itemType, itemMove, itemText, itemImage, startXY, dropLoc, initLoc, locator) {
    this.itemId = itemId;
    this.itemEl = itemEl;
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemMove = itemMove;
    this.itemText = itemText;
    this.itemImage = itemImage;
    this.startXY = startXY;
    this.initLoc = initLoc;
    this.dropLoc = dropLoc;
    this.locator = locator;
}
