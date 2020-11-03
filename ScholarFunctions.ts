/* eslint-disable no-var */

const SCHOLAR_TYPES = {
    LEADERSHIP: 1,
    UPPER: 2,
    SOPHOMORE: 3,
    FRESHMAN: 4
};
const STANDARD_LEADERSHIP_REQ = {
    types: [
        "President",
        "Vice President",
        "E-Board Chair",
        "Program Coordinator",
        "Team Leader",
    ],
    studySession: 0,
    frontDesk: 180
};
const STANDARD_UPPER_CLASSMEN_REQ = {
    types: [
        "Scholar"
    ],
    studySession: "-",
    frontDesk: "-"
};
const STANDARD_SOPHOMORE_REQ = {
    types: [
        "Scholar"
    ],
    studySession: 180,
    frontDesk: 0
};
const STANDARD_FRESHMAN_REQ = {
    types: [
        "Scholar"
    ],
    studySession: 300,
    frontDesk: 0
};

enum IAP_STATUS {
    complete, 
    incomplete,
    exempt
}
interface Scholar {
    uid: string;
    lastName: string;
    firstName: string;
    teamLeader: string;
    gradAssistant: string;
    role: string;
    hotListStatus: string;
    frontDeskReq: string;
    studySessionReq: string;
    menteeNum: string;
    cohort: string;
    status: number;
    iapStatus: IAP_STATUS;
}

function getScholarInformation(scholar: string[]): Scholar {
    return {
        uid: scholar[0],
        lastName: scholar[1],
        firstName: scholar[2],
        teamLeader: scholar[3],
        gradAssistant: scholar[4],
        role: scholar[5],
        hotListStatus: scholar[6],
        frontDeskReq: scholar[7],
        studySessionReq: scholar[8],
        menteeNum: scholar[9],
        cohort: scholar[10],
        status: getStatus(scholar[10], scholar[5]),
        iapStatus: getIAPStatus(scholar[11])
    };
}

function getIAPStatus(iapStatus: string): IAP_STATUS{

    return IAP_STATUS.complete
}

function getStatus(cohort: string, role: string): number {
    if (startOfSemester.year - parseInt(cohort) >= 2 && role == "Scholar") {
        return SCHOLAR_TYPES.UPPER;
    }
    else if (startOfSemester.year - parseInt(cohort) == 1 && role == "Scholar") {
        return SCHOLAR_TYPES.SOPHOMORE;
    }
    else if (STANDARD_LEADERSHIP_REQ.types.includes(role)) {
        return SCHOLAR_TYPES.LEADERSHIP;
    }
    else {
        return SCHOLAR_TYPES.FRESHMAN;
    }
}
