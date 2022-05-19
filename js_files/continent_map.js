function getClickedContinent () {
  let world = document.getElementById('world')
  world.addEventListener('click', changeImgToClickedImage)
}

getClickedContinent()

function changeImgToClickedImage (event) {
  let world = document.getElementById('world')
  let EU = document.getElementById('EU')
  let NA = document.getElementById('NA')
  let SA = document.getElementById('SA')
  let AU = document.getElementById('AU')
  let title = document.getElementById('info')
  let backButton = document.getElementById('back-button')
  let clickedId = event.target.parentElement.id

  if (clickedId == 'europe') {
    change(EU, world, title, backButton)
    backButton.addEventListener('click', function () {
      EU.style.display = 'none'
      world.style.display = 'block'
      backButton.style.display = 'none'
      title.innerHTML = `<div> Välj kontinent</div>`
    })
  } else if (clickedId == 'NorthAmerica') {
    change(NA, world, title, backButton)
    backButton.addEventListener('click', function () {
      NA.style.display = 'none'
      world.style.display = 'block'
      backButton.style.display = 'none'
      title.innerHTML = `<div> Välj kontinent</div>`
    })
  } else if (clickedId == 'southAmerica') {
    change(SA, world, title, backButton)
    backButton.addEventListener('click', function () {
      SA.style.display = 'none'
      world.style.display = 'block'
      backButton.style.display = 'none'
      title.innerHTML = `<div> Välj kontinent</div>`
    })
  } else if (clickedId == 'Australia') {
    change(AU, world, title, backButton)
    backButton.addEventListener('click', function () {
      AU.style.display = 'none'
      world.style.display = 'block'
      backButton.style.display = 'none'
      title.innerHTML = `<div> Välj kontinent</div>`
    })
  }
}

function change (element, world, title, button) {
  element.style.display = 'block'
  world.style.display = 'none'
  title.innerHTML = `<div>Välj land</div>`
  button.style.display = 'block'
}
