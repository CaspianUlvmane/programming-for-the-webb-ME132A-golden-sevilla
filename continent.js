function createContinentList(){
    let listContainer = document.createElement("div")

    for (let continent of DB.CONTINENTS){
        let continentContainer = continentDiv(continent)

        let countrysInContinent = DB.COUNTRIES.filter(country => country.continentID == continent.id)

        let countryContainer = document.createElement("div")
        countryContainer.classList.add("country-container")

        for (let country of countrysInContinent){
            let countryDiv = createCountryDiv(country)
            countryContainer.appendChild(countryDiv)
        }

        listContainer.appendChild(continentContainer)
    }
}

function createContinentDiv (continent){
    let continetContainer = document.createElement("div")
    continetContainer.appendChild(continentDiv)

    let continentDiv = document.createElement("div")
    continentDiv.innerHTML = continent.name
    continentDiv.addEventListener("click", toggleCountryView)

    return continetContainer   
}

function createCountryDiv(country){
    let countryDiv = document.createElement("div")
    countryDiv.innerHTML = country.name
    countryDiv.addEventListener("click", getClickedCountryId)

    return countryDiv
}

