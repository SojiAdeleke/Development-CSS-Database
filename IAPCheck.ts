
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
    let timeOfYear = (date.getMonth() >= 7 && date.getMonth() <= 11 ? TIMEOFYEAR.FALL : TIMEOFYEAR.SPRING)
    
    for (let i = 0; i < scholarInfo.length; i++) {
        let scholar = scholarInfo[i];
        if(scholar.iapStatus == IAP_STATUS.INCOMPLETE){            
            const newstatus = checkIAP(scholar.cohort, scholar.firstName+" "+scholar.lastName, timeOfYear);
            res[i] = new Array(statusToString(newstatus));
        } else {
            res[i] = new Array(statusToString(scholar.iapStatus));
        }
    }

    return res;
    
}

function updateIAPBySlides(): string[][] {
    let statusArr = new Array(scholarInfo.length) as IAP_STATUS[];
    for(let i = 0; i < scholarInfo.length; i++){
        statusArr[i] = scholarInfo[i].iapStatus;
    }

    let res = new Array(scholarInfo.length) as string[][]; 
    let date = new Date();
    let timeOfYear = (date.getMonth() >= 7 && date.getMonth() <= 11 ? TIMEOFYEAR.FALL : TIMEOFYEAR.SPRING);
    var schoolYear = startOfSemester.year;

    for(let year = schoolYear; year > year-4; year--){
        checkIAPBySlides(year, timeOfYear, statusArr);//updating statusArr
    }

    for(let i = 0; i < scholarInfo.length; i++){//puting each status into res as a string array
        res[i] = new Array(statusToString(statusArr[i]));
    }
    return res; 
}

// first go onto google app script and press play to print out the names of those who haven't done it
// 