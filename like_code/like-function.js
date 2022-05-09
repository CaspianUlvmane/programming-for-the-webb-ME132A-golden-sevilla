let array = [2, 3, 4, 6, 7]

function likedPrograms (likedArray) {
  let likeContainer = document.createElement('div')
  likeContainer.classList.add('container-hidden')
  document.querySelector('body').appendChild(likeContainer)

  if (likedArray.length > 0) {
    for (let liked of likedArray) {
      // om array består av namn, ändra från id till namn.
      let program = DB.PROGRAMMES.find(program => program.id == liked)
      console.log(program)
      let likedItem = document.createElement('div')
      likedItem.classList.add("liked-item")
      // lägg till resten av infon.
      likedItem.innerHTML = `
      <div class="liked-div">
      <p class="bold">${program.name}</p>
      <p class="liked-info">${getSubject(program)}, ${getCountry(program)}, ${DB.LEVELS[program.level]}</p>
      </div>
      `
      let likedHeartDiv = document.createElement("div")
      likedHeartDiv.classList.add("liked-heart-div")

      likedHeartDiv.addEventListener('click', removeLike)
      likeContainer.appendChild(likedItem)
      likedItem.appendChild(likedHeartDiv)
    }
  } else {
    // div, med innerhtml, text. append to container.
    console.log('finns inga liked programs')
  }
}

likedPrograms(array)

function changeClassOnLikeContainer (element) {
  if (element.classList.contains('container-show')) {
    element.classList.remove('container-show')
  } else {
    element.classList.add('container-show')
  }
}
// Har använt min globala array här, då jag inte kunde skicka med likedArray som parameter - event funkade ej då.
// Måste kolla på detta!
function removeLike (event) {
  event.preventDefault()
  let name = event.target.innerHTML
  // Detta är om array är baserad på id, om det är namn, skippa steget under med find.
  let programId = DB.PROGRAMMES.find(program => program.name == name).id
  let indexOfProgram = array.findIndex(id => id == programId)
  array.splice(indexOfProgram, 1)
  // console.log(array)
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
