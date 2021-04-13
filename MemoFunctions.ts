// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
"use strict";
function memo():void {
    const memo = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const memoWahf = memo.getRange("E7").getValue()as string;
    const memoWPL = memo.getRange("G8").getValue()as string;

    setCellFormula(memo, 13, 7, `=COUNT(UNIQUE(Database!${memoWahf}4:${memoWahf}165))-2`);
    setCellFormula(memo, 13, 8, `=COUNTIF(Database!${memoWahf}4:${memoWahf}165,"Not Found")`);

    setCellFormula(memo, 24, 5, `=COUNT(UNIQUE(Database!${memoWPL}4:${memoWPL}165))`);
    setCellFormula(memo, 24, 6, `=COUNTIF(Database!$F$4:$F165,"<>Scholar")-$E$24`);
}
