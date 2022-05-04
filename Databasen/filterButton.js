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
    return button
}
    
    function languageButtons(){
        let languages = document.getElementById("languages")
        for (let language of DB.LANGUAGES){
            languages.appendChild(buildFilterButton(language.name, "language", language.id))
        }
    }

    function fieldButtons(){
        let fields = document.getElementById("fields")
        for (let field of DB.FIELDS){
            fields.appendChild(buildFilterButton(field.name, "subjectID", field.id))
        }
    }

    function levelButtons(){
        let levels = document.getElementById("languages")
        let i = 0
        for (let level of DB.LEVELS){
            levels.appendChild(buildFilterButton(level, "level", i))
            i++
        }
    }

    function countryButtons(){
        let countries = document.getElementById("countries")
        for (let country of DB.COUNTRIES){
            let countryButton = buildFilterButton(country.name, "country", country.id)
            countryButton.addEventListener("click", function (){cityButtons()})
            countries.appendChild(countryButton)
        }
        console.log(countries)
        return countries.join(" ")
    }

    function cityButtons(){
        let citiesDiv = document.getElementById("cities")
        citiesDiv.innerHTML = " "
        let active = document.querySelectorAll(".active")
        for (let country of active){
        let data = JSON.parse(country.dataset.data)
            if (data.key == "country")
                for (let city of DB.CITIES){
                    if (city.countryID == data.value)
                    citiesDiv.appendChild(buildFilterButton(city.name, "city", city.id))
                }
        }
    }
    
    function toggleActive (){
        if (this.classList.contains("active")){
            this.classList.remove("active")
        }
        else this.classList.add("active")
    }

    function buildFilterButtons (){
        let body = document.querySelector("body")
        let div = document.createElement("div")
        div.innerHTML = `<div>Språk</div>
        <div id="languages"></div>
        <div>Nivåer</div>
        <div id="levels"></div>
        <div>Ämnen</div>
        <div id="fields"></div>
        <div>Länder</div>
        <div id="countries"></div>
        <div>Städer</div>
        <div id="cities"></div>`
        body.appendChild(div)
        languageButtons()
        levelButtons()
        fieldButtons()
        countryButtons()
    }