let array = []

function renderPrograms () {
  // stores liked items in variable
  // concats array with stored items
  let storedLikedArray = JSON.parse(localStorage.getItem('likedArray'))
  if (storedLikedArray != null) {
    let array = []
    array = array.concat(storedLikedArray)
  }
  let resultDiv = document.getElementById('results')
  resultDiv.innerHTML = ''
  let programmes = findProgrammes()
  let infoDiv = document.createElement('div')
  infoDiv.classList.add('info-text')

  // to only view 20 of all programmes
  if (programmes.length > 20) {
    for (let i = 0; i < 20; i++) {
      let programDiv = renderProgram(programmes[i])
      resultDiv.appendChild(programDiv)
      infoDiv.innerHTML = `Visar ${i + 1} / ${programmes.length}`

      if (i == 6) {
        resultDiv.appendChild(adverstisement2())
      }

      if (i == 16) {
        resultDiv.appendChild(adverstisement3())
      }
    }
    // add infoDiv on how many program is shown
    resultDiv.appendChild(infoDiv)
    let viewMore = createElement('div')
    viewMore.classList.add('view-more')
    viewMore.innerHTML = `Se alla ${programmes.length} program
        <i class="fa-solid fa-angle-down"></i>`
    resultDiv.appendChild(viewMore)
    viewMore.addEventListener('click', function () {
      for (let i = 10; i < programmes.length; i++) {
        let programDiv = renderProgram(programmes[i])
        resultDiv.appendChild(programDiv)
        viewMore.style.display = 'none'
        infoDiv.style.display = 'none'
      }
    })
  } else {
    for (let i = 0; i < programmes.length; i++) {
      let programDiv = renderProgram(programmes[i])
      infoDiv.innerHTML = `Visar ${i + 1} av ${programmes.length}`
      resultDiv.appendChild(programDiv)
      resultDiv.appendChild(infoDiv)
    }
  }
}

function renderProgram (program) {
  let div = createElement('div')
  div.classList.add('container')
  let programInfo = createElement('div')
  programInfo.classList.add('programInfoContainer')
  programInfo.innerHTML = `<h3>${program.name}</h3>
    <p>${programShortInfo(program)}</p>`
  div.appendChild(programInfo)
  div.appendChild(heartIcon(program))

  programInfo.addEventListener('click', function () {
    popUpProgram(program)
  })
  return div
}

function heartIcon (program) {
  // stores liked items in variable
  // concats array with stored items
  let storedLikedArray = JSON.parse(localStorage.getItem('likedArray'))
  if (storedLikedArray == null) {
    storedLikedArray = []
  }
  if (storedLikedArray != null) {
    array = []
    array = array.concat(storedLikedArray)
  }

  let heartIconDiv = createElement('div')
  heartIconDiv.classList.add('imgHearth')
  heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`

  for (let likedArray of array) {
    if (likedArray.id == program.id) {
      heartIconDiv.classList.add('activeLike')
      heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
    }
  }

  heartIconDiv.addEventListener('click', function () {
    if (heartIconDiv.classList.contains('activeLike')) {
      heartIconDiv.classList.remove('activeLike')
      let programId = DB.PROGRAMMES.find(
        program => program.name == this.parentElement.id
      )
      let indexOfProgram = array.findIndex(id => id == programId)
      array.splice(indexOfProgram, 1)
      // when an item is removed from the array store the other liked items
      // in local storage
      localStorage.setItem('likedArray', JSON.stringify(array))
      heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`

      buildTopMenu()
      likedPrograms()
      searchBar()
      closeSearchInSearch()
      selectElement('#searchInputBar').addEventListener(
        'keyup',
        searchingInSearch
      )
    } else {
      heartIconDiv.classList.add('activeLike')
      array.push(program)
      // when an item is added to the array store the liked items
      // in local storage
      localStorage.setItem('likedArray', JSON.stringify(array))
      heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
      buildTopMenu()
      likedPrograms()
      searchBar()
      closeSearchInSearch()
      selectElement('#searchInputBar').addEventListener(
        'keyup',
        searchingInSearch
      )
    }
  })
  return heartIconDiv
}

function programShortInfo (program) {
  return `${getSubject(program)}, ${getCountry(program)}, ${getLevel(program)}`
}

function getSubject (program) {
  for (let field of DB.FIELDS)
    if (field.id == program.subjectID) return field.name
}

function getCountry (program) {
  for (let country of DB.COUNTRIES)
    if (country.id == program.country) return country.name
}

function getLevel (program) {
  for (let i = 0; i < DB.LEVELS.length; i++) {
    if (program.level == i) {
      return DB.LEVELS[i]
    }
  }
}

//// Render AcctiveFilters result
function activeFilters () {
  let activeArray = document.querySelectorAll('.active')
  let activeFilter = document.getElementById('activeFilter')

  activeFilter.innerHTML = ''
  for (let active of activeArray) {
    let activeButton = document.createElement('button')
    activeButton.classList.add('activeButton')
    activeButton.innerHTML = `<span>X </span> ${active.innerHTML}`
    activeButton.addEventListener('click', function () {
      active.classList.toggle('active')
      renderPrograms()
      activeFilters()
    })
    // X här ska vara en div med icon sen, även addera eventListner till det krysset
    activeFilter.append(activeButton)
  }
}

window.addEventListener('load', activeFilters)
