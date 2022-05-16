let array = []

function likedPrograms () {
  let likeContainer = document.createElement('div')
  likeContainer.classList.add('container-hidden')
  likeContainer.id = "like-container"
  
  likeContainer.innerHTML = ''
  if (array.length > 0) {
    for (let program of array) {
      let likedDiv = createLikeDiv(program) 
      let likedHeartDiv = createLikeHeartDiv(program)
      likedDiv.appendChild(likedHeartDiv)

      likeContainer.appendChild(likedDiv)
    }
  } else {
    let noLikes = document.createElement('div')
    noLikes.classList.add('no-likes')
    likeContainer.appendChild(noLikes)
    noLikes.innerHTML = 'Hola Amigo, du har inte gillat något än!'
  }
  document.querySelector("header").append(likeContainer)
}


function createLikeDiv (program){
  let likedItem = document.createElement('div')
  likedItem.classList.add('liked-item')
  likedItem.innerHTML = `
  <div class="liked-div">
  <p class="bold">${program.name}</p>
  <p class="liked-info">${getSubject(program)}, ${getCountry(program)}, ${
    DB.LEVELS[program.level]
  }</p>
  </div>
  `
  // likedItem.addEventListener("click", function(){
  //   popUpProgram(program)
  // })
  return likedItem
}

function createLikeHeartDiv(program){
  let likedHeartDiv = document.createElement('div')
  likedHeartDiv.classList.add('liked-heart-div')
  likedHeartDiv.innerHTML = '<i class="fa-solid fa-heart dark-heart"></i>'
  likedHeartDiv.addEventListener('click', function(){
    removeLike(program)
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


function removeLike(program){
  console.log(array)
  let indexOfProgram = array.findIndex(element => element.id == program.id)
  array.splice(indexOfProgram,1)
  console.log(array)

  buildTopMenu()
  likedPrograms()
  renderPrograms()
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
