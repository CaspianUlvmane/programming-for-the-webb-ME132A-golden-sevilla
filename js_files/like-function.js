let array = []

function likedPrograms () {
  let storedLikedArray = JSON.parse(sessionStorage.getItem("likedArray"))
  let likeContainer = document.createElement('div')
  likeContainer.classList.add('container-hidden')
  likeContainer.id = "like-container"
  
  likeContainer.innerHTML = ''
  if (storedLikedArray != null){
  if (storedLikedArray.length > 0) {
    for (let program of storedLikedArray) {
      let likedDiv = createLikeDiv(program) 
      let likedHeartDiv = createLikeHeartDiv(program, likedDiv)
      likedDiv.appendChild(likedHeartDiv)

      likeContainer.appendChild(likedDiv)
    }
  } else {
    let noLikes = document.createElement('div')
    noLikes.classList.add('no-likes')
    likeContainer.appendChild(noLikes)
    noLikes.innerHTML = 'Hola Amigo, du har inte gillat något än!'
  }}
  document.querySelector("header").append(likeContainer)
}


function createLikeDiv (program){
  let likedItem = document.createElement('div')
  likedItem.classList.add('liked-item')
  let likedInfo = document.createElement("div")
  likedInfo.innerHTML = `
  <p class="bold">${program.name}</p>
  <p class="liked-info">${getSubject(program)}, ${getCountry(program)}, ${
    DB.LEVELS[program.level]
  }</p>
  `
  likedItem.appendChild(likedInfo)
  likedInfo.addEventListener("click", function(){
    popUpProgram(program)
  })
  return likedItem
}

function createLikeHeartDiv(program, element){
  let likedHeartDiv = document.createElement('div')
  likedHeartDiv.classList.add('liked-heart-div')
  likedHeartDiv.innerHTML = '<i class="fa-solid fa-heart dark-heart"></i>'
  likedHeartDiv.addEventListener('click', function(){
    removeLike(program, element)
  })

  return likedHeartDiv
}

function changeClassOnLikeContainer (element) {
  if (element.classList.contains('container-hidden')) {
    element.classList.remove('container-hidden')
  } else {
    element.classList.add('container-hidden')
  }
}


function removeLike(program, element){
  let indexOfProgram = array.findIndex(element => element.id == program.id)
  array.splice(indexOfProgram,1)
  sessionStorage.setItem("likedArray", JSON.stringify(array))
  element.remove()

  if (array.length == 0) {
    buildTopMenu()
  }
  
  likedPrograms()
  if (window.location.href == `http://127.0.0.1:5500/html_files/filter.html`){
    renderPrograms()}
  searchBar()
  closeSearchInSearch()
  cleanSearch()
  selectElement("#searchInputBar").addEventListener("keyup", searchingInSearch)
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
