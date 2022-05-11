document.querySelector('header').appendChild(buildTopMenu(array))
document.querySelector('header').appendChild(createBurgerItems())

function createFieldView () {
  let fieldContainer = document.createElement('div')
  document.querySelector('main').appendChild(fieldContainer)
  fieldContainer.classList.add('fields-container')
  
  for (let field of DB.FIELDS) {
    let fieldDiv = document.createElement('div')
    fieldDiv.classList.add('field-div')
    // div class field-img, ska sedan vara en bild. Vet ej vilken.
    // behöver även länka knapparna.
    fieldDiv.innerHTML = `
    <div class="field-img"></div>
    <h3 class="field-name">${field.name}</h3>
    <p class="field-text">${field.text}</p>
    <a href="../html_files/filter.html?field=${field.id}"><button class="field-button">${'Se alla program'}</button></a>`
    fieldContainer.appendChild(fieldDiv)
  }
}

document.querySelector("footer").appendChild(footer())
createFieldView()
