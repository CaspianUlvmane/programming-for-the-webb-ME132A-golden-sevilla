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
  console.log(burgerItems)
  let burgerContainer = document.createElement('div')
  burgerContainer.classList.add("burger-container")
  for (let item of burgerItems) {
    let burgerItem = document.createElement('div')
    burgerItem.classList.add("burger-list")
    burgerItem.innerHTML = `<a href = "${item.url}">${item.text}</a> `
    burgerContainer.appendChild(burgerItem)
  }
  document.querySelector('body').appendChild(burgerContainer)
  // return burgerContainer
}
