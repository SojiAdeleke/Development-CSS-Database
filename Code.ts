// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
const fillers = {
  seminar: {
    tls: [
      {
        name: "Jeremiah",
        email: "jcsamuel@umd.edu",
      },
    ],
    responsibilityName: "Seminar",
  },
  frontDesk: {
    tls: [
      {
        name: "Revelin",
        email: "rthomps8@umd.edu",
      },
    ],
    responsibilityName: "Front Desk",
  },
  studySession: {
    tls: [
      {
        name: "Aaron",
        email: "awrigh13@terpmail.umd.edu",
      },
      {
        name: "Andrew",
        email: "ayerom21@terpmail.umd.edu",
      },
      {
        name: "Jairo",
        email: "jhuaylin@terpmail.umd.edu",
      },
      {
        name: "Nene",
        email: "nnarhmen@terpmail.umd.edu",
      },
    ],
    responsibilityName: "Study Session",
  },
};
const presidentInfo = {
  name: "Matteo Patzy",
  email: "mpatzy@terpmail.umd.edu",
};
const vicePresidentInfo = {
  name: "Revelin Thompson",
  email: "rthomps8@umd.edu",
};
const gaInfo = ["mlong128@umd.edu", "marcm97@umd.edu"];
const databaseAdmin = ["aolarinde@gmail.com", "iduncan@terpmail.umd.edu", "mtshumba@terpmail.umd.edu"]

function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
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
function onFormSubmit(e: GoogleAppsScript.Events.SheetsOnFormSubmit) {
  const sheetName = e.range.getSheet().getName();

  Logger.log(sheetName);
  if (sheetName == "L1. WAHF") submitWAHF(e);
  else if (sheetName == "L2. MCF") submitMCF(e);
  else if (sheetName == "L3. WPL") submitWPL(e);
  else if (sheetName == "L4. Traffic") submitTraffic(e);
  else if (sheetName == "L6. Tutor Report Log") submitTutor(e);
  else if (sheetName == "Zoom Room Sign-In") submitZoom(e);
}