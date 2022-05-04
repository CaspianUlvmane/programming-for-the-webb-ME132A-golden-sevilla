function buildTopMenu (likedArray) {
  let topMenu = document.createElement('div')
  topMenu.appendChild(createBurger())
  topMenu.appendChild(createLogo())
  topMenu.appendChild(createSearch())

  if (likedArray.length > 0) {
    topMenu.appendChild(createDarkHeart())
  } else {
    topMenu.appendChild(createLightHeart())
  }
  return topMenu
}

function createBurger () {
  let burgerDiv = document.createElement('div')
  burgerDiv.innerHTML = 'Icon'
  burgerDiv.addEventListener('click', createBurgerItems())
  return burgerDiv
}

function createLogo () {
  let logoDiv = document.createElement('div')
  logoDiv.innerHTML = 'Studerience'
  // add link on studerience
  return logoDiv
}

function createSearch () {
  let searchDiv = document.createElement('div')
  searchDiv.classList.add(search)
  // add img to .search i css
  searchBar()
  searchDiv.addEventListener('click', function () {
    searchBar().classList.toggle('searchBar')
    changeClass(searchDiv)
  })
  return searchDiv
}

function changeClass (element) {
  if (element.classList.contains('close')) {
    element.classList.remove('close')
  } else {
    element.classList.add('close')
  }
}

function createLightHeart () {
  let lightHeart = document.createElement('div')
  lightHeart.innerHTML = 'icon'
  lightHeart.addEventListener('click', likedPrograms())
  return lightHeart
}

function createDarkHeart () {
  let darkHeart = document.createElement('div')
  darkHeart.innerHTML = 'icon'
  darkHeart.addEventListener('click', likedPrograms())
  return darkHeart
}
