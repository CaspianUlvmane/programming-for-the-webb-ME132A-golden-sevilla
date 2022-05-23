// builds country depending on which country you clicked on in contient.html
function buildCountry (id) {
  let country = DB.COUNTRIES.find(country => country.id == id)
  let container = document.getElementById('container')
  let countryInfo = createElement('div')
  countryInfo.classList.add('country-info')
  container.innerHTML = ``

  countryInfo.innerHTML = `
    <h2> Studera i ${country.name}</h2>
    <p> ${country.text}</p>`

  setCountryBackground(id)
  container.appendChild(countryInfo)
  let citys = findCities(id)
  container.appendChild(citys)
  return buildCountry
}

// filter which cities is in choosen country
function findCities (id) {
  let cityArray = DB.CITIES.filter(city => city.countryID == id)
  return createCityDiv(cityArray)
}
// created divs with all citys
function createCityDiv (cityArray) {
  let cityContainer = createElement('div')
  cityContainer.classList.add('city-container')
  for (let city of cityArray) {
    let cityDiv = createElement('div')
    cityDiv.classList.add('city-div')
    cityDiv.innerHTML = `<div class="city-info">
        <h3> ${city.name}</h3>
        <p> ${city.text}</p>
        <a href="../html_files/filter.html?city=${city.id}"><button class="cityButton"> Studera i ${city.name}</button></a>
        </div>`
    cityDiv.style.backgroundImage = `url(../Databasen/Images/${cityURL(
      city
    )}_normal_1.jpg)`
    cityContainer.appendChild(cityDiv)
  }
  return cityContainer
}

function cityURL (city) {
  let name = city.name
  return name
    .split(' ')
    .join('_')
    .toLowerCase()
}

function countryURL (country) {
  let name = country.name
  return name
    .split(' ')
    .join('_')
    .toLowerCase()
}

function setCountryBackground (id) {
  let country = DB.COUNTRIES.find(country => country.id == id)
  let countryImgDiv = document.getElementById('top-img')
  countryImgDiv.style.backgroundImage = `url(../Databasen/Images/${countryURL(
    country
  )}_normal_1.jpg)`
}

function getCountryFromUrl () {
  // get url info
  let url = new URL(window.location)
  let params = url.searchParams
  // return which id is after country and makes it to a number
  return parseInt(params.get('country'))
}

let country = getCountryFromUrl()
buildCountry(country)
document.querySelector('footer').appendChild(advertisement())
document.querySelector('footer').appendChild(adverstisement4())
