
// ======= ======= ======= TARGETS OBJECTS ======= ======= =======
// ======= ======= ======= TARGETS OBJECTS ======= ======= =======
// ======= ======= ======= TARGETS OBJECTS ======= ======= =======

function initTargets() {
    console.log("initTargets");

    var studioCanvas = clientApp.displayItems.studio;
    var targets = {};

    targets.barndoorFrame = new Target(
        /* itemId */ "barndoorFrame",
        /* itemEl */ null,
        /* itemName */ "barndoorFrame",
        /* itemType */ "setupTarget",
        /* itemText */ null,
        /* itemImage */ "null",
        /* initLoc */ { L:50, T:50, W:50, H:140 },
        /* bounds */ { L:0, T:0, W:0, H:0 },
        /* occupier */ null
    );
    return targets;
}

function Target(itemId, itemEl, itemName, itemType, itemText, itemImage, initLoc, bounds, occupier) {
    this.itemId = itemId;
    this.itemEl = itemEl;
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemText = itemText;
    this.itemImage = itemImage;
    this.initLoc = initLoc;
    this.bounds = bounds;
    this.occupier = occupier;
}
