// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
const fillers = {
  seminar: {
    tls: [
      {
        name: "SEMTL1",
        email: "semtl1@umd.edu",
      },
      {
        name: "SEMTL2",
        email: "semtl2@umd.edu",
      },
    ],
    responsibilityName: "Seminar",
  },
  frontDesk: {
    tls: [
      {
        name: "FDTL1",
        email: "fdtl1@umd.edu",
      },
      {
        name: "FDTL2",
        email: "fdtl2@umd.edu",
      },
    ],
    responsibilityName: "Front Desk",
  },
  studySession: {
    tls: [
      {
        name: "SSTL1",
        email: "sstl1@umd.edu",
      },
      {
        name: "SSTL2",
        email: "sstl2@umd.edu",
      },
    ],
    responsibilityName: "Study Session",
  },
};
const presidentInfo = {
  name: "President",
  email: "pres@umd.edu",
};
const vicePresidentInfo = {
  name: "Vice President",
  email: "vp@umd.edu",
};
const gaInfo = ["ga1@umd.edu", "ga2@umd.edu"];
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