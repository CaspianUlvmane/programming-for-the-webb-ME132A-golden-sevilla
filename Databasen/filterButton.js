let filterToggle = document.getElementById('filterToggle')

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

function findProgrammes () {
  let activeArray = document.querySelectorAll('.active')
  let result = []
  let allFilters = []
  for (let active of activeArray) {
    let data = JSON.parse(active.dataset.data)
    let key = data.key
    let value = data.value
    let filterObject = {key: key, value: value}
    allFilters.push(filterObject)
  }
  let sortedFilters = allFilters.sort((a, b) =>{
    if (a.key < b.key){
          return -1
      }
    if (a.key > b.key){
        return 1
    }
    else {
        return 0
    }
  })
  return filter(sortedFilters)
}

// skapa array - varje key - varje key innehyåller de valda filterena 

function filter (array){
    let programmes = []
    let filteredProgrammes = []
      for (let i = 0; i < array.length; i++){
          if (i == 0){
              programmes.push(DB.PROGRAMMES.filter((programme) => programme[array[i].key] == array[i].value))
          }
          else if ( i > 0 && array[i].key == array[i-1].key){
              programmes.push(DB.PROGRAMMES.filter((programme) => programme[array[i].key] == array[i].value))
              
          }
          else if (i > 0 && array[i].key != array[i-1].key){
              console.log(programmes)
              var merged = [].concat.apply([], programmes);
              console.log(merged)
              filteredProgrammes.push(merged.filter((program) => program[array[i].key] == array[i].value))
          }
      }
      console.log(programmes)
      console.log(filteredProgrammes)
      if (filteredProgrammes[0] == undefined){
          return [].concat.apply([], programmes)
      }
      else{
          return [].concat.apply([], filteredProgrammes)
      }
}

//     // Object = {key, value}
//     // Array.push(object)
//     // Array.sort()
//     // check array.key.length
//     // loop array i = 0
//     //     if key == previous key i-1 i=0
//     //     filter original DB
//     //     let newarray = concat filtered arrays

//     //     else if (key != i-1)
//     //     filter on newarray

//     //     let results = concat filterd arrays


//     // sort Array, if 0 is undefined don do that
//     // if (key != )
//     // base filter on result
//     // else
//     // base on new Array

//     // for (let i = 0; i < activeArray.length; i++)
//         // if ( i == 0){
//         //     result
//         // }
//         // else{
//         //     filter on next key
//         // }
//         // push to empty array

//     result = result.filter(program => program[key] == value)

//     console.log(result)
//   }

function buildFilterButton (text, key, value) {
  let button = document.createElement('button')
  button.dataset.data = JSON.stringify({ key: key, value: value })
  button.textContent = text
  button.addEventListener('click', toggleActive)
  button.addEventListener('click', findProgrammes)
  return button
}

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

function filterDivEvent () {
  let divs = document.querySelectorAll('.filterContainer div:nth-child(1)')
  console.log(divs)
  for (let div of divs) div.addEventListener('click', showButtons)
}

function showButtons () {
  if (this.classList.contains('showButtons')) {
    this.classList.remove('showButtons')
  } else this.classList.add('showButtons')
}

function buildFilterButtons () {
  let body = document.querySelector('body')
  let div = document.createElement('div')
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
  body.appendChild(div)
  languageButtons()
  levelButtons()
  fieldButtons()
  countryButtons()
  filterDivEvent()
}

function toggleFilters () {
  let div = document.getElementById('allFilters')
  div.classList.toggle('showFilters')
}

buildFilterButtons()

filterToggle.addEventListener('click', toggleFilters)
