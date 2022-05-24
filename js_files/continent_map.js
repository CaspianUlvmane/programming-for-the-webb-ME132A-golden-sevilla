// add eventListner to worldmap
function getClickedContinent () {
  let world = document.getElementById('world')
  world.addEventListener('click', changeImgToClickedImage)
}

getClickedContinent()

function changeImgToClickedImage (event) {
  let world = document.getElementById('world')
  // all different continent maps in html
  let EU = document.getElementById('EU')
  let NA = document.getElementById('NA')
  let SA = document.getElementById('SA')
  let AU = document.getElementById('AU')

  let title = document.getElementById('info')
  let backButton = document.getElementById('back-button')
  // gets id of clicked continent
  let clickedId = event.target.parentElement.id

  // change to map depending on which one is clicked
  if (clickedId == 'europe') {
    change(EU, world, title, backButton)
    // ads eventlistner to backbutton
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

// is called above with parameters depending on which continent is clicked
function change (element, world, title, button) {
  element.style.display = 'block'
  world.style.display = 'none'
  title.innerHTML = `<div>Välj land</div>`
  button.style.display = 'block'
}
