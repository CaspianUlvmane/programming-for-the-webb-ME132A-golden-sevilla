function createContinentList () {
  let listContainer = document.getElementById('list-container')
  listContainer.appendChild(createInfoDiv())

  // loops through continents to create div for each
  for (let continent of DB.CONTINENTS) {
    let continetContainer = createElement('div')
    let continentDiv = createElement('div')
    continentDiv.classList.add('continent-div')
    continentDiv.innerHTML = `<div>${continent.name}</div>`
    let iconDiv = createElement('div')
    iconDiv.innerHTML = `<i class="fa-solid fa-angle-down"></i>`
    continentDiv.appendChild(iconDiv)
    continetContainer.appendChild(continentDiv)

    // when looping continents, filter all country in every continent
    let countrysInContinent = DB.COUNTRIES.filter(
      country => country.continentID == continent.id
    )

    // create a country container
    let countryContainer = createElement('div')
    // adds class unactive to be hidden, class is later toggled when click on continentDiv
    countryContainer.classList.add('country-container', 'unactive')

    // go through filterd countrys and created divs
    for (let country of countrysInContinent) {
      let countryDiv = createElement('div')
      countryDiv.classList.add('country-div')
      countryDiv.innerHTML = `
      <a href="../html_files/country.html?country=${country.id}">${country.name}</a>`
      // gave link country.id to reach it when calling for function that creates country.html info
      countryContainer.appendChild(countryDiv)
    }

    // toggles class unactive to show countrys when click on continent
    continentDiv.addEventListener('click', function () {
      countryContainer.classList.toggle('unactive')
      // icon "arrow" is also changing on click
      if (iconDiv.innerHTML == `<i class="fa-solid fa-angle-down"></i>`) {
        iconDiv.innerHTML = `<i class="fa-solid fa-angle-up"></i>`
      } else {
        iconDiv.innerHTML = `<i class="fa-solid fa-angle-down"></i>`
      }
    })

    continetContainer.appendChild(countryContainer)
    listContainer.appendChild(continetContainer)
  }
  return listContainer
}

// creates the viewBar and adds evenlistener to the viewBar options; map or list
function cotinentViewBar () {
  let viewContainer = document.getElementById('view-bar')
  let mapDiv = createDivMapView()
  let listDiv = createDivListView()
  mapDiv.addEventListener('click', function () {
    changeToMapView(listDiv, mapDiv)
  })
  listDiv.addEventListener('click', function () {
    changeToListView(listDiv, mapDiv)
  })
  viewContainer.appendChild(mapDiv)
  viewContainer.appendChild(listDiv)
}

// create map div to the viewBar
function createDivMapView () {
  let mapDiv = createElement('div')
  mapDiv.classList.add('map-view')
  mapDiv.innerHTML = 'Kartvy'

  return mapDiv
}

// create list div to the viewBar
function createDivListView () {
  let listDiv = createElement('div')
  listDiv.classList.add('list-view', 'active-view')
  listDiv.innerHTML = 'Listvy'

  return listDiv
}

// this function is adding to the eventListener on listDiv
function changeToListView (listDiv, mapDiv) {
  // add class to listDiv and remove class on mapDiv to see which one is active in viewBar
  listDiv.classList.add('active-view')
  mapDiv.classList.remove('active-view')

  // change display so listContainer is the display that are viewed
  let mapContainer = document.getElementById('map-container')
  let listContainer = document.getElementById('list-container')
  mapContainer.style.display = 'none'
  listContainer.style.display = 'flex'
}

// same as above but the other way, adding to the eventListener on mapDiv
function changeToMapView (listDiv, mapDiv) {
  listDiv.classList.remove('active-view')
  mapDiv.classList.add('active-view')

  let mapContainer = document.getElementById('map-container')
  let listContainer = document.getElementById('list-container')
  mapContainer.style.display = 'block'
  listContainer.style.display = 'none'
}

// add info to the listView
function createInfoDiv () {
  let infoContainer = createElement('div')
  infoContainer.id = 'continent-info'
  infoContainer.innerHTML = `
    <h2>Vart i världen vill du studera?</h2>
    <p>Hos oss kan du kombinera studierna tillsamans med ditt drömresmål!</p>
    <p> Vi har resmål till USA, Australien och massa fler! Du hittar alla våra resmål nedan, antingen genom vår listvy eller kartvy.</p>`

  return infoContainer
}

cotinentViewBar()
createContinentList()
document.querySelector('footer').appendChild(adverstisement2())
document.querySelector('footer').appendChild(adverstisement4())
