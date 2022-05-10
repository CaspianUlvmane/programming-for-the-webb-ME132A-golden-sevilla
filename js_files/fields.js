function createFieldView () {
  let fieldContainer = document.createElement('div')
  document.querySelector('body').appendChild(fieldContainer)
  fieldContainer.classList.add('fields-container')

  for (let field of DB.FIELDS) {
    let fieldDiv = document.createElement('div')
    fieldDiv.classList.add('field-div')
    // div class field-img, ska sedan vara en bild. Vet ej vilken.
    // behöver även länka knapparna.
    fieldDiv.innerHTML = `
    <div class="field-img"></div>
    <h3>${field.name}</h3>
    <p>${field.text}</p>
    <button class="field-button">${'Se alla program'}</button>`
    fieldContainer.appendChild(fieldDiv)
  }
}

createFieldView()