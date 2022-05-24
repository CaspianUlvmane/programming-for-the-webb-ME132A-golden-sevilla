window.onload = function () {
  selectElement('footer').appendChild(footer())
  buildTopMenu()
  likedPrograms()

  searchBar()
  closeSearchInSearch()
  // eventListneter of the input that listen to the keyup and calls the function searching
  selectElement('#searchInputBar').addEventListener('keyup', searchingInSearch)
}

// document.querySelector('header').appendChild(buildTopMenu(array))
// document.querySelector('header').appendChild(buildTopMenu())
// document.querySelector('header').appendChild(createBurgerItems())

// searchBar()
// closeSearchInSearch()
// cleanSearch()
// selectElement("#searchInputBar").addEventListener("keyup", searchingInSearch)

// buildFilterButtons()
// renderPrograms ()
