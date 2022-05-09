// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

let clearResults = (element) => selectElement(element).innerHTML = "";

// Try function creatting buttons some parts to keep 
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

    /// keep  creating the popUp div container 
    let programPopUpContainer = createElement("div");
    programPopUpContainer.classList.add("containerPopUp")
    document.body.append(programPopUpContainer)

    // keep if we want an overlay bg 
    let overLayDiv = createElement("div")
    overLayDiv.classList.add("overLay")
    document.body.append(overLayDiv)
}

buttons()

// function called when pressing button to get more info 
function popUpProgram (event) {
    // get the innerHTML of the target clicked
    let programName = event.target.innerHTML
    // find program from DB that matches the target Clicked
    let programsFound = DB.PROGRAMMES.find(program => program.name == programName)
    
    let programPopUpContainer = selectElement(".containerPopUp");
    programPopUpContainer.classList.add("active")
    selectElement(".overLay").classList.add("active")
    clearResults(".containerPopUp")

    document.body.append(programPopUpContainer)
    programPopUpContainer.append(interactWithPop())
    programPopUpContainer.append(addInfoProgram(programsFound))

    return programPopUpContainer
}

// Function to create the close and heart bar of the popUp
function interactWithPop () {
    let barContainer = createElement("div")
    barContainer.classList.add("barContainer")

    // creating closeIcon For popUp with listner to close 
    let crossIconDiv = createElement("div")
    crossIconDiv.classList.add("imgCross") // closeButton
    crossIconDiv.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    crossIconDiv.addEventListener("click", function (){
        selectElement(".overLay").classList.remove("active")
        selectElement(".containerPopUp").classList.remove("active")
    })

    // creating hearthIcon to fill and unfil hearth in popUp
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

// function to add inforomation about the program that is clicked 
function addInfoProgram (program) {
    // creating the informationDivBox for the information of the program that is clicked
    let infoContainer = createElement("div")
    infoContainer.classList.add("infoContainer")
    infoContainer.innerHTML = `
    <h3 class="infoBoxHeader">${program.name}</h3>
    <div class="programInfoBox">
        <div class="info"> Land: ${getCountry(program)} </div>
        <div class="info"> Stad: ${getCity(program)} </div>
        <div class="info university"> Universitet: ${getUniversity(program)} </div>
        <div class="info"> Ämne: ${getFiled(program)} </div>
        <div class="info"> Nivå: ${getLevel(program)} </div>
        <div class="info"> Språk: ${findLangauge(program)} </div>
        <div class="info average"> Medelvärde av Kursen: ${getAllAverage(program)} </div>
        <div class="info"> Teacher rating: ${getAverageTeachers(program)} </div>
        <div class="info"> Students rating: ${getAverageStudents(program)} </div>
        <div class="info"> Courses rating: ${getAverageCourses(program)} </div>
        <div class="info commentsOfstudents"> Kommentarer från studenter </div>
    </div> `

    infoContainer.append(commentsProgram(program))
    return infoContainer
}

// function to get comments about the program that is clicked
function commentsProgram (id) {
    let commentContainer = createElement("div")
    commentContainer.classList.add("commentContainer")

    // find the id off the program id thats is match with id when called 
    let programID = DB.PROGRAMMES.find(program => program.id == id.id)
    // filter the programs after comments id that is matched with the programId 
    let comments = DB.COMMENTS_PROGRAMME.filter(comment => comment.programmeID == programID.id)

    // looping fro the comments and creating the information for eatch comment that is found 
    for (let comment of comments) {
        let commentBox = createElement("div")
        commentBox.innerHTML =  ` 
        ${studentRatingProgram(comment)}
        <div class="commentText"> ${comment.text} </div>
        <div class="commentName"> ${comment.alias} </div> `
        commentContainer.append(commentBox)
    }
    return commentContainer
}

////// Function under to find information about program 
// find the country iD that is equal to the citys.country id
function findCountry (id) {
    return DB.COUNTRIES.find((country) => country.id == findCity(id).countryID)
}
// get the name out of the country 
function getCountry (id) {
    return findCountry(id).name
}

// find the city iD that is equal to the findUniversity.city id
function findCity (id) {
    return DB.CITIES.find((city) => city.id == findUniversity(id).cityID)
}   
// get the name out of the city 
function getCity (id) {
    return findCity(id).name
}

// find the universitie iD that is equal to the program.university id
function findUniversity (id) {
    return DB.UNIVERSITIES.find((universitie) => universitie.id == id.universityID)
}   
// get the name out of the university
function getUniversity (id) {
    return findUniversity(id).name
}

// find the filed that is equal to the program.subject id 
function findFiled (id) {
    return DB.FIELDS.find((filed) => filed.id == id.subjectID)
}
// get the name of the filed 
function getFiled (id) {
return findFiled(id).name
}

/// !!! Working how to write in cleaner way ??? 
function getLevel (id) {
    console.log(id)
    if (id.level == 0) {
        return DB.LEVELS.find((level) => level == "Bachelor")
    } else if (id.level == 1) {
        return DB.LEVELS.find((level) => level == "Master")
    } else {
        return DB.LEVELS.find((level) => level == "Doctorate")
    }
}

// find the langauge that is equal to the program language
function findLangauge (id) {
    return DB.LANGUAGES.find((language) => language.id == id.language).name
}

// function to make new filter of the rating of the program 
function getAverage (id) {
   return DB.COMMENTS_PROGRAMME.filter(program => program.programmeID == id.id).map(rating => rating.stars)
}

// function to get the average scoure of the teacher 
function getAverageTeachers (id) {
    let sumOfAverage = 0
    let ratingStudents = getAverage(id)

    ratingStudents.forEach(rating => {
        sumOfAverage += rating.teachers
    });

    return Math.round(sumOfAverage / ratingStudents.length)
}

// function to get the average scoure of the students students
function getAverageStudents(id) {
    let sumOfAverage = 0
    let ratingStudents = getAverage(id)

    ratingStudents.forEach(rating => {
        sumOfAverage += rating.students
    });

    return Math.round(sumOfAverage / ratingStudents.length)

}

// function to get the average scoure of the students courses
function getAverageCourses (id) {
    let sumOfAverage = 0
    let ratingStudents = getAverage(id)

    ratingStudents.forEach(rating => {
        sumOfAverage += rating.courses
    });

    return Math.round(sumOfAverage / ratingStudents.length)
}

// functoion to get the average in total of the program 
function getAllAverage (id) {
    let sum = Math.round(getAverageTeachers(id) + getAverageStudents(id) + getAverageCourses(id) )
    return Math.round(sum / 3)
}

// function to get the average scoure given from the student
function studentRatingProgram (comments) {
    let sumOfRating = 0
    sumOfRating += comments.stars.teachers + comments.stars.students + comments.stars.courses    
    return Math.round(sumOfRating/3)
}

