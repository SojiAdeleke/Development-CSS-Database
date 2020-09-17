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

function makeNewWeek() {
  const nextWeek = (databaseSheet.getLastColumn() - 12) / 9 + 1;

  createWeek(nextWeek);
  setWeekReqs(nextWeek);
  applyWeekFormatting(nextWeek);
  protectWeek(nextWeek);
}

//add protect for each week
function createWeek(weekNum: number) {
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

  templateRange.copyTo(weekInfo);
  //set background color
  weekInfo.setBackground(
    isOdd ? weekTheme.odd.backgroundColor : weekTheme.even.backgroundColor
  );
  //set week and date info
  databaseSheet.getRange(1, startOfNewWeekCol).setValue("WEEK " + weekNum);
  databaseSheet
    .getRange(2, startOfNewWeekCol + 2)
    .setFormula("=TEXT(K1+" + (weekNum - 1) * 7 + ',"YYYY-MM-DD")');
  databaseSheet
    .getRange(2, startOfNewWeekCol + 6)
    .setValue("=TEXT(K1+" + ((weekNum - 1) * 7 + 6) + ',"YYYY-MM-DD")');
}
function setWeekReqs(weekNum: number) {
  const weekReqs = new Array(scholarInfo.length);

  for (let row = 0; row < weekReqs.length; row++) {
    weekReqs[row] = new Array(3);
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
function protectWeek(weekNum: number) {
  const getColumn = function (column: number) {
    return databaseSheet.getRange(
      firstWeekDatabase.row,
      firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + column,
      scholarInfo.length,
      1
    );
  };
  const wahfProtection = getColumn(0).protect().setDescription("WAHF PROTECTION"),
    semProtection = getColumn(1).protect().setDescription("SEMINAR PROTECTION"),
    ssProtection = getColumn(2)
      .protect()
      .setDescription("STUDY SESSION PROTECTION"),
    fdProtection = getColumn(3)
      .protect()
      .setDescription("FRONT DESK PROTECTION"),
    zoomProtection = getColumn(4).protect().setDescription("ZOOM PROTECTION"),
    tlmProtection = getColumn(5)
      .protect()
      .setDescription("TEAM LEADER MEETING PROTECTION"),
    gamProtection = getColumn(6)
      .protect()
      .setDescription("GRAD MEETING PROTECTION"),
    mcfProtection = getColumn(7).protect().setDescription("MCF PROTECTION"),
    wplProtection = getColumn(8).protect().setDescription("WPL PROTECTION");
  const sheetEditors = wahfProtection.getEditors();

  wahfProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
  semProtection.removeEditors(sheetEditors).addEditors(databaseAdmin.concat(fillers.seminar.tls.map(tl => tl.email)));
  ssProtection
    .removeEditors(sheetEditors)
    .addEditors(databaseAdmin.concat(fillers.studySession.tls.map(tl => tl.email)));
  fdProtection.removeEditors(sheetEditors).addEditors(databaseAdmin.concat(fillers.frontDesk.tls.map(tl => tl.email)));
  zoomProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
  tlmProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
  gamProtection
    .removeEditors(sheetEditors)
    .addEditors(databaseAdmin.concat(gaInfo));
  mcfProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
  wplProtection.removeEditors(sheetEditors).addEditors(databaseAdmin);
}
