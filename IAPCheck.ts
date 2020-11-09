
enum TIMEOFYEAR {
    FALL, 
    SPRING
}

function statusToString(iapStatus: IAP_STATUS): string {
    if (iapStatus == IAP_STATUS.COMPLETE){
        return '✔';
    }
    else if (iapStatus == IAP_STATUS.INCOMPLETE){
        return '✘';
    }
    else {
        return "EX";
    }
}

function updateIAP(): string[][] { // 
    let res = new Array(scholarInfo.length) as string[][]; 
    let date = new Date();
    let toy = (date.getMonth() >= 7 && date.getMonth() <= 11 ? TIMEOFYEAR.FALL : TIMEOFYEAR.SPRING)
    
    for (let i = 0; i < scholarInfo.length; i++) {
        let scholar = scholarInfo[i];
        if(scholar.iapStatus == IAP_STATUS.INCOMPLETE){            
            const newstatus = checkIAP(scholar.cohort, scholar.lastName+" "+scholar.lastName, toy);
            res[i] = new Array(statusToString(newstatus));
        } else {
            res[i] = new Array(statusToString(scholar.iapStatus));
        }
    }

    return res;
    
}

// first go onto google app script and press play to print out the names of those who haven't done it
// 