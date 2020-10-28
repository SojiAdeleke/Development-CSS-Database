
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
const databaseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database") || SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
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
    ).getValues() as string[][];
  const allInfo = new Array(values.length) as [Scholar];

  for (let scholarRow = 0; scholarRow < allInfo.length; scholarRow++)
    allInfo[scholarRow] = getScholarInformation(values[scholarRow]);
  return allInfo;
}

function revertHoldCell(): void {
  holdCell.setValue("");
}
//returns [lastName, firstName]

//sets a call's formula
function setCellFormula(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, column: number, formula: string): void {
  const cell = sheet.getRange(row, column);

  cell.setValue(getFormulaResult(formula));
}

function getFormulaResult(formula: string): string {
  holdCell.setFormula(formula);
  const val = holdCell.getValue() as string;

  revertHoldCell();
  return val;
}

function getCellValue(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, column: number): string {
  return sheet.getRange(row, column).getValue() as string;
}

function keepValues(range: GoogleAppsScript.Spreadsheet.Range): void {
  const values = range.getValues();

  range.setValues(values);
}

function getNameFormula(uid: string): string[] {
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

function getTutorNameFormula(uid: string): string {
  const tutoringDatabase = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("TutoringDatabase");

  if (tutoringDatabase == null) {
    sendError(new Error("Wrong sheet name"))
    return "";
  }
  else
    return (
      "=IFERROR(VLOOKUP(" +
      uid +
      ",TutoringDatabase!$A$2:$C$" +
      tutoringDatabase
        .getLastRow() +
      ',2=,FALSE),"Hours not input")'
    );
}

function getWeekNum(): number { return (databaseSheet.getLastColumn() - 12) / 9 }

function sendError(error: Error): void {
  sendEmail(databaseAdmin.join(), `Database Error: ${error.name}`, error.message)
}

function getColumn(weekNum: number, column: number): GoogleAppsScript.Spreadsheet.Range {
  const single_column = 1;

  return databaseSheet.getRange(
    firstWeekDatabase.row,
    firstWeekDatabase.column + weekTheme.weekLength * (weekNum - 1) + column,
    scholarInfo.length,
    single_column
  );
}
