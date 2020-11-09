
function setWeekFormulas(weekNum: number): void {
    const startColumn = firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1);
    const startWeekDate = databaseSheet.getRange(2, startColumn + 2).getValue() as string;
    const endWeekDate = databaseSheet.getRange(2, startColumn + 6).getValue() as string;
    const wahfFormulas = new Array(scholarInfo.length) as string[][];
    const zoomFormulas = new Array(scholarInfo.length) as string[][];
    const tlmFormulas = new Array(scholarInfo.length) as string[][];
    const gamList = new Array(scholarInfo.length).fill([
        "N/A"
    ]) as string[][];
    const mcfFormulas = new Array(scholarInfo.length) as string[][];
    const wplFormulas = new Array(scholarInfo.length) as string[][];

    for (let row = 0; row < scholarInfo.length; row++) {
        wahfFormulas[row] = new Array(1) as string[];
        zoomFormulas[row] = new Array(1) as string[];
        tlmFormulas[row] = new Array(1) as string[];
        mcfFormulas[row] = new Array(1) as string[];
        wplFormulas[row] = new Array(1) as string[];
        const scholar = scholarInfo[row];

        //WAHF
        wahfFormulas[row][0] = `=IF(OR(${scholar.cohort} > ${(startOfSemester.year - 2)}, "${scholar.role}" <> "Scholar"), IFERROR(QUERY('L1. WAHF'!$C$3:$D$1835, "SELECT C WHERE C >= DATE '${startWeekDate}' AND C < DATE '${endWeekDate}' AND D CONTAINS '${scholar.uid}' LIMIT 1"), "Not found"), "N/A")`;
        //ZOOM
        zoomFormulas[row][0] = `=IF(OR(${scholar.cohort} > ${(startOfSemester.year - 2)}, "${scholar.role}" <> "Scholar"), IFERROR(QUERY('Zoom Room Sign-In'!$C$3:$D$1835, "SELECT COUNT(D) WHERE C >= DATE '${startWeekDate}' AND C < DATE '${endWeekDate}' AND D CONTAINS '${scholar.uid}' LABEL COUNT(D) ''",0), 0), "N/A")`;
        //TLM
        tlmFormulas[row][0] =
            '=IF("' +
            scholar.teamLeader +
            '" <>"N/A", IFERROR(IF(QUERY(\'L2. MCF\'!$A$3:$K$3369, "SELECT COUNT(F) WHERE E >= DATE \'' +
            startWeekDate +
            "' AND E < DATE '" +
            endWeekDate +
            "' AND G CONTAINS '" +
            scholar.uid +
            '\' LABEL COUNT(F) \'\'")<>0, "✔", "✘"), "✘"), "N/A")';
        //MCF
        mcfFormulas[row][0] =
            '=IF("' +
            scholar.role +
            '"="Team Leader",IFERROR(QUERY(\'L2. MCF\'!$A$3:$K$3369, "SELECT COUNT(F) WHERE E >= DATE \'' +
            startWeekDate +
            "' AND E < DATE '" +
            endWeekDate +
            "' AND F CONTAINS '" +
            scholar.uid +
            "' LABEL COUNT(F) ''\",0),0),\"N/A\")";
        //WPL
        wplFormulas[row][0] =
            '=IF("' +
            scholar.role +
            '" <> "Scholar", IFERROR(QUERY(\'L3. WPL\'!$C$3:$D$526, "SELECT C WHERE C > DATE \'' +
            startWeekDate +
            "' AND C <= DATE '" +
            endWeekDate +
            "' AND D CONTAINS '" +
            scholar.uid +
            '\' LIMIT 1"),"Not found"),"N/A")';
    }
    //set wahf
    const ranges = [
        getColumn(weekNum, WEEK_INFO.WAHF).setValues(wahfFormulas),
        getColumn(weekNum, WEEK_INFO.ZOOM).setValues(zoomFormulas),
        getColumn(weekNum, WEEK_INFO.TL_MEETING).setValues(tlmFormulas),
        getColumn(weekNum, WEEK_INFO.GA_MEETING).setValues(gamList),
        getColumn(weekNum, WEEK_INFO.MCF).setValues(mcfFormulas),
        getColumn(weekNum, WEEK_INFO.WPL).setValues(wplFormulas)
    ]

    SpreadsheetApp.flush();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateFormulas(): void {
    const thisWeekNum = getWeekNum();

    setWeekFormulas(thisWeekNum);
    applyWeekFormatting(thisWeekNum);

    [
        WEEK_INFO.FRONT_DESK,
        WEEK_INFO.ZOOM,
        WEEK_INFO.STUDY_SESSION,
        WEEK_INFO.MCF
    ].forEach((type: WEEK_INFO) => applyNumberCheck(
        getColumn(thisWeekNum, type),
        type))
}

function updateIAPColumn(){
    let statuses = updateIAP();
    const iapcol =  databaseSheet.getRange(firstWeekDatabase.row, 11, scholarInfo.length, 1);
    iapcol.setValues(statuses)
}

