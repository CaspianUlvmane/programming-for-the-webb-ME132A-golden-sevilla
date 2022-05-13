// denna array ska sedan vara vår "likedArray".
// let array = []
// parametern array, ska vara "likedArray" sedan.

function buildTopMenu () {
  let header = document.querySelector("header")
  header.innerHTML = ""
  let topMenu = document.createElement('div')
  topMenu.id = 'nav'
  topMenu.appendChild(createBurger())
  topMenu.appendChild(createLogo())
  topMenu.appendChild(createSearch())
  
  if (array.length > 0) {
    topMenu.appendChild(createDarkHeart())
  } else {
    topMenu.appendChild(createLightHeart())
  }
  
  createBurgerItems ()
  header.appendChild(topMenu)
  // return topMenu
}
buildTopMenu ()

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
  logoDiv.innerHTML = `<a href ='../html_files/index.html'><h2> STUDERIENCE </h2></a>`
  return logoDiv
}


function createSearch () {
  let searchDiv = document.createElement('div')
  searchDiv.classList.add('search')

  searchDiv.innerHTML = `<i class="fa-solid fa-magnifying-glass"> </i>`
  
  searchDiv.addEventListener("click", function () {
    if ( searchDiv.classList.contains("active") ) {
      searchDiv.innerHTML = `<i class="fa-solid fa-magnifying-glass"> </i>`
      searchDiv.classList.remove("active")
      selectElement(".searchBarcontainer").classList.remove("active")
      clearResults(".search-result")
      selectElement("#searchInputBar").value = ""
    } else {
      searchDiv.innerHTML = `<i class="fa-solid fa-xmark"> </i>` 
      searchDiv.classList.add("active")
      selectElement(".searchBarcontainer").classList.add("active")
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
  let lightHeart = document.createElement('div')
  lightHeart.classList.add('my-likes')
  lightHeart.innerHTML = '<i class="fa-regular fa-heart"></i>'
  lightHeart.addEventListener("click", function () {
    changeClassOnLikeContainer(document.getElementById("like-container"))
  })
  return lightHeart
}

function createDarkHeart () {
  let darkHeart = document.createElement('div')
  darkHeart.classList.add('my-likes')
  darkHeart.innerHTML = '<i class="fa-solid fa-heart"> </i>'
  darkHeart.addEventListener("click", function () {
    changeClassOnLikeContainer(document.getElementById("like-container"))
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
  let burgerContainer = document.createElement('div')
  burgerContainer.classList.add('burger-container', 'burger-hidden')
  for (let item of burgerItems) {
    let burgerItem = document.createElement('div')
    burgerItem.classList.add('burger-list')
    burgerItem.innerHTML = `<a href = "${item.url}">${item.text}</a> `
    burgerContainer.appendChild(burgerItem)
  }
  document.querySelector('header').appendChild(burgerContainer)
  return burgerContainer
}
