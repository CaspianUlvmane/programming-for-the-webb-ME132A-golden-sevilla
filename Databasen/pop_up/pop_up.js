// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

let clearResults = (element) => selectElement(element).innerHTML = "";

function buttons () {
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

    let overLayDiv = createElement("div")
    overLayDiv.classList.add("overLay")
    document.body.append(overLayDiv)

}

buttons()

function popUpProgram (event) {

    let programName = event.target.innerHTML
    let programsFound = DB.PROGRAMMES.find(program => program.name == programName)
    console.log(programsFound)
    let programPopUpContainer = selectElement(".containerPopUp");
    programPopUpContainer.classList.add("active")
    selectElement(".overLay").classList.add("active")
    clearResults(".containerPopUp")

    document.body.append(programPopUpContainer)
    programPopUpContainer.append(interactWithPop())
    programPopUpContainer.append(addInfoProgram(programsFound))

    return programPopUpContainer
}

function interactWithPop () {

    let barContainer = createElement("div")
    barContainer.classList.add("barContainer")

    let crossIconDiv = createElement("div")
    crossIconDiv.classList.add("imgCross") // closeButton
    crossIconDiv.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    crossIconDiv.addEventListener("click", function (){
        selectElement(".overLay").classList.remove("active")
        selectElement(".containerPopUp").classList.remove("active")
    })

    let heartIconDiv = createElement("div")
    heartIconDiv.classList.add("imgHearth") 
    heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`
    heartIconDiv.addEventListener("click", function (){
        if (heartIconDiv.classList.contains("active")) {
            heartIconDiv.classList.remove("active")
            heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`
        } else {
            heartIconDiv.classList.add("active")
            heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
        }
    })

    barContainer.append(crossIconDiv, heartIconDiv)

    return barContainer
}


function addInfoProgram (program) {
    let infoContainer = createElement("div")
    infoContainer.classList.add("infoContainer")
    infoContainer.innerHTML = `
    <h3 class="infoBoxHeader">${program.name}</h3>
    <div class="programInfoBox">
        <div class="info"> Land: ${getCountry(program)} <span> Stad: ${getCity(program)} </span> </div>
        <div class="info"> Universitet: ${getUniversity(program)}</div>
        <div class="info"> Ämne: ${getFiled(program)}<span> Nivå: ${getLevel(program)}</span> Språk: ${findLangauge(program)} </div>
        <div class="info"> Medelvärde av Kursen: ${getAllAverage(program)} </div>
        <div class="info average"> Teachers: ${getAverageTeachers(program)} <span> Students: ${getAverageStudents(program)} </span> Courses: ${getAverageCourses(program)} </div>
        <div class="info"> Kommentarer från studenter </div>
    </div> `

    infoContainer.append(commentsProgram(program))

    return infoContainer
}


function commentsProgram (id) {
    let commentContainer = createElement("div")
    commentContainer.classList.add("commentContainer")

    let programID = DB.PROGRAMMES.find(program => program.id == id.id)
    let comments = DB.COMMENTS_PROGRAMME.filter(comment => comment.programmeID == programID.id)

    for (let comment of comments) {
        let commentBox = createElement("div")
        commentBox.innerHTML =  ` 
        ${studentRatingProgram(comment)}
        <div class="commentDiv"> ${comment.text} </div>
        <div class="commentName"> ${comment.alias} </div> `
        commentContainer.append(commentBox)
    }

    return commentContainer

}

////// Function under to find information about program 

function findCountry (id) {
    return DB.COUNTRIES.find((country) => country.id == findCity(id).countryID)
}

function getCountry (id) {
    return findCountry(id).name
}

function findCity (id) {
    return DB.CITIES.find((city) => city.id == findUniversity(id).cityID)
}   

function getCity (id) {
    return findCity(id).name
}

function findUniversity (id) {
    return DB.UNIVERSITIES.find((universitie) => universitie.id == id.universityID)
}   

function getUniversity (id) {
    return findUniversity(id).name
}

function findFiled (id) {
    return DB.FIELDS.find((filed) => filed.id == id.subjectID)
}

function getFiled (id) {
    return findFiled(id).name
}

function getLevel (id) {
    i = 0
}

function findLangauge (id) {
    return DB.LANGUAGES.find((language) => language.id == id.language).name
}

function getAverage (id) {
   return DB.COMMENTS_PROGRAMME.filter(program => program.programmeID == id.id).map(rating => rating.stars)
}

function getAverageTeachers (id) {
    let sumOfAverage = 0
    let ratingStudents = getAverage(id)

    ratingStudents.forEach(rating => {
        sumOfAverage += rating.teachers
    });

    return Math.round(sumOfAverage / ratingStudents.length)
}

function getAverageStudents(id) {
    let sumOfAverage = 0
    let ratingStudents = getAverage(id)

    ratingStudents.forEach(rating => {
        sumOfAverage += rating.students
    });

    return Math.round(sumOfAverage / ratingStudents.length)

}

function getAverageCourses (id) {
    let sumOfAverage = 0
    let ratingStudents = getAverage(id)

    ratingStudents.forEach(rating => {
        sumOfAverage += rating.courses
    });

    return Math.round(sumOfAverage / ratingStudents.length)
}

function getAllAverage (id) {
    let sum = Math.round(getAverageTeachers(id) + getAverageStudents(id) + getAverageCourses(id) )
    return Math.round(sum / 3)
}

function studentRatingProgram (comments) {
    let sumOfRating = 0
    sumOfRating += comments.stars.teachers + comments.stars.students + comments.stars.courses    
    return Math.round(sumOfRating/3)
}

