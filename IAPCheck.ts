
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

function updateIAPBySlides(): string[][] {
    let statusArr = new Array(scholarInfo.length) as IAP_STATUS[];
    for(let i = 0; i < scholarInfo.length; i++){
        statusArr[i] = scholarInfo[i].iapStatus;
    }

    let res = new Array(scholarInfo.length) as string[][]; 
    let date = new Date();
    let timeOfYear = (date.getMonth() >= 7 && date.getMonth() <= 11 ? TIMEOFYEAR.FALL : TIMEOFYEAR.SPRING);
    var schoolYear = startOfSemester.year;

    for(let year = schoolYear; year > schoolYear-4; year--){
        checkIAPBySlides(year, timeOfYear, statusArr);//updating statusArr
    }

    for(let i = 0; i < scholarInfo.length; i++){
        res[i] = new Array(statusToString(statusArr[i]));
    }
    return res; 
}