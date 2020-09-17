/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable no-var */

const activeSheet = SpreadsheetApp.getActiveSheet();
const holdCell = SpreadsheetApp.getActiveSpreadsheet().getRange(
  "'Master Queries'!I22"
);
const startOfSemester = {
  month: 8,
  day: 31,
  year: 2020,
};
const startOfSemesterFormula =
  "DATE(" +
  startOfSemester.year +
  "," +
  startOfSemester.month +
  "," +
  startOfSemester.day +
  ")";
const databaseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
const lastScholarRow = databaseSheet.getLastRow();
const firstWeekDatabase = { row: 4, column: 13 };
const scholarInfo = initScholarInfo();

function initScholarInfo(): Scholar[] {
  const values = databaseSheet
    .getRange(
      firstWeekDatabase.row,
      1,
      lastScholarRow - firstWeekDatabase.row + 1,
      11
    )
    .getValues();
  const allInfo = new Array(values.length);

  for (let scholarRow = 0; scholarRow < allInfo.length; scholarRow++)
    allInfo[scholarRow] = getScholarInformation(values[scholarRow]);
  return allInfo;
}
function revertHoldCell() {
  holdCell.setValue("");
}
//returns [lastName, firstName]
function getNameFormula(uid: string) {
  return [
    "=IFERROR(VLOOKUP(" +
    uid +
    ",Database!$A$4:$K$" +
    lastScholarRow +
    ',2,FALSE),"Unknown")',
    "=IFERROR(VLOOKUP(" +
    uid +
    ",Database!$A$4:$K$" +
    lastScholarRow +
    ',3,FALSE),"Unknown")',
  ];
}
function getTutorNameFormula(uid: string) {
  return (
    "=IFERROR(VLOOKUP(" +
    uid +
    ",TutoringDatabase!$A$2:$C$" +
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("TutoringDatabase")
      .getLastRow() +
    ',2=,FALSE),"Hours not input")'
  );
}
//sets a call's formula
function setCellFormula(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, column: number, formula: string) {
  const cell = sheet.getRange(row, column);

  cell.setValue(getFormulaResult(formula));
}

function getFormulaResult(formula: string) {
  holdCell.setFormula(formula);
  const val = holdCell.getValue();
  revertHoldCell();
  return val;
}
function getCellValue(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, column: number) {
  if (sheet === void 0) {
    sheet = activeSheet;
  }
  return sheet.getRange(row, column).getValue();
}
function keepValues(range: GoogleAppsScript.Spreadsheet.Range) {
  const values = range.getValues();

  range.setValues(values);
}

const getWeekNum = () => (databaseSheet.getLastColumn() - 12) / 9);

function updateFormulas() {
  const thisWeekNum = getWeekNum()
  setWeekFormulas(thisWeekNum);
  applyWeekFormatting(thisWeekNum);

  Object.keys(NUMBER_CHECK).forEach(type => applyNumberCheck(
    getColumn(thisWeekNum, NUMBER_CHECK[type]),
    Number(type)))
}

