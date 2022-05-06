let array = ['hej', 'hej']

function likedPrograms (likedArray) {
  let likeContainer = document.createElement('div')
  likeContainer.classList.add('container-hidden')
  document.querySelector('body').appendChild(likeContainer)

  if (likedArray.length > 0) {
    for (let liked of likedArray) {
      let likedItem = document.createElement('div')
      likedItem.innerHTML = `${liked}`
      likeContainer.appendChild(likedItem)
    }
  } else {
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
