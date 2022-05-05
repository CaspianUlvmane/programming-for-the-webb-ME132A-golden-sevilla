document.querySelector('body').appendChild(createBurgerItems())

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
  for (let item of burgerItems) {
    let burgerItem = document.createElement('div')
    burgerItem.innerHTML = `<a href = "${item.url}">${item.text}</a> `
    burgerContainer.appendChild(burgerItem)
  }
  return burgerContainer
}
