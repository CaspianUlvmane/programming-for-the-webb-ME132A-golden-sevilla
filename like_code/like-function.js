let array = [3, 2]

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
<<<<<<< Updated upstream
      // lägg till resten av infon.
      likedItem.innerHTML = `${program.name}`
      likedItem.addEventListener('click', removeLike)
=======
    //   likedItem.classList.add("liked-item")
      likedItem.innerHTML = `${liked}`
    //   likedItem.addEventListener("click", function () {
    //     changeClassOnLikeContainer(likedItem)
    //   })
>>>>>>> Stashed changes
      likeContainer.appendChild(likedItem)
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
<<<<<<< Updated upstream
// Har använt min globala array här, då jag inte kunde skicka med likedArray som parameter - event funkade ej då.
// Måste kolla på detta!
function removeLike (event) {
  event.preventDefault()
  let name = event.target.innerHTML
  // Detta är om array är baserad på id, om det är namn, skippa steget under med find.
  let programId = DB.PROGRAMMES.find(program => program.name == name).id
  let indexOfProgram = array.findIndex(id => id == programId)
  array.splice(indexOfProgram, 1)
  console.log(array)
}
=======

>>>>>>> Stashed changes
