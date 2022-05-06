
function createContinentList(){
    let listContainer = document.getElementById("list-container")

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
            countryDiv.innerHTML = `
            <a href="../country_code/country.html?country=${country.id}">${country.name}</a>`
            // gave link country.id to reach it when calling for function thar create country.html info
            countryContainer.appendChild(countryDiv)
        }
        
        continentDiv.addEventListener("click", function(){
            countryContainer.classList.toggle("unactive")
        })

        continetContainer.appendChild(countryContainer)
        listContainer.appendChild(continetContainer)
    }
    return listContainer
}

function cotinentViewBar (){
    let viewContainer = document.getElementById("view-bar")
    let mapDiv= createDivMapView()
    let listDiv = createDivListView()
    mapDiv.addEventListener("click", function(){
        changeToMapView(listDiv, mapDiv)
    })
    listDiv.addEventListener("click", function(){
        changeToListView(listDiv,mapDiv)
    })
    viewContainer.appendChild(mapDiv)
    viewContainer.appendChild(listDiv)   
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

function changeToListView(listDiv, mapDiv){    
    listDiv.classList.add("active-view")
    mapDiv.classList.remove("active-view")

    let mapContainer = document.getElementById("map-container")
    let listContainer = document.getElementById("list-container")
    mapContainer.style.display= "none"
    listContainer.style.display = "flex" 
}

function changeToMapView(listDiv, mapDiv){  
    listDiv.classList.remove("active-view")
    mapDiv.classList.add("active-view")

    let mapContainer = document.getElementById("map-container")
    let listContainer = document.getElementById("list-container")
    mapContainer.style.display = "flex"
    listContainer.style.display = "none"  
}

function createContinentMap(){
    let mapContainer = document.getElementById("map-container")
    mapContainer.innerHTML = "MAP"
    
    return mapContainer
}

cotinentViewBar()
createContinentList()
createContinentMap()
