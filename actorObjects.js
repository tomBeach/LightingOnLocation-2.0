
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======

function initActors() {
    console.log("initActors");

    var actors = {};

    actors.slider_0_01 = new Actor(
        /* actorId */ "slider_0_01",
        /* actorEl */ null,
        /* actorName */ "distance_650",
        /* actorType */ "slider",
        /* actorText */ "click and drag light icon to change position",
        /* actorImage */ "f650_0",
        /* startXY */ { actorL:0, actorT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
        /* dropLoc */ { L:0, T:0, W:0, H:0 },
        /* initLoc */ { L:560, T:20, W:52, H:40 },
        /* locator */ { L:260, T:20, W:300, H:100 }
    );
    // actors.drag_0_01 = new Actor(
    //     /* actorId */ "drag_0_01",
    //     /* actorEl */ null,
    //     /* actorName */ "distance_650",
    //     /* actorType */ "dragger",
    //     /* actorText */ "click and drag light icon to change position",
    //     /* actorImage */ "f650_0",
    //     /* startXY */ { actorL:0, actorT:0, mouseX:0, mouseY:0, diffX:0, diffY:0, dragL:0, dragT:0 },
    //     /* dropLoc */ { L:0, T:0, W:0, H:0 },
    //     /* initLoc */ { L:560, T:320, W:52, H:40 },
    //     /* locator */ { L:270, R:560, T:320, B:400 }
    // );
    return actors;
}

function Actor(actorId, actorEl, actorName, actorType, actorText, actorImage, startXY, dropLoc, initLoc, locator) {
    this.actorId = actorId;
    this.actorEl = actorEl;
    this.actorName = actorName;
    this.actorType = actorType;
    this.actorText = actorText;
    this.actorImage = actorImage;
    this.startXY = startXY;
    this.initLoc = initLoc;
    this.dropLoc = dropLoc;
    this.locator = locator;
}
