/* eslint-disable @typescript-eslint/no-unused-vars */
// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)

function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  const sheetName = e.source.getActiveSheet().getName();

  Logger.log(sheetName);
  if (sheetName == "Weekly Memo") editMemo(e);
  else if (sheetName == "Database") editDatabase(e);
  else if (sheetName == "L1. WAHF") editWAHF(e);
  else if (sheetName == "L2. MCF") editMCF(e);
  else if (sheetName == "L3. WPL") editWPL(e);
  else if (sheetName == "L4. Traffic") editTraffic(e);
  else if (sheetName == "L5. RRF") editRRF(e);
  else if (sheetName == "L6. Tutor Report Log") editTutor(e);
}

function editMemo(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}

function editDatabase(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}

function editWAHF(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}

function editMCF(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}

function editWPL(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}

function editTraffic(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}

function editRRF(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}

function editTutor(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  Logger.log(e.source.getActiveSheet().getName());
}
