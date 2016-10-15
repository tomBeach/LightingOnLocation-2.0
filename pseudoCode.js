var display = {
  itemNamesArray = ["menu", "group", "actors", "setup", "targets", "controls", "trackpad", "tooltips", "titleText", "occupier", "canvasFrames"];
}

makePageBuilder() {
    console.log("makePageBuilder");

    
}

var defaultDisplay = {
    studioCanvas: null,
    monitorCanvas: null,
    lessonBox: null,
    shopBox: null
}

var defaultPage = {
    pageKey: null,
    pageName: null,
    pageText: null,
    SetupItems: null,
    GroupItems: null,
    GridItems: null,
    ActorItems: null,
    TargetItems: null,
    studioCanvas: null,
    monitorCanvas: null,
    studioImages: null,
    monitorImages: null
};

var defaultItem = {
    itemKey: null,
    itemName: null,
    itemType: null,
    itemClass: null,
    itemState: null,
    frameset: null,
    initLoc: { locX: 0, locY: 0, locW: 0, locH: 0 },
    dropLoc: { locX: 0, locY: 0, locW: 0, locH: 0 },
    itemTargets: null,
    itemControls: null
}

var defaultFrameSet = {
    name: null,
    length: 7,
    defaultIndex: 0
}










["pageKey", "pageName", "pageText", "clickTrail", "items_Setup", "locators_S", "targets_S", "behavior_ST", "controls_S", "behavior_SC", "items_Menu", "locators_M", "behaviors_M", "items_Group", "locators_G", "behaviors_G", "items_Actor", "locators_A", "behaviors_A", "targets_T", "locators_T", "behaviors_T", "canvasL", "canvasM", "imagePoolL", "imagePoolM"]

pageKey:*/ 'db_11000',
/* pageName:    */ 'Power',
/* pageText:    */ text_Data.t_int_power,
/* clickTrail:  */ [],

/* items_Setup:   */ 0,
/*   locators_S:  */ 0,
/*   targets_S:   */ 0,
/*   behavior_ST: */ 0,
/*   controls_S:  */ 0,
/*   behavior_SC: */ 0,
/* items_Menu:    */ 0,
/*   locators_M:  */ 0,
/*   behaviors_M: */ 0,
/* items_Group:   */ 0,
/*   locators_G:  */ 0,
/*   behaviors_G: */ 0,

/* items_Actor:   */ [items_Data.f150, items_Data.f300, items_Data.f650, items_Data.f1000],
/*   locators_A:  */ [[740,240,80,80,1], [740,340,80,80,1], [740,440,80,80,1], [740,540,80,80,1]],
/*   behaviors_A: */ [behaviors_Data.bh_dragger2, behaviors_Data.bh_dragger2, behaviors_Data.bh_dragger2, behaviors_Data.bh_dragger2],
/* targets_T:     */ [targets_Data.pg_light],
/*   locators_T:  */ [[555,270,80,80,1]],
/*   behaviors_T: */ [behaviors_Data.swapLight],
/* canvasL:       */ ['st_int_power', 0, [0,1,2,3,4]],
/* canvasM:       */ ['mn_int_power', 0, [0,1,2,3,4]],
/* imagePoolL:    */ 0,
/* imagePoolM:    */ 0,
