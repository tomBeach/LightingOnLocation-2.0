
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======

function initPages(Actor_Data) {
    console.log("initPages");

    // pageKey, pageText, SetupItems, GroupItems, MenuItems, ActorItems, TargetItems, studioCanvas, monitorCanvas
    var pages = {};

    // ======= demo items =======
    pages.page_0_0 = new Page (
        /* pageKey */ "0_0",
        /* pageText */ "You were hired as the grip for a big production but the DP called in.  Now the job is yours and the crew is waiting.  Better know how to light up a set!  Keep reading.  If you don't know, you will soon!",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* MenuItems */ [],
        /* ActorItems */ [],
        /* TargetItems */ [],
        /* studio */ { text:null, image:null, startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { text:null, image:null, startFrame:0, endFrame:6, initFrame:0 }
	);
	pages.page_0_1 = new Page (
        /* pageKey */ "0_1",
        /* pageText */ "The first thing to know is intensity: how bright the light is.  There are many ways to control intensity.  Number 1: distance.  The closer your light is to the subject, the brighter it is.  DSrag the light icon to see how brightness changes with distance.  What else happens as you move the light in and out?",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* MenuItems */ [],
        /* ActorItems */ [Actor_Data.slider_0_01],
        /* TargetItems */ [],
        /* studio */ { text:null, image:"st_int_distance", startFrame:0, endFrame:6, initFrame:0 },
        /* monitor */ { text:null, image:"mn_int_distance", startFrame:0, endFrame:6, initFrame:0 }
	);
    return pages;
}

function Page (pageKey, pageText, SetupItems, GroupItems, MenuItems, ActorItems, TargetItems, studio, monitor) {
    // console.log(' Page');
    this.pageKey = pageKey;
    this.pageText = pageText;
    this.SetupItems = SetupItems;
    this.GroupItems = GroupItems;
    this.MenuItems = MenuItems;
    this.ActorItems = ActorItems;
    this.TargetItems = TargetItems;
    this.studio = studio;
    this.monitor = monitor;
}
