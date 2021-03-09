function memo(): void{
    const memo = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var memoWahf = memo?.getRange("E7").getValue() as string;

    var formulas = getFormulaResult(`=COUNT(UNIQUE(Database!${memoWahf}4:${memoWahf}165))-2`);
    var results = memo?.getRange("G13").setValue(formulas);

    // setCellFormula(memo, 13, 7, `=COUNT(UNIQUE(Database!${memoWahf}4:${memoWahf}165))-2`);

}