document.querySelector('header').appendChild(buildTopMenu(array))

function buildCountry (id){
    let country = DB.COUNTRIES.find(country=> country.id == id)
    let container = document.getElementById("container")
    let countryInfo = document.createElement("div")
    countryInfo.classList.add("country-info")
    container.innerHTML=``
    
    countryInfo.innerHTML = `
    <h2> Studera i ${country.name}</h2>
    <p> ${country.text}</p>`
    
    setCountryBackground(id)
    container.appendChild(countryInfo)
    let citys = findCities(id)
    container.appendChild(citys)
    return buildCountry
}

function findCities (id){
    let cityArray = DB.CITIES.filter(city => city.countryID == id)
    return createCityDiv(cityArray)
}

function createCityDiv (cityArray){
    let cityContainer = document.createElement("div")
    cityContainer.classList.add("city-container")
    for(let city of cityArray){
        let cityDiv = document.createElement("div")
        cityDiv.classList.add("city-div")
        cityDiv.innerHTML = `<div class="city-info">
        <h3> ${city.name}</h3>
        <p> ${city.text}</p>
        <a href="../html_files/filter.html"><button> Studera i ${city.name}</button></a>
        </div>`
    
        cityDiv.style.backgroundImage = `url(../Databasen/Images/${city.name.toLowerCase()}_normal_1.jpg)`
        cityContainer.appendChild(cityDiv)
    }
    return cityContainer
}

function setCountryBackground (id){
    let country = DB.COUNTRIES.find(country => country.id == id)
    let countryImgDiv = document.getElementById("top-img")
    countryImgDiv.style.backgroundImage = `url(..//${country.name.toLowerCase()}_normal_1.jpg)`
}

function getCountryFromUrl(){
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
    // used searchParams to get countryID through URL
    let url = new URL(window.location);
        let params = url.searchParams;
        return parseInt(params.get("country"))
}

let country = getCountryFromUrl()
buildCountry(country)

document.querySelector("footer").appendChild(footer())