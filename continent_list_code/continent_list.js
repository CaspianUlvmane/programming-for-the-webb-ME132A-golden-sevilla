
function createContinentList(){
    let listContainer = document.createElement("div")
    listContainer.id = "list-container"

    for (let continent of DB.CONTINENTS){
        let continetContainer = document.createElement("div")
        let continentDiv = document.createElement("div")
        continentDiv.classList.add("continent-div")
        continentDiv.innerHTML = continent.name.toUpperCase()
        continetContainer.appendChild(continentDiv)

        let countrysInContinent = DB.COUNTRIES.filter(country => country.continentID == continent.id)
        let countryContainer = document.createElement("div")
        countryContainer.classList.add("country-container", "unactive")
        
        for (let country of countrysInContinent){
            let countryDiv = document.createElement("div")
            countryDiv.classList.add("country-div")
            countryDiv.innerHTML = country.name
            countryContainer.appendChild(countryDiv)
            countryDiv.addEventListener("click", getClickedCountryId)
        }
        
        continentDiv.addEventListener("click", function(){
            countryContainer.classList.toggle("unactive")
        })

        continetContainer.appendChild(countryContainer)
        listContainer.appendChild(continetContainer)
    }
    return listContainer
}

cotinentViewBar()
let list = createContinentList()
document.querySelector("body").appendChild(list)


function getClickedCountryId(event){
    let clickedContry = event.target.innerHTML
    return DB.COUNTRIES.find(country => country.name == clickedContry).id
    // this click should also call for country.html and activate funtion that create country.html info
}


function cotinentViewBar (){
    let viewContainer = document.createElement("div")
    viewContainer.appendChild(createDivMapView())
    viewContainer.appendChild(createDivListView())

    document.querySelector("body").appendChild(viewContainer)
}

function createDivMapView (){
    let mapDiv = document.createElement("div")
    mapDiv.classList.add("map-view")
    mapDiv.innerHTML = "Kartvy"

    return mapDiv
}

function createDivListView (){
    let listDiv = document.createElement("div")
    listDiv.classList.add("list-view")
    listDiv.innerHTML = "Listvy"

    return listDiv
}