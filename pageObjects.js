
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======

function initPages(items, targets) {
    console.log("initPages");

    // pageKey, pageText, SetupItems, GroupItems, GridItems, ActorItems, TargetItems, studioCanvas, monitorCanvas
    var pages = {};

    // ======= demo items =======
    pages.page_0_0 = new Page (
        /* pageKey */ "0_0",
        /* pageText */ "You were hired as the grip for a big production but the DP called in.  Now the job is yours and the crew is waiting.  Better know how to light up a set!  Keep reading.  If you don't know, you will soon!",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { text:null, image:null, startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { text:null, image:null, startFrame:0, endFrame:6, initFrame:0 }
	);
	pages.page_0_1 = new Page (
        /* pageKey */ "0_1",
        /* pageText */ "The first thing to know is intensity: how bright the light is.  There are many ways to control intensity.  Number 1: distance.  The closer your light is to the subject, the brighter it is.  Drag the light icon to see how brightness changes with distance.  What else happens as you move the light in and out?",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [items.distance_0_1],
        /* TargetItems */ [],
        /* guides */ [{ itemId:"distance_0_1", L:260, T:20, W:300, H:100 }],
        /* studio */ { text:null, image:"st_int_distance", startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { text:null, image:"mn_int_distance", startFrame:0, endFrame:6, initFrame:0 }
	);
    pages.page_0_2 = new Page (
        /* pageKey */ "0_2",
        /* pageText */ "Often, moving lights is not easy --  especially when its a 20k HMI lighting up a city block.  But if it's too bright you can drop a scrim into the barn door frame and cut it down a bit.  Drag some scrims towards the light and drop them into the barndoor frame.  Easy!",
        /* SetupItems */ [items.f650_0_2],
        /* GroupItems */ [],
        /* GridItems */ [items.scrim1_0, items.scrim2_0, items.scrim3_0],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { text:null, image:"st_int_power", startFrame:0, endFrame:4, initFrame:4, indexedFrames:[3, 2, 1] },
        /* monitor */ { text:null, image:"mn_int_power", startFrame:0, endFrame:4, initFrame:4, indexedFrames:[3, 2, 1] }
	);
	pages.page_1_0 = new Page (
        /* pageKey */ "1_0",
        /* pageText */ "s;roh sdofh sdofuhzs lfhlkxdjhfL SouhlSIDugf ?",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* GridItems */ [],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* guides */ [],
        /* studio */ { text:null, image:"st_int_distance", startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { text:null, image:"mn_int_distance", startFrame:0, endFrame:6, initFrame:0 }
	);
    return pages;
}

function Page (pageKey, pageText, SetupItems, GroupItems, GridItems, ActorItems, TargetItems, guides, studio, monitor) {
    // console.log(' Page');
    this.pageKey = pageKey;
    this.pageText = pageText;
    this.SetupItems = SetupItems;
    this.GroupItems = GroupItems;
    this.GridItems = GridItems;
    this.ActorItems = ActorItems;
    this.TargetItems = TargetItems;
    this.guides = guides;
    this.studio = studio;
    this.monitor = monitor;
}
