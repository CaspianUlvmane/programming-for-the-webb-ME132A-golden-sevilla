let fieldArray = [1, 5]
let languageArray = [1, 3]
let filterResults = []
// dataset

function filter (){
    let activeArray = document.querySelectorAll(".active")
    let result = DB.PROGRAMMES
    for (let active of activeArray){
        console.log(JSON.parse(active.dataset.data))
        let data = JSON.parse(active.dataset.data)
        let key = data.key
        let value = data.value
        result = result.filter(program => program[key] == value)
    }
    console.log(result)
}

//DB.PROGRAMMES.map(country/city)

function buildFilterButton (text, key, value){
    let button = document.createElement("button")
    button.dataset.data = JSON.stringify({key: key, value: value})
    button.textContent = text
    button.addEventListener("click", toggleActive)
    button.addEventListener("click", filter)
    return button}

function languageButtons(){
    let body = document.querySelector("body")
    for (let language of DB.LANGUAGES){
        body.appendChild(buildFilterButton(language.name, "language", language.id))
    }
}

function toggleActive (){
    if (this.classList.contains("active")){
        this.classList.remove("active")
    }
    else this.classList.add("active")
}