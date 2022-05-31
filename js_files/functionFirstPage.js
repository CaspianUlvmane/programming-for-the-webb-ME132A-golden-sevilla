// down button scroll down
selectElement('#scroll-down').addEventListener('click', function () {
  selectElement('#img-slide-box').scrollIntoView({ behavior: 'smooth' })
})

// makes the country slide
function buildImgCountryCard () {
  let imgBox = createElement('div')
  selectElement('#img-slide-box').appendChild(imgBox)
  imgBox.id = 'img-box'

  function findCountry (id) {
    return DB.COUNTRIES.filter(country => country.id == id)[0]
  }

  function getCountry (id) {
    return findCountry(id)
      .name.split(' ')
      .join('_')
      .toLowerCase()
  }

  for (let i = 0; i < DB.COUNTRIES.length; i++) {
    let img = createElement('div')
    imgBox.appendChild(img)
    img.classList.add('img-slide')
    img.style.backgroundImage = `url(../Databasen/Images/${getCountry(i).toLowerCase()}_normal_2.jpg)`

    let imgButton = createElement('button')
    img.appendChild(imgButton)
    imgButton.classList.add('img-slide-button')

    imgButton.innerHTML = ` <a href="../html_files/country.html?country=${
      findCountry(i).id
    }">${findCountry(i).name}</a>`
  }
}

// makes the filed slide
function buildImgFiledCard () {
  let imgBox = createElement('div')
  selectElement('#img-slideFields-box').appendChild(imgBox)
  imgBox.id = 'imgFields-box'

  function findFiled (id) {
    return DB.FIELDS.filter(filed => filed.id == id)[0]
  }

  function getFiled (id) {
    return findFiled(id).name
  }

  for (let i = 0; i < DB.FIELDS.length; i++) {
    let img = createElement('div')
    imgBox.appendChild(img)
    img.classList.add('img-slide')
    img.style.backgroundImage = `url(../Databasen/Images/field_pictures/${getFiled(i).toLowerCase()}.jpg)`

    let imgButton = createElement('button')
    img.appendChild(imgButton)
    imgButton.classList.add('img-slide-button')

    imgButton.innerHTML = ` <a href="../html_files/fields.html">${
      findFiled(i).name
    }</a>`
  }
}

buildImgCountryCard()
buildImgFiledCard()

document.querySelector('footer').appendChild(advertisement())
