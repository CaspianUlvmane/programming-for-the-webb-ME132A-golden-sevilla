// denna array ska sedan vara vår "likedArray".
let array = ['hej']
// parametern array, ska vara "likedArray" sedan.

document.querySelector('body').appendChild(buildTopMenu(array))
document.querySelector('body').appendChild(createBurgerItems())

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
  burgerDiv.addEventListener('click', function () {
    document
      .querySelector('.burger-container')
      .classList.toggle('burger-hidden')
  })
  return burgerDiv
}

function createLogo () {
  let logoDiv = document.createElement('div')
  logoDiv.classList.add('title-name')
  logoDiv.innerHTML = `<a href = index.HTML><h2> STUDERIENCE </h2></a>`
  return logoDiv
}

function createSearch () {
  let searchDiv = document.createElement('div')
  searchDiv.classList.add('search')
  // Har icon-länk just nu, men ska sedan vara bild i css, som ändras vid byte av class.
  searchDiv.innerHTML = `<i class="fa-solid fa-magnifying-glass"> </i>`
  // behöver bygga searchBar(), innan dessa funkar.
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
  add - light - heart
  lightHeart.innerHTML = '<i class="fa-thin fa-heart">'
  lightHeart.innerHTML = 'Icon'
  // byt till tomt hjärta här, icon innerHTML main
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

// OBS. uppdatera länkarna så de hittar vägen.

function createBurgerItems () {
  let burgerItems = [
    {
      text: 'Utbyteslivet',
      url: 'info.html'
    },
    {
      text: 'Världsdelar och länder',
      url: 'continets.html'
    },
    {
      text: 'Ämnen',
      url: 'fields.html'
    },
    {
      text: 'Program',
      url: 'filter.html'
    },
    {
      text: 'Om oss',
      url: 'about.html'
    }
  ]
  let burgerContainer = document.createElement('div')
  burgerContainer.classList.add('burger-container', 'burger-hidden')
  for (let item of burgerItems) {
    let burgerItem = document.createElement('div')
    burgerItem.classList.add('burger-list')
    burgerItem.innerHTML = `<a href = "${item.url}">${item.text}</a> `
    burgerContainer.appendChild(burgerItem)
  }
  document.querySelector('body').appendChild(burgerContainer)
  return burgerContainer
}
