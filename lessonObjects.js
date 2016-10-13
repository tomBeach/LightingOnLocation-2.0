
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
        /* lessonIndex */ 0,
        /* lessonTitle */ "Intro to Lighting",
        /* lessonSubtitle */ "qualtity, quality, color position",
        /* pageKeys */ ["0_0", "0_1", "0_2", "0_3", "0_4"]
	);
    lessons.lesson_1 = new Lesson ( 1, "Intensity", "lights and brightness" );
    lessons.lesson_2 = new Lesson ( 2, "Qualtity", "soft or hard" );
    lessons.lesson_3 = new Lesson ( 3, "Color", "warm, cool, effects" );
    lessons.lesson_4 = new Lesson ( 4, "Position", "location, location, location" );
    lessons.lesson_5 = new Lesson ( 5, "Instruments", "light show" );
    lessons.lesson_6 = new Lesson ( 6, "Stands", "from babies to mombos" );
    lessons.lesson_7 = new Lesson ( 7, "Controllers", "gobos, floppies, cookies and more" );
    lessons.lesson_8 = new Lesson ( 8, "Rigging", "hanging lights with nothing to hang on to" );
    return lessons;
}

function Lesson (lessonIndex, lessonTitle, lessonSubtitle, pageKeys) {
    // console.log(' Lesson');
    this.lessonIndex = lessonIndex;
    this.lessonTitle = lessonTitle;
    this.lessonSubtitle = lessonSubtitle;
    this.pageKeys = pageKeys;
}
