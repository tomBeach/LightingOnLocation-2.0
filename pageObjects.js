
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======
// ======= ======= ======= PAGE OBJECTS ======= ======= =======

function initPages(Actor_Data) {
    console.log("initPages");

    // pageKey, pageText, SetupItems, GroupItems, MenuItems, ActorItems, TargetItems, studioCanvas, monitorCanvas
    var pages = {};

    // ======= demo items =======
	pages.page_0_01 = new Page (
        /* pageKey */ "0_01",
        /* pageText */ "Intro to Lighting Lorem ipsum dolor sit amet, sit quem fabulas recusabo eu, ea quod definiebas his. Ut justo repudiare pertinacia quo, eum libris meliore dignissim no. Sint inimicus assueverit vis te. Nam ei quando aliquam tibique, debet senserit voluptatum cu quo. Duo augue error vocibus cu. Ius docendi posidonium ei, cum mundi ponderum cu, postea philosophia ad est. His eu nihil ceteros noluisse, ad sea facilis omittantur. Tota iriure ex sit, eum erant assentior voluptaria ut, lucilius patrioque quo no. In vis quod vide noster. Autem mucius copiosae cu pri, aeque graece est ut.",
        /* SetupItems */ [],
        /* GroupItems */ [],
        /* MenuItems */ [],
        /* ActorItems */ [Actor_Data.slider_0_01],
        /* TargetItems */ [],
        /* studioCanvas */ { image:"st_int_distance", startFrame:0, endFrame:6, initFrame:0 },
        /* monitorCanvas */ { image:"mn_int_distance", startFrame:0, endFrame:6, initFrame:0 }
	);
    return pages;
}

function Page (pageKey, pageText, SetupItems, GroupItems, MenuItems, ActorItems, TargetItems, studioCanvas, monitorCanvas) {
    // console.log(' Page');
    this.pageKey = pageKey;
    this.pageText = pageText;
    this.SetupItems = SetupItems;
    this.GroupItems = GroupItems;
    this.MenuItems = MenuItems;
    this.ActorItems = ActorItems;
    this.TargetItems = TargetItems;
    this.studioCanvas = studioCanvas;
    this.monitorCanvas = monitorCanvas;
}