/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable no-var */

const weekTheme = {
    odd: {
        backgroundColor: "#45818e",
    },
    even: {
        backgroundColor: "#76a5af",
    },
    weekLength: 9,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function makeNewWeek(): void {
    const nextWeek = (databaseSheet.getLastColumn() - 12) / 9 + 1;

    createWeek(nextWeek);
    setWeekReqs(nextWeek);
    applyWeekFormatting(nextWeek);
    protectWeek(nextWeek);
    //updateIAPColumn();
}

//add protect for each week
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createWeek(weekNum: number): void {
    const isOdd = weekNum % 2 == 1;
    const currLastCol = databaseSheet.getLastColumn();
    const startOfNewWeekCol = currLastCol + 1;

    //create columns
    databaseSheet.insertColumnsAfter(currLastCol, weekTheme.weekLength);
    //prepare week
    databaseSheet.getRange(1, startOfNewWeekCol, 1, weekTheme.weekLength).merge();
    databaseSheet.getRange(2, startOfNewWeekCol + 3, 1, 3).merge();
    //copy template
    const weekInfo = databaseSheet
        .getRange(1, startOfNewWeekCol, 3, weekTheme.weekLength)
        .setBorder(false, false, false, false, false, false);
    const templateRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
        "WeekTemplate"
    );

    if (templateRange == null) {
        const templateError = new Error("Wrong Template Name!");

        sendError(templateError);
        throw templateError;
    }

    templateRange.copyTo(weekInfo);
    //set background color
    weekInfo.setBackground(
        isOdd ? weekTheme.odd.backgroundColor : weekTheme.even.backgroundColor
    );
    //set week and date info
    databaseSheet.getRange(1, startOfNewWeekCol).setValue(`WEEK ${weekNum}`);
    databaseSheet
        .getRange(2, startOfNewWeekCol + 2)
        .setFormula(`=TEXT(K1+${(weekNum - 1) * 7},"YYYY-MM-DD")`);
    databaseSheet
        .getRange(2, startOfNewWeekCol + 6)
        .setValue(`=TEXT(K1+${(weekNum - 1) * 7 + 6},"YYYY-MM-DD")`);
}

function setWeekReqs(weekNum: number): void {
    const weekReqs = new Array(scholarInfo.length) as string[][];

    for (let row = 0; row < weekReqs.length; row++) {
        weekReqs[row] = new Array(3) as string[];
        const scholar = scholarInfo[row];

        //SEMINAR
        weekReqs[row][0] = scholar.status == SCHOLAR_TYPES.FRESHMAN ? "" : "N/A";
        //STUDY SESSION
        weekReqs[row][1] =
            scholar.studySessionReq == "0" || scholar.studySessionReq == "-"
                ? "N/A"
                : "";
        //FRONT DESK
        weekReqs[row][2] =
            scholar.frontDeskReq == "0" || scholar.frontDeskReq == "-" ? "N/A" : "";
    }
    databaseSheet
        .getRange(
            firstWeekDatabase.row,
            firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + 1,
            weekReqs.length,
            3
        )
        .setValues(weekReqs);
}

function protectWeek(weekNum: number): void {
    const wahfProtection = getColumn(weekNum, 0)
        .protect()
        .setDescription("WAHF PROTECTION"),
        semProtection = getColumn(weekNum, 1).protect().setDescription("SEMINAR PROTECTION"),
        ssProtection = getColumn(weekNum, 2)
            .protect()
            .setDescription("STUDY SESSION PROTECTION"),
        fdProtection = getColumn(weekNum, 3)
            .protect()
            .setDescription("FRONT DESK PROTECTION"),
        zoomProtection = getColumn(weekNum, 4).protect().setDescription("ZOOM PROTECTION"),
        tlmProtection = getColumn(weekNum, 5)
            .protect()
            .setDescription("TEAM LEADER MEETING PROTECTION"),
        gamProtection = getColumn(weekNum, 6)
            .protect()
            .setDescription("GRAD MEETING PROTECTION"),
        mcfProtection = getColumn(weekNum, 7).protect().setDescription("MCF PROTECTION"),
        wplProtection = getColumn(weekNum, 8).protect().setDescription("WPL PROTECTION");
    const sheetEditors = wahfProtection.getEditors();

    wahfProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
    semProtection
        .removeEditors(sheetEditors)
        .addEditors(
            databaseAdmin.concat(seminarFiller.tls.map((tl) => tl.email))
        );
    ssProtection
        .removeEditors(sheetEditors)
        .addEditors(
            databaseAdmin.concat(studySessionFiller.tls.map((tl) => tl.email))
        );
    fdProtection
        .removeEditors(sheetEditors)
        .addEditors(
            databaseAdmin.concat(frontDeskFiller.tls.map((tl) => tl.email))
        );
    zoomProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
    tlmProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
    gamProtection
        .removeEditors(sheetEditors)
        .addEditors(databaseAdmin.concat(gaInfo));
    mcfProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
    wplProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
}