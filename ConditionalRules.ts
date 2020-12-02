// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
const blackColor = "#000000";
const negativeColor = { background: "#f4c7c3", font: "#cc0000" };
const positiveColor = { background: "#93C47D", font: "#38761d" };
const neutralColor = { background: "#fce8b2", font: "#b45f06" };
const grayColor = { background: "#cccccc", font: blackColor };
const lateColor = { background: "#fce8b2", font: "#b45f06" };
const excusedColor = { background: "#cfe2f3", font: blackColor };

function applyNotFoundRule(ranges: GoogleAppsScript.Spreadsheet.Range[]): GoogleAppsScript.Spreadsheet.ConditionalFormatRule {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Not found")
    .setBold(true)
    .setFontColor(negativeColor.font)
    .setBackground(negativeColor.background)
    .setRanges(ranges)
    .build();
}

function applyFoundDateRule(ranges: GoogleAppsScript.Spreadsheet.Range[]): GoogleAppsScript.Spreadsheet.ConditionalFormatRule {
  ranges.forEach((range) => range.setNumberFormat("MM/dd/yyyy h:mm"));
  Logger.log(ranges.map((range) => range.getNumberFormat()).join());

  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains(":")
    .setBold(true)
    .setFontColor(positiveColor.font)
    .setBackground(positiveColor.background)
    .setRanges(ranges)
    .build();
}

function applyExcusedRule(ranges: GoogleAppsScript.Spreadsheet.Range[]): GoogleAppsScript.Spreadsheet.ConditionalFormatRule {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("EX")
    .setBold(true)
    .setFontColor(excusedColor.font)
    .setBackground(excusedColor.background)
    .setRanges(ranges)
    .build();
}

function applyNArule(ranges: GoogleAppsScript.Spreadsheet.Range[]): GoogleAppsScript.Spreadsheet.ConditionalFormatRule {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("N/A")
    .setBold(true)
    .setFontColor(grayColor.font)
    .setBackground(grayColor.background)
    .setRanges(ranges)
    .build();
}

function applyXRule(ranges: GoogleAppsScript.Spreadsheet.Range[]): GoogleAppsScript.Spreadsheet.ConditionalFormatRule {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("✘")
    .setBold(true)
    .setFontColor(negativeColor.font)
    .setBackground(negativeColor.background)
    .setRanges(ranges)
    .build();
}

function applyLRule(ranges: GoogleAppsScript.Spreadsheet.Range[]): GoogleAppsScript.Spreadsheet.ConditionalFormatRule {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("L")
    .setBold(true)
    .setFontColor(lateColor.font)
    .setBackground(lateColor.background)
    .setRanges(ranges)
    .build();
}

function applyCheckRule(ranges: GoogleAppsScript.Spreadsheet.Range[]): GoogleAppsScript.Spreadsheet.ConditionalFormatRule {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("✔")
    .setBold(true)
    .setFontColor(positiveColor.font)
    .setBackground(positiveColor.background)
    .setRanges(ranges)
    .build();
}

