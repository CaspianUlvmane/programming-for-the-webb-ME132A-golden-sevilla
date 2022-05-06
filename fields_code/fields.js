function createFieldView () {
  let fieldContainer = document.createElement('div')
  document.querySelector('body').appendChild(fieldContainer)

  for (let field of DB.FIELDS) {
    let fieldDiv = document.createElement('div')
    fieldDiv.innerHTML = `${field.name} + ${field.text}`
    fieldContainer.appendChild(fieldDiv)
  }
}

createFieldView()
