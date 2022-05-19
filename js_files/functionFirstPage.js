let downButton = selectElement('#scroll-down')

downButton.addEventListener('click', function () {
  selectElement('#img-slide-box').scrollIntoView({ behavior: 'smooth' })
})

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
  }

  for (let i = 0; i < DB.COUNTRIES.length; i++) {
    let img = createElement('div')
    imgBox.appendChild(img)
    img.classList.add('img-slide')
    img.style.backgroundImage = `url(../Databasen/Images/${getCountry(
      i
    )}_normal_2.jpg)`

    let imgButton = createElement('button')
    img.appendChild(imgButton)
    imgButton.classList.add('img-slide-button')

    imgButton.innerHTML = ` <a href="../html_files/country.html?country=${
      findCountry(i).id
    }">${findCountry(i).name}</a>`
  }
}

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
    img.style.backgroundImage = `url(../Databasen/Images/field_pictures/${getFiled(
      i
    )}.jpg)`

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
