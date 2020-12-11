/**
  * Creates a Slides API service object and logs the number of slides and
  * elements in a sample presentation:
  * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
  */
 const yearToSlides = new Map([ 
    [2020, "1gJOiAoghK9vZjXUspyzaUPHX1gPJIgLlFT4oXmQhN38"],
    [2019, "1b6O2rtCGCIL-qOMN8nGO_GFY9nsAUJlNnS9n1grPAb0"],
    [2018, "1NoJUD25u2qouG4QRT88gPJLJLRx6DkI5cCm4wL-wB8I"],
    [2017, "1kAO-Sc5gv4rl4fRlEq3JCPCSitdj1zpFCFi37fu4QRU"],
    [2016, "1PQfLl5pHbWSzSnxUhaQEyaOOvQizydEYagXlCiRkl0M"],
    [2015, "1csNUaSdueHI4Q9SHQnUkLza3Q_R0hX5k1x0SugJZVTE"],
  ]);

  const yearToStart = new Map([ 
    [2020, 2],
    [2019, 1],
    [2018, 1],
    [2017, 1],
    [2016, 1],
    [2015, 1],
  ]);

  const fallSpringRegex = new Map([
    [TIMEOFYEAR.FALL, /Fall Semester\s*(N\/A)\s*Winter Term/], 
    [TIMEOFYEAR.SPRING, /Spring Semester\s*(N\/A)\s*Summer Term/]
  ])

  function checkIAPBySlides(cohortYear:number, timeOfYear: TIMEOFYEAR, statusArr :IAP_STATUS[]) : void{
    var schoooYear = startOfSemester.year;// make this var according to whatever school year it is. eg. ig in SY 2020-2021 put 2020
    let presentationId = yearToSlides.get(cohortYear);
    let startIdx = yearToStart.get(cohortYear);
    let presentation = SlidesApp.openById(presentationId);
    let slides = presentation.getSlides();
    Logger.log('The presentation contains %s slides:', slides.length);
    console.log("slides len: " + slides.length);

    for(let i = startIdx; i < slides.length; i++){
      let shapes = slides[i].getShapes();
      let groups = slides[i].getGroups();
      let groupnum = (schoooYear-cohortYear < 3 ? schoooYear-cohortYear : 3);
      let cdrn = groups[groupnum].getChildren();// the four groups are respective to freshman, sophomore, junior, and senior years and hold the classes taken
      let slideName = shapes[3].getText().asString();// the shape at index 3 holds the scholar's name
      
      for(let j = 0; j < scholarInfo.length; j++){//going through each student to find the student that matches the current slide
        if(parseInt(scholarInfo[j].cohort) != cohortYear 
        || !slideName.includes(scholarInfo[j].firstName + " " + scholarInfo[j].lastName) 
        && statusArr[j] != IAP_STATUS.INCOMPLETE){ 
          continue; 
        }
        let re = fallSpringRegex.get(timeOfYear)
        let info = cdrn[1].asShape().getText().asString();
        let match = re.exec(info); 
        if(match== null){//implies that N/A is not between fall and winter / spring and summer, meaning the IAP is completed
          statusArr[j] = IAP_STATUS.COMPLETE;
        } else {
          statusArr[j] = IAP_STATUS.INCOMPLETE;
        }
        break;
      }

    }

  }

  function main(){
    let statusArr = new Array(scholarInfo.length) as IAP_STATUS[];
    for(let i = 0; i < scholarInfo.length; i++){
        statusArr[i] = scholarInfo[i].iapStatus;
    }
    checkIAPBySlides(2020, TIMEOFYEAR.FALL, statusArr);
  }