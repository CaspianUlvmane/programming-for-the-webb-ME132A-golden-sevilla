// denna array ska sedan vara vår "likedArray".
// let array = []
// parametern array, ska vara "likedArray" sedan.

// select element
let selectElement = select => document.querySelector(select)

// creates a element
let createElement = element => document.createElement(element)

//delete element

function buildTopMenu () {
  // stores liked items in variable
  // concats array with stored items
  let storedLikedArray = JSON.parse(localStorage.getItem('likedArray'))
  let header = selectElement('header')

  header.innerHTML = ''
  let topMenu = createElement('div')
  topMenu.id = 'nav'
  topMenu.appendChild(createBurger())
  topMenu.appendChild(createLogo())
  topMenu.appendChild(createSearch())
  if (storedLikedArray == null) {
    storedLikedArray = []
  }
  // sets heart to correct color based on liked items
  if (storedLikedArray.length > 0) {
    topMenu.appendChild(createDarkHeart())
  } else {
    topMenu.appendChild(createLightHeart())
  }

  createBurgerItems()
  header.appendChild(topMenu)
  // return topMenu
}

// buildTopMenu ()

function createBurger () {
  let burgerDiv = createElement('div')
  burgerDiv.classList.add('hamburger')
  burgerDiv.innerHTML = `
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
  `
  burgerDiv.addEventListener('click', function () {
    selectElement('.burger-container').classList.toggle('burger-hidden')
    burgerDiv.classList.toggle(`active`)
    if (burgerDiv.classList.contains(`active`)) {
      selectElement("main").style.opacity = "0.3"
      
    } else {
      selectElement("main").style.opacity = "1"
    }
  })
  return burgerDiv
}

function createLogo () {
  let logoDiv = createElement('div')
  logoDiv.classList.add('title-name')
  logoDiv.innerHTML = `<a href ='../html_files/index.html'><h2> STUDERIENCE </h2></a>`
  return logoDiv
}

function createSearch () {
  let searchDiv = createElement('div')
  searchDiv.classList.add('search')

  searchDiv.innerHTML = `<i class="fa-solid fa-magnifying-glass"> </i>`

  searchDiv.addEventListener('click', function () {
    if (searchDiv.classList.contains('active')) {
      searchDiv.innerHTML = `<i class="fa-solid fa-magnifying-glass"> </i>`
      searchDiv.classList.remove('active')
      selectElement('.searchBarcontainer').classList.remove('active')
      clearResults('.search-result')
      selectElement('#searchInputBar').value = ''
      selectElement("main").style.opacity = "1"
    } else {
      searchDiv.classList.add('active')
      selectElement('.searchBarcontainer').classList.add('active')
      selectElement("main").style.opacity = "0.3"
    }
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
  let lightHeart = createElement('div')
  lightHeart.classList.add('my-likes')
  lightHeart.innerHTML = '<i class="fa-regular fa-heart"></i>'
  lightHeart.addEventListener('click', function () {
    changeClassOnLikeContainer(document.getElementById('like-container'))
  })
  return lightHeart
}

function createDarkHeart () {
  let darkHeart = createElement('div')
  darkHeart.classList.add('my-likes')
  darkHeart.innerHTML = '<i class="fa-solid fa-heart"> </i>'
  darkHeart.addEventListener('click', function () {
    changeClassOnLikeContainer(document.getElementById('like-container'))
  })

  return darkHeart
}

function createBurgerItems () {
  let burgerItems = [
    {
      text: 'Utbyteslivet',
      url: '../html_files/info.html'
    },
    {
      text: 'Världsdelar och länder',
      url: '../html_files/continent.html'
    },
    {
      text: 'Ämnen',
      url: '../html_files/fields.html'
    },
    {
      text: 'Program',
      url: '../html_files/filter.html'
    },
    {
      text: 'Om oss',
      url: '../html_files/about.html'
    }
  ]
  let burgerContainer = createElement('div')
  burgerContainer.classList.add('burger-container', 'burger-hidden')
  for (let item of burgerItems) {
    let burgerItem = createElement('div')
    burgerItem.classList.add('burger-list')
    burgerItem.innerHTML = `<a href = "${item.url}">${item.text}</a> `
    burgerContainer.appendChild(burgerItem)
  }
  selectElement('header').appendChild(burgerContainer)
  return burgerContainer
}
