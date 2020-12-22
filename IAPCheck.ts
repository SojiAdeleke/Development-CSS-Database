
enum TIMEOFYEAR {
    FALL, 
    SPRING
}

function updateIAPBySlides(): string[][] {
    let statusArr = new Array(scholarInfo.length) as IAP_STATUS[];
    for(let i = 0; i < scholarInfo.length; i++){
        statusArr[i] = scholarInfo[i].iapStatus;
    }

    let res = new Array(scholarInfo.length) as string[][]; 
    const date = new Date();
    const timeOfYear = (date.getMonth() >= 7  ? TIMEOFYEAR.FALL : TIMEOFYEAR.SPRING);
    const schoolYear = startOfSemester.year;

    for(let year = schoolYear; year > schoolYear-4; year--){
        checkIAPBySlides(year, timeOfYear, statusArr);//updating statusArr
    }

    for(let i = 0; i < scholarInfo.length; i++){
        res[i] = new Array(statusArr[i]);
    }
    return res; 
}

const yearToSlides = new Map([ 
    [2020, "1gJOiAoghK9vZjXUspyzaUPHX1gPJIgLlFT4oXmQhN38"],
    [2019, "1b6O2rtCGCIL-qOMN8nGO_GFY9nsAUJlNnS9n1grPAb0"],
    [2018, "1NoJUD25u2qouG4QRT88gPJLJLRx6DkI5cCm4wL-wB8I"],
    [2017, "1kAO-Sc5gv4rl4fRlEq3JCPCSitdj1zpFCFi37fu4QRU"],
    [2016, "1PQfLl5pHbWSzSnxUhaQEyaOOvQizydEYagXlCiRkl0M"],
    [2015, "1csNUaSdueHI4Q9SHQnUkLza3Q_R0hX5k1x0SugJZVTE"],
  ]);

  const fallSpringRegex = new Map([
    [TIMEOFYEAR.FALL, [/Fall Semester\s*(N\/A)\s*Winter Term/,/Fall Semester\s*Plans for this semester[.]\s*Winter Term/]], 
    [TIMEOFYEAR.SPRING, [/Spring Semester\s*(N\/A)\s*Summer Term/,/Spring Semester\s*Plans for this semester[.]\s*Summer Term/]]
  ])

  function checkIAPBySlides(cohortYear:number, timeOfYear: TIMEOFYEAR, statusArr :IAP_STATUS[]) : void{
    const schoolYear = startOfSemester.year;// make this var according to whatever school year it is. eg. ig in SY 2020-2021 put 2020
    const presentationId = yearToSlides.get(cohortYear);
    const presentation = SlidesApp.openById(presentationId);
    const slides = presentation.getSlides();
    let delLaterCnt = 0; 
    console.log("Cohort Year: " + cohortYear)

    for(let i = 0; i < slides.length; i++){
      const shapes = slides[i].getShapes();
      const groups = slides[i].getGroups();
      if(groups.length == 0){
          //console.log("continuing"); 
        continue;
      }
      const groupnum = (schoolYear-cohortYear < 3 ? schoolYear-cohortYear : 3);
      const children = groups[groupnum].getChildren();// the four groups are respective to freshman, sophomore, junior, and senior years and hold the classes taken
      const slideName = shapes[3].getText().asString();// the shape at index 3 holds the scholar's name
      
      let delLater = 0;
      for(let j = 0; j < scholarInfo.length; j++){//going through each student to find the student that matches the current slide
        if(parseInt(scholarInfo[j].cohort) != cohortYear 
        || !slideName.toLowerCase().includes(removeParens(scholarInfo[j].firstName).toLowerCase())
        || !slideName.toLowerCase().includes(removeParens(scholarInfo[j].lastName).toLowerCase())
        || statusArr[j] != IAP_STATUS.INCOMPLETE){ 
            if(slideName.includes(scholarInfo[j].firstName.trim()) 
                  && slideName.includes(scholarInfo[j].lastName.trim())
                  && statusArr[j] != IAP_STATUS.INCOMPLETE){
                    delLater = 1;
                    console.log("good good food food food")
                  }
          continue; 
        }
        delLaterCnt++; 
        const re = fallSpringRegex.get(timeOfYear)
        const info = children[1].asShape().getText().asString();
        const match1 = re[0].exec(info); 
        const match2 = re[1].exec(info);
        if(match1 == null && match2 == null){//implies that "N/A" or "Plans for this semester[.]" is not between fall and winter / spring and summer, meaning the IAP is completed
          statusArr[j] = IAP_STATUS.COMPLETE;
        } else {
          statusArr[j] = IAP_STATUS.INCOMPLETE;
        }
        if(slideName.includes("Isaiah Duncan")){
            console.log("Isaiah Status: " + statusArr[j])
        }
        if(slideName.includes("Zion Olibris")){
            console.log("Zion Olibris - J: " + j + "\nStatus: " + statusArr[j]);
        }
        delLater = 1;
        break;
      }
      if(delLater == 0){
          console.log("Scholar Not Found: " + slideName + "\nCohort Year: ");
      }

    }
    console.log("cnt: " + delLaterCnt);
  }

  function removeParens(str: String){
    let lpi, rpi; 
    if((lpi = str.indexOf("(")) >= 0 && (rpi = str.indexOf(")")) > lpi ){
        let substring = str.substring(lpi, rpi+1);
        str = str.replace(substring, "");
        return str.trim();
    } else {
        return str.trim();
    }
    }

  function main(){
    console.log("Scholar Info len: " + scholarInfo.length);
    let statusArr = new Array(scholarInfo.length) as IAP_STATUS[];
    for(let i = 0; i < scholarInfo.length; i++){
        statusArr[i] = scholarInfo[i].iapStatus;
    }
    checkIAPBySlides(2020, TIMEOFYEAR.FALL, statusArr);
  }