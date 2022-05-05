// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

function testDontKeep () {
    let programs = DB.PROGRAMMES
    programs.forEach(program => {
        let button = createElement("button")
        button.innerHTML = program.name
        button.addEventListener("click", popUpProgram)
        document.body.append(button)
    });
}

testDontKeep()

function popUpProgram (event) {
    let programName = event.target.innerHTML
    let programsFound = DB.PROGRAMMES.find(program => program.name == programName)
    
    console.log(programsFound)

    if (programName == programsFound.name) {
        let programPopUpContainer = createElement("div");
        programPopUpContainer.classList.add("container")
        document.body.append(programPopUpContainer)
        programPopUpContainer.append(interactWithPop())
        programPopUpContainer.append(addInfoProgram(programsFound))
        // programPopUpContainer.append(commentsProgram(programsFound))
    } 
}

function interactWithPop () {
    let barContainer = createElement("div")
    barContainer.classList.add("barContainer")

    let crossIconDiv = createElement("div")
    crossIconDiv.classList.add("imgCross")
    crossIconDiv.innerHTML = "Cross"
    crossIconDiv.addEventListener("click", function (){})

    let heartIconDiv = createElement("div")
    heartIconDiv.classList.add("imgHearth")
    heartIconDiv.innerHTML = "Hearth"
    heartIconDiv.addEventListener("click", function (){})

    barContainer.append(crossIconDiv, heartIconDiv)

    return barContainer
}


function addInfoProgram (program) {
    let infoContainer = createElement("div")
    infoContainer.classList.add("infoContainer")
    infoContainer.innerHTML = `
        <h4 class="infoBoxHeader">${program.name}</h4>
    <div class="programInfoBox">
        <div class="info"> Land: ${getCountry(program)} <span> Stad: ${getCity(program)} </span> </div>
        <div class="info"> Universitet: ${getUniversity(program)}</div>
        <div class="info"> Ämne: ${getFiled(program)}<span> Nivå: </span> Språk: ${findLangauge(program)} </div>
        <div class="info"> Medelvärde av Kursen </div>
        <div class="info"> Kommentarer från studenter </div>
    </div> 
    `
    return infoContainer
}


function findUniversity (id) {
    // console.log(DB.UNIVERSITIES.filter((universitie) => universitie.id == id.universityID)[0])
    return DB.UNIVERSITIES.find((universitie) => universitie.id == id.universityID)
}   

function getUniversity (id) {
    return findUniversity(id).name
}

function findCity (id) {
    return DB.CITIES.find((city) => city.id == findUniversity(id).cityID)
}   

function getCity (id) {
    return findCity(id).name
}

function findCountry (id) {
    return DB.COUNTRIES.find((country) => country.id == findCity(id).countryID)
}

function getCountry (id) {
    return findCountry(id).name
}

function findFiled (id) {
    return DB.FIELDS.find((filed) => filed.id == id.subjectID)
}

function getFiled (id) {
    return findFiled(id).name
}

function findLangauge (id) {
    return DB.LANGUAGES.find((language) => language.id == id.language).name
}


function commentsProgram (program) {
    let commentContainer = createElement("div")
    let programID = DB.COMMENTS_PROGRAMME.filter(program => COMMENTS_PROGRAMME.id == program)
    console.log(programID)

    return commentContainer

}


