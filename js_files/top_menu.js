// select element
let selectElement = select => document.querySelector(select)

// creates a element
let createElement = element => document.createElement(element)

// function that builds the top menu
function buildTopMenu () {
  // stores liked items in variable
  // concats array with stored items
  let storedLikedArray = JSON.parse(localStorage.getItem('likedArray'))

  // select header to be able to append top menu  to it
  // "" = empties the header when called

  let header = selectElement('header')
  header.innerHTML = ''
  // the top menu div creates - and all functions appends to it
  let topMenu = createElement('div')
  topMenu.id = 'nav'
  topMenu.appendChild(createBurger())
  topMenu.appendChild(createLogo())
  topMenu.appendChild(createSearch())

  // makes sure that the stored array is an array
  if (storedLikedArray == null) {
    storedLikedArray = []
  }
  // sets the heart to correct color, based on liked items
  if (storedLikedArray.length > 0) {
    topMenu.appendChild(createDarkHeart())
  } else {
    topMenu.appendChild(createLightHeart())
  }
  // calls for the burger dropdown that has display none
  createBurgerItems()
  header.appendChild(topMenu)
}

// function that creates the burger
function createBurger () {
  let burgerDiv = createElement('div')
  burgerDiv.classList.add('hamburger')
  burgerDiv.innerHTML = `
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
  `
  // when clicked, the class burger-hidden removes - we now se the burger drop down
  // and the burger gets the class active, that changes the icon to a cross
  burgerDiv.addEventListener('click', function () {
    selectElement('.burger-container').classList.toggle('burger-hidden')
    burgerDiv.classList.toggle(`active`)
    // Changes the opacity on main when active, when the drop down is down
    if (burgerDiv.classList.contains(`active`)) {
      selectElement('main').style.opacity = '0.3'
    } else {
      selectElement('main').style.opacity = '1'
    }
  })
  return burgerDiv
}
// function that creates the logotype in the middle of top menu
function createLogo () {
  let logoDiv = createElement('div')
  logoDiv.classList.add('title-name')
  logoDiv.innerHTML = `<a href ='../html_files/index.html'><h2> STUDERIENCE </h2></a>`
  return logoDiv
}
// function that creates the search
function createSearch () {
  let searchDiv = createElement('div')
  searchDiv.classList.add('search')
  // adds icon
  searchDiv.innerHTML = `<i class="fa-solid fa-magnifying-glass"> </i>`
  // when clicked, se if class search has class active
  // if class active - remove active
  searchDiv.addEventListener('click', function () {
    if (searchDiv.classList.contains('active')) {
      // removes active from .search
      searchDiv.classList.remove('active')
      // removes container for drop down search field
      selectElement('.searchBarcontainer').classList.remove('active')
      // clears results, empty input field and turns the opacity back to 100%
      clearResults('.search-result')
      selectElement('#searchInputBar').value = ''
      selectElement('main').style.opacity = '1'
    } else {
      // if .search is not active - make active
      // add .active to .searchBarcontainer to make it visible
      // and turn down opacity on main
      searchDiv.classList.add('active')
      selectElement('.searchBarcontainer').classList.add('active')
      selectElement('main').style.opacity = '0.3'
    }
  })
  return searchDiv
}
// Tror vi ersatte denna, men avvaktar tills vi ser om något händer när vi avkommenterat.
// Kan dock inte se att vi kallar på den någonstans, rätta mig om jag har fel.

// function changeClass (element) {
//   if (element.classList.contains('close')) {
//     element.classList.remove('close')
//   } else {
//     element.classList.add('close')
//   }
// }

// function that creates light heart, is called on if array of liked programes is 0
function createLightHeart () {
  let lightHeart = createElement('div')
  lightHeart.classList.add('my-likes')
  // adds icon
  lightHeart.innerHTML = '<i class="fa-regular fa-heart"></i>'
  // when clicked, change class on .like-container
  // if hidden, make visible and vice versa
  lightHeart.addEventListener('click', function () {
    changeClassOnLikeContainer(document.getElementById('like-container'))
  })
  return lightHeart
}
// function that creates dark heart, is called on if array of liked programes is more then 0
function createDarkHeart () {
  let darkHeart = createElement('div')
  darkHeart.classList.add('my-likes')
  darkHeart.innerHTML = '<i class="fa-solid fa-heart"> </i>'
  darkHeart.addEventListener('click', function () {
    changeClassOnLikeContainer(document.getElementById('like-container'))
  })

  return darkHeart
}
// function that creates drop down menu and its items
function createBurgerItems () {
  // creates array of items
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
  // creates the container and gives it a class
  let burgerContainer = createElement('div')
  burgerContainer.classList.add('burger-container', 'burger-hidden')
  // loops through all the items
  for (let item of burgerItems) {
    // for each item - create div, add innerHTML and append it to container
    let burgerItem = createElement('div')
    burgerItem.classList.add('burger-list')
    burgerItem.innerHTML = `<a href = "${item.url}">${item.text}</a> `
    burgerContainer.appendChild(burgerItem)
  }
  // append container to header
  selectElement('header').appendChild(burgerContainer)
  return burgerContainer
}
