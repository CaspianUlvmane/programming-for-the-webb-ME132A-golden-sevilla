let createElement = (element) => document.createElement(element);

function renderPrograms (){
    let resultDiv = document.getElementById("results")
    resultDiv.innerHTML = ""
    let programmes = findProgrammes()
    for (let program of programmes){
        let programDiv = renderProgram(program)
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
            heartIconDiv.classList.remove("activeLike")
            heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`
        } else {
            heartIconDiv.classList.add("activeLike")
            heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
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

//// Render Acctive result 

function activeFilters () {

    let activeArray = document.querySelectorAll(".active")
    console.log(activeArray)
    let activeFilter = document.getElementById("activeFilter")

    activeFilter.innerHTML = "" 

    for (let active of activeArray) {
        console.log(activeArray)
        let activeButton = document.createElement("button")
        activeButton.innerHTML = active.innerHTML
        activeFilter.append(activeButton)
    }

    
}

window.addEventListener("load",activeFilters)