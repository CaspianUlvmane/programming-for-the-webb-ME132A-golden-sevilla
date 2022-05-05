//denna array ska sedan vara vår "likedArray".
let array = ['hej']
// alltså ska parametern array, vara "likedArray" sedan.
document.querySelector('body').appendChild(buildTopMenu(array))

function buildTopMenu (likedArray) {
  let topMenu = document.createElement('div')
  topMenu.id = 'nav'
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
  burgerDiv.classList.add('hamburger')
  burgerDiv.innerHTML = `
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
  `
  // burgerDiv.addEventListener('click', createBurgerItems())
  return burgerDiv
}

function createLogo () {
  let logoDiv = document.createElement('div')
  logoDiv.classList.add('title-name')
  logoDiv.innerHTML = `<h2> STUDERIENCE </h2>`
  // add link on studerience
  return logoDiv
}

function createSearch () {
  let searchDiv = document.createElement('div')
  searchDiv.classList.add('search')
  searchDiv.innerHTML = `<i class="fa-solid fa-magnifying-glass"> </i>`
  // add img to .search i css
  // searchBar()
  // searchDiv.addEventListener('click', function () {
  //   searchBar().classList.toggle('searchBar')
  //   changeClass(searchDiv)
  // })
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
  lightHeart.classList.add('my-likes')
  lightHeart.innerHTML = 'Icon'
  // lightHeart.addEventListener('click', likedPrograms())
  return lightHeart
}

function createDarkHeart () {
  let darkHeart = document.createElement('div')
  darkHeart.classList.add('my-likes')
  darkHeart.innerHTML = '<i class="fa-solid fa-heart"> </i>'
  // darkHeart.addEventListener('click', likedPrograms())
  return darkHeart
}
