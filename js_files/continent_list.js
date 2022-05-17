function createContinentList(){
    let listContainer = document.getElementById("list-container")
    listContainer.appendChild(createInfoDiv())

    for (let continent of DB.CONTINENTS){
        let continetContainer = createElement("div")
        let continentDiv = createElement("div")
        continentDiv.classList.add("continent-div")
        continentDiv.innerHTML = `<div>${continent.name}</div>`
        let iconDiv = createElement("div")
        iconDiv.innerHTML = `<i class="fa-solid fa-angle-down"></i>`
        continentDiv.appendChild(iconDiv)
        continetContainer.appendChild(continentDiv)

        let countrysInContinent = DB.COUNTRIES.filter(country => country.continentID == continent.id)
        let countryContainer = createElement("div")
        countryContainer.classList.add("country-container", "unactive")
        
        for (let country of countrysInContinent){
            let countryDiv = createElement("div")
            countryDiv.classList.add("country-div")
            countryDiv.innerHTML = `
            <a href="../html_files/country.html?country=${country.id}">${country.name}</a>`
            // gave link country.id to reach it when calling for function thar create country.html info
            countryContainer.appendChild(countryDiv)
        }
        
        continentDiv.addEventListener("click", function(){
            countryContainer.classList.toggle("unactive")

            if (iconDiv.innerHTML == `<i class="fa-solid fa-angle-down"></i>`){
                iconDiv.innerHTML = `<i class="fa-solid fa-angle-up"></i>`
            } else {
                iconDiv.innerHTML= `<i class="fa-solid fa-angle-down"></i>`
            }
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
    let mapDiv = createElement("div")
    mapDiv.classList.add("map-view")
    mapDiv.innerHTML = "Kartvy"
    
    return mapDiv
}

function createDivListView (){
    let listDiv = createElement("div")
    listDiv.classList.add("list-view", "active-view")
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
    mapContainer.style.display = "block"
    listContainer.style.display = "none"  
}

function createContinentMap(){
    let mapContainer = document.getElementById("map-container")
    mapContainer.innerHTML = "MAP"
    
    return mapContainer
}

function createInfoDiv(){
    let infoContainer = createElement("div")
    infoContainer.id = "continent-info"
    infoContainer.innerHTML=`
    <h2>Vart i världen vill du studera?</h2>
    <p>Hos oss kan du kombinera studierna tillsamans med ditt drömresmål!</p>
    <p> Vi har resmål till USA, Australien och massa fler! Du hittar alla våra resmål nedan, antingen genom vår listvy eller kartvy.</p>`

    return infoContainer
}

cotinentViewBar()
createContinentList()