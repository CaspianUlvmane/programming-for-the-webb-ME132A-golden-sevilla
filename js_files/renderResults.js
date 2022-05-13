// let createElement = (element) => document.createElement(element);
// buildTopMenu ()
function renderPrograms (){
    let resultDiv = document.getElementById("results")
    resultDiv.innerHTML = ""
    let programmes = findProgrammes()
    for (let program of programmes){
        let programDiv = renderProgram(program)
        programDiv.id = program.name 
        resultDiv.appendChild(programDiv)
    }
}

function renderProgram (program){
    let div = document.createElement("div")
    div.classList.add("container")
    let programInfo = document.createElement("div")
    programInfo.classList.add("programInfoContainer")
    programInfo.innerHTML=`<h3>${program.name}</h3>
    <p>${programShortInfo(program)}</p>`
    div.appendChild(programInfo)
    div.appendChild(heartIcon())

    programInfo.addEventListener("click", function () {
        popUpProgram(program)
    })
    return div
}


function heartIcon (){
    let heartIconDiv = createElement("div")
    heartIconDiv.classList.add("imgHearth") 
    heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`
    heartIconDiv.addEventListener("click", function (){
        if (heartIconDiv.classList.contains("activeLike")) {
            console.log(this.parentElement)
            heartIconDiv.classList.remove("activeLike")
            let programId = DB.PROGRAMMES.find(program => program.name == this.parentElement.id).id
            let indexOfProgram = array.findIndex(id => id == programId)
            array.splice(indexOfProgram, 1)
            heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`
            console.log(likedPrograms())
            buildTopMenu()
            likedPrograms()
        } else {
            console.log(this.parentElement)
            heartIconDiv.classList.add("activeLike")
            array.push(DB.PROGRAMMES.find(program => program.name == this.parentElement.id).id)
            heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
            buildTopMenu()
            likedPrograms()
        }
    })
    return heartIconDiv
}


function programShortInfo(program){
    return (`${getSubject(program)}, ${getCountry(program)}, ${getLevel(program)}`)
}

function getSubject (program){
    for (let field of DB.FIELDS)
    if (field.id == program.subjectID)
    return field.name
}

function getCountry (program){
    for (let country of DB.COUNTRIES)
    if (country.id == program.country)
    return country.name
}

function getLevel (program){
    for (let i = 0; i < DB.LEVELS.length; i++){
    if (program.level == i){
    return DB.LEVELS[i]}}
}

//// Render AcctiveFilters result 
function activeFilters () {
    let activeArray = document.querySelectorAll(".active")
    let activeFilter = document.getElementById("activeFilter")

    activeFilter.innerHTML = "" 
    for (let active of activeArray) {
        let activeButton = document.createElement("button")
        activeButton.classList.add("activeButton")
        activeButton.innerHTML = `X ${active.innerHTML}`
        // X här ska vara en div med icon sen, även addera eventListner till det krysset
        activeFilter.append(activeButton)
    }  
}

window.addEventListener("load",activeFilters)