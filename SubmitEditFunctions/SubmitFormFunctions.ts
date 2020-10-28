
// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onFormSubmit(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    const sheetName = e.range.getSheet().getName();

    Logger.log(sheetName);
    if (sheetName == "L1. WAHF") submitWAHF(e);
    else if (sheetName == "L2. MCF") submitMCF(e);
    else if (sheetName == "L3. WPL") submitWPL(e);
    else if (sheetName == "L4. Traffic") submitTraffic(e);
    else if (sheetName == "L6. Tutor Report Log") submitTutor(e);
    else if (sheetName == "Zoom Room Sign-In") submitZoom(e);
}

//WAHF should *ONLY* be submited by the automated google form.
function submitWAHF(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    const uid = e.values[1];
    const name = getNameFormula(uid);

    //set first name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 1, name[0]);
    //set last name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 2, name[1]);
}

function submitMCF(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    const menteeUid = e.values[2], mentorUid = e.values[1];
    const menteeName = getNameFormula(menteeUid), mentorName = getNameFormula(mentorUid);

    //set TL first name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 1, mentorName[0]);
    //set TL last name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 2, mentorName[1]);
    //set mentee first name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 3, menteeName[0]);
    //set mentee last name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 4, menteeName[1]);
}

function submitWPL(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    const uid = e.values[1];
    const name = getNameFormula(uid);

    //set first name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 1, name[0]);
    //set last name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 2, name[1]);
}

function submitTraffic(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    Logger.log(e.range.getSheet().getName());
}

function submitRRF(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    Logger.log(e.range.getSheet().getName());
}

function submitTutor(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    const tutorUid = e.values[2], studentUid = e.values[4];
    const tutorName = getTutorNameFormula(tutorUid), studentName = getNameFormula(studentUid);
    const timestamp = e.values[0];

    //set tutor name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 4, tutorName);
    //set last name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 6, studentName[0]);
    //set first name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 7, studentName[1]);
    //set week
    setCellFormula(e.range.getSheet(), e.range.getRow(), 1, '="Week "&ROUNDDOWN(("' + timestamp + '"-' + startOfSemesterFormula + ")/7)+1");
    //set day of week
    setCellFormula(e.range.getSheet(), e.range.getRow(), 3, '=IFERROR(CHOOSE( weekday("' +
        timestamp +
        '"),"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"), "ERROR")');
    //set tutor hours
    setCellFormula(e.range.getSheet(), e.range.getRow(), 9, "=IFERROR(VLOOKUP(" +
        tutorUid +
        ',TutoringDatabase!$A$2:$C$11,3,FALSE),"Hours not input")');
}

function submitZoom(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
    Logger.log(e.values);
    const studentUid = e.values[2];
    const timestamp = e.values[1];
    const studentName = getNameFormula(studentUid);

    //set last name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 1, studentName[0]);
    //set first name
    setCellFormula(e.range.getSheet(), e.range.getRow(), 2, studentName[1]);
    //set week
    setCellFormula(e.range.getSheet(), e.range.getRow(), 5, '="Week "&ROUNDDOWN(("' + timestamp + '"-' + startOfSemesterFormula + ")/7)+1");
}
