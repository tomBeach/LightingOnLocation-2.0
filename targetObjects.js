
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
        /* initLoc */ { L:110, T:10, W:80, H:200 },
        /* absLoc */ { L:0, T:0, W:0, H:0 },
        /* occupier */ null
    );
    return targets;
}

function Target(itemId, itemEl, itemName, itemType, itemText, itemImage, initLoc, absLoc, occupier) {
    this.itemId = itemId;
    this.itemEl = itemEl;
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemText = itemText;
    this.itemImage = itemImage;
    this.initLoc = initLoc;
    this.absLoc = absLoc;
    this.occupier = occupier;
}
