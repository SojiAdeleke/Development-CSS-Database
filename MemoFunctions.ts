// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
"use strict";
function memo():void {
    const memo = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const memoWahf = memo.getRange("E7").getValue();
    const memoWPL = memo.getRange("G8").getValue();
    const wahfOnTime = getFormulaResult(`=COUNT(UNIQUE(Database!${memoWahf}4:${memoWahf}165))-2`);
    const missingWahf = getFormulaResult(`=COUNTIF(Database!${memoWahf}4:${memoWahf}165,"Not Found")`);
    const wplOnTime = getFormulaResult(`=COUNT(UNIQUE(Database!${memoWPL}4:${memoWPL}165))`);
    const totalWPL = getFormulaResult(`=COUNTIF(Database!$F$4:$F165,"<>Scholar")`);
    const missingWPL = (parseInt(totalWPL)-parseInt(wplOnTime));

    setCellFormula(memo, 24, 3, wahfOnTime);
    setCellFormula(memo, 24, 4,missingWahf );
    setCellFormula(memo, 24, 5, wplOnTime);
    setCellFormula(memo, 24, 6,""+missingWPL);
}
