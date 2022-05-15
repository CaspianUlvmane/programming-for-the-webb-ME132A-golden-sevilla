let array = []

function likedPrograms () {

  let likeContainer = document.createElement('div')
  likeContainer.classList.add('container-hidden')
  likeContainer.id = "like-container"

  likeContainer.innerHTML = ''
  if (array.length > 0) {
    for (let liked of array) {
      // om array består av namn, ändra från id till namn.
      let program = DB.PROGRAMMES.find(program => program == liked)
      // console.log(program)
      let likedItem = document.createElement('div')
      likedItem.classList.add('liked-item')
      likedItem.id = program.name
      let likedDiv = document.createElement("div")
      likedItem.append(likedDiv)
      likedDiv.classList.add("liked-div")
      likedDiv.innerHTML = `
      <p class="bold">${program.name}</p>
      <p class="liked-info">${getSubject(program)}, ${getCountry(program)}, ${
        DB.LEVELS[program.level]
      }</p>
      `
      likedDiv.addEventListener("click", function () {
          popUpProgram(program)
      })
      
      let likedHeartDiv = document.createElement('div')
      likedHeartDiv.classList.add('liked-heart-div')
      likedHeartDiv.innerHTML = '<i class="fa-solid fa-heart dark-heart"></i>'

      likedHeartDiv.addEventListener('click', removeLike)
      likeContainer.appendChild(likedItem)
      likedItem.appendChild(likedHeartDiv)
    }
  } else {
    let noLikes = document.createElement('div')
    noLikes.classList.add('no-likes')
    likeContainer.appendChild(noLikes)
    noLikes.innerHTML = 'Hola Amigo, du har inte gillat något än!'
  }
  document.querySelector("header").append(likeContainer)
}

function changeClassOnLikeContainer (element) {
  if (element.classList.contains('container-hidden')) {
    element.classList.remove('container-hidden')
  } else {
    element.classList.add('container-hidden')
  }
}

// Har använt min globala array här, då jag inte kunde skicka med likedArray som parameter - event funkade ej då.
// function removeLike (event) {
//   event.preventDefault()
//   console.log(event.target)
//   let name =
//     event.target.parentElement.parentElement.firstElementChild.firstElementChild
//       .firstChild.data
//   console.log(array)
//   // Detta är om array är baserad på id, om det är namn, skippa steget under med find.
//   let programId = DB.PROGRAMMES.find(program => program.name == name).id
//   let indexOfProgram = array.findIndex(id => id == programId)
//   array.splice(indexOfProgram, 1)
//   likedPrograms()
// }

function removeLike(){
  
  let programId = DB.PROGRAMMES.find(program => program.name == this.parentElement.id)
  let indexOfProgram = array.findIndex(id => id == programId)
  array.splice(indexOfProgram, 1)
  this.parentElement.remove()
  renderPrograms()
  
  if (array.length == 0) {
    buildTopMenu()
  }
  searchBar()
  likedPrograms()
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
