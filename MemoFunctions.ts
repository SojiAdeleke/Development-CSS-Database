// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
"use strict";
function memo():void {
    const memo = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const memoWahf = memo.getRange("E7").getValue()as string;
    // var memoWPL = memo?.getRange("G8").getValue() as string;
    // var formulas = getFormulaResult(`=COUNT(UNIQUE(Database!${memoWahf}4:${memoWahf}165))-2`);
    // var results = memo?.getRange("G13").setValue(formulas);

    setCellFormula(memo, 13, 7, `=COUNT(UNIQUE(Database!${memoWahf}4:${memoWahf}165))-2`);
    setCellFormula(memo, 13, 8, `=COUNTIF(Database!${memoWahf}4:${memoWahf}165,"Not Found")`);
}