function applyNumberCheck(
  range: GoogleAppsScript.Spreadsheet.Range,
  type: WEEK_INFO
): void {

  if (type != WEEK_INFO.STUDY_SESSION && type != WEEK_INFO.FRONT_DESK && type != WEEK_INFO.ZOOM && type != WEEK_INFO.MCF) {
    sendError(new Error("Sent in invalid week info"))
    return;
  }

  const FIRST_INDEX = 0;
  const values = range.getValues();
  const colorBackgrounds: string[][] = new Array(scholarInfo.length) as [string[]];
  const colorFonts: string[][] = new Array(scholarInfo.length) as [string[]];

  for (let row = 0; row < scholarInfo.length; row++) {
    colorBackgrounds[row] = [
      ""
    ];
    colorFonts[row] = [
      ""
    ];
    const scholar = scholarInfo[row];
    const MIN_ZOOM_VISITS = 2;
    let scholarReq = null;

    if (type == WEEK_INFO.STUDY_SESSION)
      scholarReq = scholar.studySessionReq;
    else if (type == WEEK_INFO.FRONT_DESK) scholarReq = scholar.frontDeskReq;
    else if (type == WEEK_INFO.ZOOM) scholarReq = MIN_ZOOM_VISITS;
    else scholarReq = scholar.menteeNum;

    if (values[row][FIRST_INDEX] == 0 || values[row][FIRST_INDEX] == "") {
      colorBackgrounds[row][FIRST_INDEX] = negativeColor.background;
      colorFonts[row][FIRST_INDEX] = negativeColor.font;
    } else if (scholarReq <= values[row][FIRST_INDEX]) {
      colorBackgrounds[row][FIRST_INDEX] = positiveColor.background;
      colorFonts[row][FIRST_INDEX] = positiveColor.font;
    } else {
      colorBackgrounds[row][FIRST_INDEX] = neutralColor.background;
      colorFonts[row][FIRST_INDEX] = neutralColor.font;
    }
  }
  range
    .setBackgrounds(colorBackgrounds)
    .setFontColors(colorFonts)
    .setFontWeight("bold");
}

//contains week information from WAHF to WPL
function applyIAPFormatting(iapRange: GoogleAppsScript.Spreadsheet.Range): void {
  const rules = databaseSheet.getConditionalFormatRules();

  rules.push(
    applyCheckRule([
      iapRange
    ]),
    applyExcusedRule([
      iapRange
    ]),
    applyXRule([
      iapRange
    ])
  );
  databaseSheet.setConditionalFormatRules(rules);
}

enum WEEK_INFO {
  WAHF = 0,
  SEMINAR = 1,
  STUDY_SESSION = 2,
  FRONT_DESK = 3,
  ZOOM = 4,
  TL_MEETING = 5,
  GA_MEETING = 6,
  MCF = 7,
  WPL = 8
}

function applyWeekFormatting(weekNum: number): void {
  const wahfRange = getColumn(weekNum, WEEK_INFO.WAHF),
    semRange = getColumn(weekNum, WEEK_INFO.SEMINAR),
    ssRange = getColumn(weekNum, WEEK_INFO.STUDY_SESSION),
    fdRange = getColumn(weekNum, WEEK_INFO.FRONT_DESK),
    zoomRange = getColumn(weekNum, WEEK_INFO.ZOOM),
    tlmRange = getColumn(weekNum, WEEK_INFO.TL_MEETING),
    gamRange = getColumn(weekNum, WEEK_INFO.GA_MEETING),
    mcfRange = getColumn(weekNum, WEEK_INFO.MCF),
    wplRange = getColumn(weekNum, WEEK_INFO.WPL);
  const rules = databaseSheet.getConditionalFormatRules();

  rules.push(
    applyCheckRule([
      semRange,
      tlmRange,
      gamRange
    ]),
    applyExcusedRule([
      wahfRange,
      semRange,
      ssRange,
      fdRange,
      zoomRange,
      tlmRange,
      mcfRange,
      wplRange,
    ]),
    applyFoundDateRule([
      wahfRange,
      wplRange
    ]),
    applyNArule([
      wahfRange,
      semRange,
      ssRange,
      fdRange,
      zoomRange,
      tlmRange,
      gamRange,
      mcfRange,
      wplRange,
    ]),
    applyNotFoundRule([
      wahfRange,
      wplRange
    ]),
    applyXRule([
      semRange,
      tlmRange,
      gamRange
    ]),
    applyLRule([
      semRange
    ])
  );
  databaseSheet.setConditionalFormatRules(rules);

  const gaPickRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "✘",
      "✔",
      "EX",
      "N/A"
    ])
    .build();
  const semPickRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "✘",
      "✔",
      "L",
      "EX",
      "N/A"
    ])
    .build();

  semRange.setDataValidation(semPickRule);
  gamRange.setDataValidation(gaPickRule);

  zoomRange.setNumberFormat("0");
  mcfRange.setNumberFormat("0");
  fdRange.setNumberFormat("0");
  ssRange.setNumberFormat("0");
}
