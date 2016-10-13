
// ======= ======= ======= LESSON OBJECTS ======= ======= =======
// ======= ======= ======= LESSON OBJECTS ======= ======= =======
// ======= ======= ======= LESSON OBJECTS ======= ======= =======

var defaultLesson = {
    lessonIndex: 0,
    lessonTitle: "lessonTitle",
    lessonSubtitle: "lessonSubtitle",
    pageKeys: []
}

function initLessons() {
    console.log("initLessons");

    // lessonTitle, lessonSubtitle
    var lessons = {};

    // ======= demo items =======
	lessons.lesson_0 = new Lesson (
        /* lessonIndex */    0,
        /* lessonTitle */    "Intro to Lighting",
        /* lessonSubtitle */ "qualtity, quality, color position",
        /* pageKeys */       ["0_0", "0_1", "0_2"]
	);
    lessons.lesson_1 = new Lesson (
        /* lessonIndex */    1,
        /* lessonTitle */    "Intensity",
        /* lessonSubtitle */ "lights and brightness",
        /* pageKeys */       ["1_0"]
	);
    lessons.lesson_2 = new Lesson (
        /* lessonIndex */    2,
        /* lessonTitle */    "Qualtity",
        /* lessonSubtitle */ "soft light / hard light",
        /* pageKeys */       ["1_0"]
	);
    lessons.lesson_3 = new Lesson ( 3, "Color", "warm, cool, effects", ["0_0"] );
    lessons.lesson_4 = new Lesson ( 4, "Position", "location, location, location", ["0_0"] );
    lessons.lesson_5 = new Lesson ( 5, "Instruments", "light show", ["0_0"] );
    lessons.lesson_6 = new Lesson ( 6, "Stands", "from babies to mombos", ["0_0"] );
    lessons.lesson_7 = new Lesson ( 7, "Controllers", "gobos, floppies, cookies and more", ["0_0"] );
    lessons.lesson_8 = new Lesson ( 8, "Rigging", "hanging lights with nothing to hang on to", ["0_0"] );
    return lessons;
}

function Lesson (lessonIndex, lessonTitle, lessonSubtitle, pageKeys) {
    // console.log(' Lesson');
    this.lessonIndex = lessonIndex;
    this.lessonTitle = lessonTitle;
    this.lessonSubtitle = lessonSubtitle;
    this.pageKeys = pageKeys;
}
