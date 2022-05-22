let array = []

// Refers to a selected element

function likedPrograms () {
  // stores array of liked items in variable
  // JSON.parse turns stringified information in to objects
  let storedLikedArray = JSON.parse(localStorage.getItem('likedArray'))
  let likeContainer = createElement('div')

  likeContainer.classList.add('container-hidden')
  likeContainer.id = 'like-container'

  likeContainer.innerHTML = ''

  let likedItemBox = createElement('div')
  likedItemBox.classList.add('liked-item-box')
  // makes sure that the stored array is an array
  if (storedLikedArray == null) {
    storedLikedArray = []
  }
  // if there are liked items creates the liked items
  if (storedLikedArray.length > 0) {
    likeContainer.innerHTML = '<h2>MINA FAVORITER</h2>'

    for (let program of storedLikedArray) {
      
      let likedDiv = createLikeDiv(program)
      let likedHeartDiv = createLikeHeartDiv(program, likedDiv)
      likedDiv.appendChild(likedHeartDiv)

      likedItemBox.appendChild(likedDiv)
      likeContainer.appendChild(likedItemBox)
    }
  } else {
    let noLikes = createElement('div')
    noLikes.classList.add('no-likes')
    likeContainer.appendChild(noLikes)
    noLikes.innerHTML = '<h2>MINA FAVORITER</h2> <br> <p>Du har inte lagt till några favoriter ännu!</p>'
  }
  selectElement('header').append(likeContainer)
}

function createLikeDiv (program) {
  let likedItem = createElement('div')
  likedItem.classList.add('liked-item')
  let likedInfo = createElement('div')
  likedInfo.innerHTML = `
  <p class="bold">${program.name}</p>
  <p class="liked-info">${getSubject(program)}, ${getCountry(program)}, ${
    DB.LEVELS[program.level]
  }</p>
  `
  likedItem.appendChild(likedInfo)
  likedInfo.addEventListener('click', function () {
    popUpProgram(program, likedItem)
  })
  return likedItem
}

function createLikeHeartDiv (program, element) {
  let likedHeartDiv = createElement('div')
  likedHeartDiv.classList.add('liked-heart-div')
  likedHeartDiv.innerHTML = '<i class="fa-solid fa-heart dark-heart"></i>'
  likedHeartDiv.addEventListener('click', function () {
    removeLike(program, element)
  })

  return likedHeartDiv
}

function changeClassOnLikeContainer (element) {
  if (element.classList.contains('container-hidden')) {
    element.classList.remove('container-hidden')
    document.querySelector('main').style.opacity = '0.1'
  } else {
    element.classList.add('container-hidden')
    document.querySelector('main').style.opacity = '1'
  }
}

function removeLike (program, element) {
  // stores liked items in variable
  // concats array with stored items
  let storedLikedArray = JSON.parse(localStorage.getItem('likedArray'))
  let path = window.location.pathname
  let page = path.split('/').pop()
  if (storedLikedArray != null) {
    array = []
    array = array.concat(storedLikedArray)
  }
  let indexOfProgram = array.findIndex(element => element.id == program.id)
  array.splice(indexOfProgram, 1)
  element.remove()
  // when an item is removed from the array store the other liked items
  // in local storage
  localStorage.setItem('likedArray', JSON.stringify(array))

  if (array.length == 0) {
    buildTopMenu()
    document.querySelector('main').style.opacity = '1'
  }

  likedPrograms()
  if (page == 'filter.html') {
    renderPrograms()
  }
  searchBar()
  closeSearchInSearch()
  selectElement('#searchInputBar').addEventListener('keyup', searchingInSearch)
}

function getSubject (program) {
  let subject = DB.FIELDS.find(subject => subject.id == program.subjectID).name
  return subject
}

function getCountry (program) {
  let university = DB.UNIVERSITIES.find(uni => uni.id == program.universityID)
  let city = DB.CITIES.find(city => city.id == university.cityID)
  let country = DB.COUNTRIES.find(country => country.id == city.countryID).name
  return country
}
