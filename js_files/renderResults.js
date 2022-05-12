// let createElement = (element) => document.createElement(element);

function renderPrograms (){
    let resultDiv = document.getElementById("results")
    resultDiv.innerHTML = ""
    let programmes = findProgrammes()
    for (let program of programmes){
        let programDiv = renderProgram(program)
        programDiv.id = program.name 
        programDiv.addEventListener("click", function () {
            popUpProgram(program)
        })
        resultDiv.appendChild(programDiv)
    }
}

function renderProgram (program){
    let div = document.createElement("div")
    div.classList.add("container")
    div.innerHTML = `<div class="programInfoContainer"><h3>${program.name}</h3>
    <p>${programShortInfo(program)}</p></div>`
    div.appendChild(heartIcon())
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
            likedPrograms(array)
        } else {
            console.log(this.parentElement)
            heartIconDiv.classList.add("activeLike")
            array.push(DB.PROGRAMMES.find(program => program.name == this.parentElement.id).id)
            heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
            likedPrograms(array)
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
        activeButton.innerHTML = `X ${active.innerHTML}`
        // X här ska vara en div med icon sen, även addera eventListner till det krysset
        activeFilter.append(activeButton)
    }  
}

window.addEventListener("load",activeFilters)