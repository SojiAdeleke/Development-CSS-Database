/**
  * Creates a Slides API service object and logs the number of slides and
  * elements in a sample presentation:
  * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
  */
 const yearToSlides = new Map([
    ["2020", "1gJOiAoghK9vZjXUspyzaUPHX1gPJIgLlFT4oXmQhN38"],
    ["2019", "1b6O2rtCGCIL-qOMN8nGO_GFY9nsAUJlNnS9n1grPAb0"],
    ["2018", "1NoJUD25u2qouG4QRT88gPJLJLRx6DkI5cCm4wL-wB8I"],
    ["2017", "1kAO-Sc5gv4rl4fRlEq3JCPCSitdj1zpFCFi37fu4QRU"],
    ["2016", "1PQfLl5pHbWSzSnxUhaQEyaOOvQizydEYagXlCiRkl0M"],
    ["2015", "1csNUaSdueHI4Q9SHQnUkLza3Q_R0hX5k1x0SugJZVTE"],
  ]);

  const yearToStart = new Map([
    ["2020", 2],
    ["2019", 1],
    ["2018", 1],
    ["2017", 1],
    ["2016", 1],
    ["2015", 1],
  ]);

 function checkIAP(cohortYear:string, name:string) {
    var schoooYear = 2020;// make this var according to whatever school year it is. eg. ig in SY 2020-2021 put 2020
    //var semester = 'Fall Semester\n';
    let cohortYearInt = parseInt(cohortYear);
    let presentationId = yearToSlides.get(cohortYear);
    let startIdx = yearToStart.get(cohortYear);
    let presentation = SlidesApp.openById(presentationId);

    //console.log(presentation.getName()); not needed
    let slides = presentation.getSlides();
    Logger.log('The presentation contains %s slides:', slides.length);
    
    console.log("slides len: " + slides.length);

    for(let i = startIdx; i < slides.length; i++){
      let shapes = slides[i].getShapes();// the important shape will hold the name of the scholar
      let groups = slides[i].getGroups();
      let groupnum = (schoooYear-cohortYearInt < 3 ? schoooYear-cohortYearInt : 3);
      let cdrn = groups[groupnum].getChildren();// the four groups are respective to freshman, sophomore, junior, and senior years and hold the classes taken

      let slideName = shapes[3].getText().asString();// the shape at index 3 holds the scholar's name
      if(slideName.includes(name)){
        //use regex to get text between 'Fall Semester' and 'Winter Term' or to get text after 'Spring Semester'
        //regex for Fall Semester: /Fall Semester\s*([\w]+.*)+\s*Winter Term/
        //regex for Spring Semester: 
        let re = /Fall Semester\s*([\w]+.*)+\s*Winter Term/
        let info = cdrn[1].asShape().getText().asString();
        let match = re.exec(info); 
        
        if(match[1] != null){
          console.log(match[1]);
          return true;//true because there was text that matched, meaning that the scholar's classes were filled for the fall semester
        }
        console.log("IAP not completed")
        return false;
      }

    }
    console.log("couldn't find scholar");
    return false; 
    // let pes = slides[5].getShapes();//
    // let grs = slides[5].getGroups();// the four groups are respective to freshman, sophomore, junior, and senior years
    // let cdrn = grs[0].getChildren();// choosing freshman year with 0; sophomore 1; junior 2; senior 3
    // console.log("pes len: " + pes.length + " groups len: " + grs.length);
    // console.log("Name: " + pes[3].getText().asString());
    // console.log("Group \n" + cdrn[0].asShape().getText().asString() + "\n" + cdrn[1].asShape().getText().asString() );//

  }

  function main(){
    checkIAP('2019', 'Joel Black Jr')
  }