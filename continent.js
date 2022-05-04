
function createContinentList(){
    let listContainer = document.createElement("div")
    listContainer.id = "list-container"

    for (let continent of DB.CONTINENTS){
        let continetContainer = document.createElement("div")
        let continentDiv = document.createElement("div")
        continentDiv.classList.add("continent-div")
        continentDiv.innerHTML = continent.name
        continetContainer.appendChild(continentDiv)

        let countrysInContinent = DB.COUNTRIES.filter(country => country.continentID == continent.id)
        let countryContainer = document.createElement("div")
        countryContainer.classList.add("country-container")
        
        for (let country of countrysInContinent){
            let countryDiv = document.createElement("div")
            countryDiv.innerHTML = country.name
            countryContainer.appendChild(countryDiv)
        }
        
        continentDiv.addEventListener("click", function(){
            countryContainer.classList.toggle("country-container")
        })

        continetContainer.appendChild(countryContainer)
        listContainer.appendChild(continetContainer)
    }
    return listContainer
}

let list = createContinentList()
document.querySelector("body").appendChild(list)