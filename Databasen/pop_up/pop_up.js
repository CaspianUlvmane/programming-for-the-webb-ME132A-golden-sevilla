// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

let clearResults = (element) => selectElement(element).innerHTML = "";


function testDontKeep () {
    let programs = DB.PROGRAMMES
    let buttonBox = createElement("div")
    buttonBox.classList.add("buttonBox")
    document.body.append(buttonBox)
   
    programs.forEach(program => {
        let button = createElement("div")
        button.classList.add("buttonProgram")
        button.innerHTML = program.name
        button.addEventListener("click", popUpProgram)
        buttonBox.append(button)
    });

    let programPopUpContainer = createElement("div");
    programPopUpContainer.classList.add("containerPopUp")
    document.body.append(programPopUpContainer)
    
}

testDontKeep()

function popUpProgram (event) {

    let program = event.target
    let programName = event.target.innerHTML
    let programsFound = DB.PROGRAMMES.find(program => program.name == programName)
    
    let programPopUpContainer = selectElement(".containerPopUp");
    programPopUpContainer.classList.add("active")

    clearResults(".containerPopUp")

    document.body.append(programPopUpContainer)
    programPopUpContainer.append(interactWithPop(program))
    programPopUpContainer.append(addInfoProgram(programsFound))

    return programPopUpContainer
}

function interactWithPop (parent) {

    let barContainer = createElement("div")
    barContainer.classList.add("barContainer")

    let crossIconDiv = createElement("div")
    crossIconDiv.classList.add("imgCross") // closeButton
    crossIconDiv.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    crossIconDiv.addEventListener("click", function (){
    })

    let heartIconDiv = createElement("div")
    heartIconDiv.classList.add("imgHearth") 
    heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`
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
        <div class="info"> Medelvärde av Kursen:  </div>
        <div class="info"> Kommentarer från studenter </div>
    </div> 
    `
    infoContainer.append(commentsProgram(program))

    return infoContainer
}


function findUniversity (id) {
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

function findLevel (id) {
    return DB.LEVELS[0]
}


function commentsProgram (id) {
    let commentContainer = createElement("div")
    commentContainer.classList.add("commentContainer")

    let programID = DB.PROGRAMMES.find(program => program.id == id.id)
    console.log(programID)

    let comments = DB.COMMENTS_PROGRAMME.filter(comment => comment.programmeID == programID.id)
    console.log(comments)

    for (let comment of comments) {
        let commentBox = createElement("div")
        commentBox.innerHTML =  ` 
        ${studentRatingProgram(comment)}
        <div class="commentDiv"> ${comment.text} </div>
        <div class="commentName"> ${comment.alias} </div>
         `
         commentContainer.append(commentBox)
    }

    return commentContainer

}


function studentRatingProgram (comments) {
    let sumOfRating = 0
    
    sumOfRating += comments.stars.teachers + comments.stars.students + comments.stars.courses 
        
    return Math.round(sumOfRating/3)
}