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
      // lägg till resten av infon.
      likedItem.innerHTML = `${program.name}`
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

function findLikedProgram () {

}
