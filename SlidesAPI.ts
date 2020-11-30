/**
  * Creates a Slides API service object and logs the number of slides and
  * elements in a sample presentation:
  * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
  */
 const yearToSlides = new Map([ // use ints as the keys
    [2020, "1gJOiAoghK9vZjXUspyzaUPHX1gPJIgLlFT4oXmQhN38"],
    [2019, "1b6O2rtCGCIL-qOMN8nGO_GFY9nsAUJlNnS9n1grPAb0"],
    [2018, "1NoJUD25u2qouG4QRT88gPJLJLRx6DkI5cCm4wL-wB8I"],
    [2017, "1kAO-Sc5gv4rl4fRlEq3JCPCSitdj1zpFCFi37fu4QRU"],
    [2016, "1PQfLl5pHbWSzSnxUhaQEyaOOvQizydEYagXlCiRkl0M"],
    [2015, "1csNUaSdueHI4Q9SHQnUkLza3Q_R0hX5k1x0SugJZVTE"],
  ]);

  const yearToStart = new Map([ // use ints as the keys
    [2020, 2],
    [2019, 1],
    [2018, 1],
    [2017, 1],
    [2016, 1],
    [2015, 1],
  ]);

  

  const fallSpringRegex = new Map([
    [TIMEOFYEAR.FALL, /Fall Semester\s*([\w]+.*)+\s*Winter Term/], 
    [TIMEOFYEAR.SPRING, /Spring Semester\s*([\w]+.*)+\s*Summer Term/]
  ])
  
 function checkIAP(cohortYear:number, name:string, timeOfYear: TIMEOFYEAR) : IAP_STATUS{
    var schoooYear = startOfSemester.year;// make this var according to whatever school year it is. eg. ig in SY 2020-2021 put 2020

    let presentationId = yearToSlides.get(cohortYear);
    let startIdx = yearToStart.get(cohortYear);
    let presentation = SlidesApp.openById(presentationId);

    let slides = presentation.getSlides();
    Logger.log('The presentation contains %s slides:', slides.length);
    
    console.log("slides len: " + slides.length);

    for(let i = startIdx; i < slides.length; i++){
      let shapes = slides[i].getShapes();// the important shape will hold the name of the scholar
      let groups = slides[i].getGroups();
      let groupnum = (schoooYear-cohortYear < 3 ? schoooYear-cohortYear : 3);
      let cdrn = groups[groupnum].getChildren();// the four groups are respective to freshman, sophomore, junior, and senior years and hold the classes taken
      let slideName = shapes[3].getText().asString();// the shape at index 3 holds the scholar's name

      if(slideName.includes(name)){
        
        let re = fallSpringRegex.get(timeOfYear)//use regex to get text between 'Fall Semester' and 'Winter Term' or to get text between 'Spring Semester' and 'Summer Term'
        let info = cdrn[1].asShape().getText().asString();
        let match = re.exec(info); 
        
        if(match!= null && match[1] != null){
          console.log(match[1]);
          return IAP_STATUS.COMPLETE;//complete because there was text that matched, meaning that the scholar's classes were filled for the fall semester
        }
        console.log("IAP not completed");
        return IAP_STATUS.INCOMPLETE;
      }

    }
    console.log("couldn't find scholar");
    return IAP_STATUS.INCOMPLETE; 
    /* let pes = slides[5].getShapes();//
    // let grs = slides[5].getGroups();// the four groups are respective to freshman, sophomore, junior, and senior years
    // let cdrn = grs[0].getChildren();// choosing freshman year with 0; sophomore 1; junior 2; senior 3
    */
  }

  function checkIAPBySlides(cohortYear:number, timeOfYear: TIMEOFYEAR, statusArr :IAP_STATUS[]){
    var schoooYear = startOfSemester.year;// make this var according to whatever school year it is. eg. ig in SY 2020-2021 put 2020
    let presentationId = yearToSlides.get(cohortYear);
    let startIdx = yearToStart.get(cohortYear);
    let presentation = SlidesApp.openById(presentationId);
    let slides = presentation.getSlides();
    Logger.log('The presentation contains %s slides:', slides.length);
    console.log("slides len: " + slides.length);

    for(let i = 0; i < slides.length; i++){//going through each slide
      let shapes = slides[i].getShapes();// the important shape will hold the name of the scholar
      let groups = slides[i].getGroups();
      let groupnum = (schoooYear-cohortYear < 3 ? schoooYear-cohortYear : 3);
      let cdrn = groups[groupnum].getChildren();// the four groups are respective to freshman, sophomore, junior, and senior years and hold the classes taken
      let slideName = shapes[3].getText().asString();// the shape at index 3 holds the scholar's name
      
      for(let j = 0; j < scholarInfo.length; j++){//going through each student to find the student that matches the current slide
        if(scholarInfo[j].cohort)
      }
    }

  }

  function main(){
    checkIAP(2019, 'Joel Black Jr', TIMEOFYEAR.FALL);
  }