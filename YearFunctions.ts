function initScholarsReq(): void {
    const scholarReq = new Array(scholarInfo.length) as [(number | string)[]];

    for (let row = 0; row < scholarReq.length; row++) {
        scholarReq[row] = new Array(3) as string[];
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