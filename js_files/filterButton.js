let filterToggle = document.getElementById('filterToggle')

//adds a country and city ID to every programme
function addCountryAndCity () {
  for (let country of DB.COUNTRIES) {
    for (let city of DB.CITIES) {
      if (city.countryID == country.id) {
        for (let uni of DB.UNIVERSITIES) {
          if (uni.cityID == city.id) {
            for (let programme of DB.PROGRAMMES)
              if (programme.universityID == uni.id) {
                programme.country = country.id
                programme.city = city.id
              }
          }
        }
      }
    }
  }
}

addCountryAndCity()

// Finds all filter buttons with class active and turns data
// in to objects for filtering
function findProgrammes () {
  let activeArray = document.querySelectorAll('.active')
  let allFilters = []
  for (let active of activeArray) {
    // parse turns data string in to object
    let data = JSON.parse(active.dataset.data)
    let key = data.key
    let value = data.value
    let filterObject = { key: key, value: value }
    allFilters.push(filterObject)
  }
  return filter(allFilters)
}

// Filters programmes based on the active filters
// uses the keys upon which we filter
function filter (array) {
  let keys = ['language', 'subjectID', 'level', 'country', 'city']
  let keysArray = {
    language: [],
    subjectID: [],
    level: [],
    country: [],
    city: []
  }

  let programmes = DB.PROGRAMMES
  // For every filter push its value in to the array of keys
  // example keysArray[language].push(0)
  for (let data of array) {
    keysArray[data.key].push(data.value)
  }
  // For every key check if there is a filter based on that key
  for (let key of keys) {
    if (keysArray[key].length > 0)
      // Filters programmes if there is a filter on a key
      // and returns all programmes that fulfill the value that
      // exists within keysArray[key]
      // example keysArray[language].includes[0, 1] will return
      // all programmes in Spanish and English
      programmes = programmes.filter(program =>
        keysArray[key].includes(program[key])
      )
  }
  let result = programmes
  return result
}

// Creates a filter button
// creates data for the button using JSON.stringify
// the string contains an object with a key and avalue
// example {key: language, value; 0}

function buildFilterButton (text, key, value) {
  let button = document.createElement('button')
  button.dataset.data = JSON.stringify({ key: key, value: value })
  button.textContent = text
  button.addEventListener('click', toggleActive)
  button.addEventListener('click', renderPrograms)
  button.addEventListener('click', activeFilters)
  if (key == 'subjectID' && value == getSubjectFromUrl()) {
    button.classList.add('active')
  } else if (key == 'country' && value == findCountry()) {
    button.classList.add('active')
  }
  if (key == 'city' && value == getCityFromUrl()) {
    button.classList.add('active')
  }
  return button
}

// Creats filter buttons with keys and values
// Level buttons have to use a counter because the programmes uses numbers not strings to filter
function languageButtons () {
  let languages = document.getElementById('languages')
  for (let language of DB.LANGUAGES) {
    languages.appendChild(
      buildFilterButton(language.name, 'language', language.id)
    )
  }
}

function fieldButtons () {
  let fields = document.getElementById('fields')
  for (let field of DB.FIELDS) {
    fields.appendChild(buildFilterButton(field.name, 'subjectID', field.id))
  }
}

function levelButtons () {
  let levels = document.getElementById('levels')
  let i = 0
  for (let level of DB.LEVELS) {
    levels.appendChild(buildFilterButton(level, 'level', i))
    i++
  }
}

function countryButtons () {
  let countries = document.getElementById('countries')
  for (let country of DB.COUNTRIES) {
    let countryButton = buildFilterButton(country.name, 'country', country.id)
    countryButton.addEventListener('click', function () {
      cityButtons()
    })
    countries.appendChild(countryButton)
  }
}

// only renders city buttons based on the active country buttons
function cityButtons () {
  let citiesDiv = document.getElementById('cities')
  citiesDiv.innerHTML = ' '
  let active = document.querySelectorAll('.active')
  for (let country of active) {
    let data = JSON.parse(country.dataset.data)
    if (data.key == 'country')
      for (let city of DB.CITIES) {
        if (city.countryID == data.value)
          citiesDiv.appendChild(buildFilterButton(city.name, 'city', city.id))
      }
  }
}

function toggleActive () {
  if (this.classList.contains('active')) {
    this.classList.remove('active')
  } else this.classList.add('active')
}

// looks at the filter keys within filter overlay
// when clicking on the key opens up available filters
function filterDivEvent () {
  let divs = document.querySelectorAll('.filterContainer div:nth-child(1)')
  for (let div of divs) div.addEventListener('click', showButtons)
}

function showButtons () {
  if (this.classList.contains('showButtons')) {
    this.classList.remove('showButtons')
  } else this.classList.add('showButtons')
}

// creates divs and appends buttons in filteroverlay
function buildFilterButtons () {
  let filterWrapper = document.getElementById('allFilterWrapper')
  let div = createElement('div')
  div.id = 'allFilters'

  div.innerHTML = `<div class="filterContainer">
          <div>Språk</div>
          <div id="languages" class="filterButtons"></div>
          </div>
          <div class="filterContainer">
          <div>Nivåer</div>
          <div id="levels" class="filterButtons"></div>
          </div>
          <div class="filterContainer">
          <div>Ämnen</div>
          <div id="fields" class="filterButtons"></div>
          </div>
          <div class="filterContainer">
          <div>Länder</div>
          <div id="countries" class="filterButtons"></div>
          </div>
          <div class="filterContainer">
          <div>Städer</div>
          <div id="cities" class="filterButtons"></div>
          </div>`
  filterWrapper.appendChild(div)
  languageButtons()
  levelButtons()
  fieldButtons()
  countryButtons()
  filterDivEvent()
  cityButtons()
}

function toggleFilters () {
  let allFilters = document.getElementById('allFilters')
  let activeFilters = document.getElementById('activeFilter')
  activeFilters.classList.toggle('hideFilters')
  allFilters.classList.toggle('showFilters')
}

function removeShowbuttons () {
  let buttons = document.querySelectorAll('.filterButtons > button')
  let buttonContainer = document.getElementById('allFilters')
  if (!buttonContainer.classList.contains('showFilters')) {
    buttons.forEach(element => element.classList.add('hide'))
  } else {
    buttons.forEach(element => element.classList.remove('hide'))
  }
}

function getCityFromUrl () {
  // used searchParams to get countryID through URL
  let url = new URL(window.location)
  let params = url.searchParams

  return parseInt(params.get('city'))
}

function findCountry () {
  let cityFromUrl = getCityFromUrl()
  if (cityFromUrl >= 0) {
    return (countryID = DB.CITIES.find(city => city.id == cityFromUrl)
      .countryID)
  }
}

function getSubjectFromUrl () {
  let url = new URL(window.location)
  let params = url.searchParams

  return parseInt(params.get('field'))
}

buildFilterButtons()
renderPrograms()
removeShowbuttons()
filterToggle.addEventListener('click', toggleFilters)
filterToggle.addEventListener('click', removeShowbuttons)
