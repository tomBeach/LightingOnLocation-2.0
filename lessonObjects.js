
// ======= ======= ======= LESSON OBJECTS ======= ======= =======
// ======= ======= ======= LESSON OBJECTS ======= ======= =======
// ======= ======= ======= LESSON OBJECTS ======= ======= =======

function initLessons() {
    console.log("initLessons");

    // lessonTitle, lessonSubtitle
    var lessons = {};

    // ======= demo items =======
	lessons.lesson_0 = new Lesson (
        /* lessonTitle */ "Intro to Lighting",
        /* lessonSubtitle */ "qualtity, quality, color position"
	);
    lessons.lesson_1 = new Lesson ( "Intensity", "lights and brightness" );
    lessons.lesson_2 = new Lesson ( "Qualtity", "soft or hard" );
    lessons.lesson_3 = new Lesson ( "Color", "warm, cool, effects" );
    lessons.lesson_4 = new Lesson ( "Position", "location, location, location" );
    lessons.lesson_5 = new Lesson ( "Instruments", "light show" );
    lessons.lesson_6 = new Lesson ( "Stands", "from babies to mombos" );
    lessons.lesson_7 = new Lesson ( "Controllers", "gobos, floppies, cookies and more" );
    lessons.lesson_8 = new Lesson ( "Rigging", "hanging lights with nothing to hang on to" );
    return lessons;
}

function Lesson (lessonTitle, lessonSubtitle) {
    // console.log(' Lesson');
    this.lessonTitle = lessonTitle;
    this.lessonSubtitle = lessonSubtitle;
}
