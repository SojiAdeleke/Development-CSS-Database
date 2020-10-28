//first need to look at google slides doc corresponding to scholar cohort year and go to slide corresponding to scholar name
//then need to go to column corresponding to scholar's class standing
    //if the text after "\{currentSemester} Semester:\n" isn't "N/A" or "n/a", then we know they have done their IAP

enum DBCol {// might not need this 
    // eslint-disable-next-line no-magic-numbers
    iapcolnum = 11,
    // eslint-disable-next-line no-magic-numbers
    iapcollen = 1
}

function updateIAP(){

    const iaprow = databaseSheet.getColumnGroup(DBCol.iapcolnum, DBCol.iapcollen);// might not need this
    let scholar
    
    for (scholar of scholarInfo) {// accessing all scholars for first name and last name
    //if(scholar.iap == "x")//scholar.iap not done
        const newstatus = checkIAPSheets(scholar.lastName+" "+scholar.lastName);
        //scholar.iap = newstatus

    }
    /*
    for (firstname,lastname) of (firstnames, lastnames) {
        checkIAPSheets(firstname+" "+lastname)
    }
    */
    
}

function checkIAPSheets(scholarName: string){
    console.log("CSS is the best")
}

