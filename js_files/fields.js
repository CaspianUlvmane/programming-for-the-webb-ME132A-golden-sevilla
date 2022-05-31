function createFieldView () {
  let fieldContainer = createElement('div')
  selectElement('main').appendChild(fieldContainer)
  fieldContainer.classList.add('fields-container')

  for (let field of DB.FIELDS) {
    let fieldDiv = createElement('div')
    fieldDiv.classList.add('field-div')

    fieldDiv.innerHTML = `
    <div class="field-img"><img src="../Databasen/Images/field_pictures/${
      field.name.toLowerCase()
    }.jpg"></div>
    <h3 class="field-name">${field.name}</h3>
    <p class="field-text">${field.text}</p>
    <a href="../html_files/filter.html?field=${
      field.id
    }"><button class="field-button">${'Se alla program'}</button></a>`
    fieldContainer.appendChild(fieldDiv)
  }
}

document.querySelector('footer').appendChild(advertisement())

createFieldView()
likedPrograms()
