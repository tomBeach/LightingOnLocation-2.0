
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======
// ======= ======= ======= ITEM OBJECTS ======= ======= =======

function initActors() {
    console.log("initActors");

    var actors = {};

    actors.drag_0_01 = new Actor(
        /* actorId */ "drag_0_01",
        /* actorEl */ null,
        /* startXY */ { actorX:0, actorY:0, mouseX:0, mouseY:0, diffX:0, diffY:0 },
        /* actorName */ "distance_650",
        /* actorType */ "dragger",
        /* actorImage */ "f650_0",
        /* initLoc */ { X:560, Y:290, W:100, H:100 },
        /* dropLoc */ { X:0, Y:0, W:0, H:0 },
        /* locator */ { L:250, R:540, T:300, B:400 }
    );
    actors.slider_0_01 = new Actor(
        /* actorId */ "slider_0_01",
        /* actorEl */ null,
        /* startXY */ { actorX:0, actorY:0, mouseX:0, mouseY:0, diffX:0, diffY:0 },
        /* actorName */ "distance_650",
        /* actorType */ "slider",
        /* actorImage */ "f650_0",
        /* initLoc */ { X:560, Y:290, W:100, H:100 },
        /* dropLoc */ { X:0, Y:0, W:0, H:0 },
        /* locator */ { L:250, R:540, T:300, B:400 }
    );
    return actors;
}

function Actor(actorId, actorEl, startXY, actorName, actorType, actorImage, initLoc, dropLoc, locator) {
    this.actorId = actorId;
    this.actorEl = actorEl;
    this.startXY = startXY;
    this.actorName = actorName;
    this.actorType = actorType;
    this.actorImage = actorImage;
    this.initLoc = initLoc;
    this.dropLoc = dropLoc;
    this.locator = locator;
}