function setWeekFormulas(weekNum: number) {
  const startColumn = firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1);
  const startWeekDate = getCellValue(databaseSheet, 2, startColumn + 2);
  const endWeekDate = getCellValue(databaseSheet, 2, startColumn + 6);
  const wahfFormulas = new Array(scholarInfo.length);
  const zoomFormulas = new Array(scholarInfo.length);
  const tlmFormulas = new Array(scholarInfo.length);
  const gamList = new Array(scholarInfo.length).fill(["N/A"]);
  const mcfFormulas = new Array(scholarInfo.length);
  const wplFormulas = new Array(scholarInfo.length);

  for (let row = 0; row < scholarInfo.length; row++) {
    wahfFormulas[row] = new Array(1);
    zoomFormulas[row] = new Array(1);
    tlmFormulas[row] = new Array(1);
    mcfFormulas[row] = new Array(1);
    wplFormulas[row] = new Array(1);
    const scholar = scholarInfo[row];

    //WAHF
    wahfFormulas[row][0] =
      "=IF(OR(" +
      scholar.cohort +
      " > " +
      (startOfSemester.year - 2) +
      ', "' +
      scholar.role +
      '" <> "Scholar"), IFERROR(QUERY(\'L1. WAHF\'!$C$3:$D$1835, "SELECT C WHERE C >= DATE \'' +
      startWeekDate +
      "' AND C < DATE '" +
      endWeekDate +
      "' AND D CONTAINS '" +
      scholar.uid +
      '\' LIMIT 1"), "Not found"), "N/A")';
    //ZOOM
    zoomFormulas[row][0] =
      "=IF(OR(" +
      scholar.cohort +
      " > " +
      (startOfSemester.year - 2) +
      ', "' +
      scholar.role +
      '" <> "Scholar"), IFERROR(QUERY(\'Zoom Room Sign-In\'!$C$3:$D$1835, "SELECT COUNT(D) WHERE C >= DATE \'' +
      startWeekDate +
      "' AND C < DATE '" +
      endWeekDate +
      "' AND D CONTAINS '" +
      scholar.uid +
      "' LABEL COUNT(D) ''\",0), 0), \"N/A\")";
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
  //keepValues(
  databaseSheet
    .getRange(
      firstWeekDatabase.row,
      firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1),
      wahfFormulas.length,
      1
    )
    .setValues(wahfFormulas)
  //);
  //set zoom
  databaseSheet
    .getRange(
      firstWeekDatabase.row,
      firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + 4,
      zoomFormulas.length,
      1
    )
    .setValues(zoomFormulas)

  //set tlm
  databaseSheet
    .getRange(
      firstWeekDatabase.row,
      firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + 5,
      tlmFormulas.length,
      1
    )
    .setValues(tlmFormulas)
  //set gam
  databaseSheet
    .getRange(
      firstWeekDatabase.row,
      firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + 6,
      wplFormulas.length,
      1
    )
    .setValues(gamList)
  //set mcf
  databaseSheet
    .getRange(
      firstWeekDatabase.row,
      firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + 7,
      mcfFormulas.length,
      1
    )
    .setValues(mcfFormulas)
  //set wpl
  databaseSheet
    .getRange(
      firstWeekDatabase.row,
      firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + 8,
      wplFormulas.length,
      1
    )
    .setValues(wplFormulas)

  SpreadsheetApp.flush();
}
function initScholarsReq() {
  const scholarReq = new Array(scholarInfo.length);

  for (let row = 0; row < scholarReq.length; row++) {
    scholarReq[row] = new Array(3);
    const scholar = scholarInfo[row];

    if (scholar.status == SCHOLAR_TYPES.UPPER) {
      scholarReq[row][0] = STANDARD_UPPER_CLASSMEN_REQ.frontDesk;
      scholarReq[row][1] = STANDARD_UPPER_CLASSMEN_REQ.studySession;
    } else if (scholar.status == SCHOLAR_TYPES.SOPHOMORE) {
      scholarReq[row][0] = STANDARD_SOPHOMORE_REQ.frontDesk;
      scholarReq[row][1] = STANDARD_SOPHOMORE_REQ.studySession;
    } else if (scholar.status == SCHOLAR_TYPES.LEADERSHIP) {
      scholarReq[row][0] = STANDARD_LEADERSHIP_REQ.frontDesk;
      scholarReq[row][1] = STANDARD_LEADERSHIP_REQ.studySession;
    } else if (scholar.status == SCHOLAR_TYPES.FRESHMAN) {
      scholarReq[row][0] = STANDARD_FRESHMAN_REQ.frontDesk;
      scholarReq[row][1] = STANDARD_FRESHMAN_REQ.studySession;
    }
    //mentee row
    if (scholar.role != "Team Leader")
      scholarReq[row][2] = "-";
  }
  databaseSheet
    .getRange(firstWeekDatabase.row, 8, scholarInfo.length, 3)
    .setValues(scholarReq);
  const roleRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(
      Array.from(
        new Set(
          STANDARD_FRESHMAN_REQ.types.concat(
            STANDARD_LEADERSHIP_REQ.types,
            STANDARD_SOPHOMORE_REQ.types,
            STANDARD_UPPER_CLASSMEN_REQ.types
          )
        )
      )
    )
    .build();

  databaseSheet
    .getRange(firstWeekDatabase.row, 6, scholarReq.length, 1)
    .setDataValidation(roleRule);
}
