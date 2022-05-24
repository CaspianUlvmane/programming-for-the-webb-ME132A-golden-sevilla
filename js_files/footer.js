function footer () {
  let footerDiv = createElement('div')
  footerDiv.id = 'footer-div'

  footerDiv.innerHTML = `
        <a class="footer-title" href = index.HTML> STUDERIENCE </a> </h3> 
        <p class ="footer-item"> info.studerience.com</p>
        <a class ="footer-item" href = info.html> Utbyteslivet </a>
        <a class ="footer-item" href = continent.html> Världsdelar och länder </a>
        <a class ="footer-item" href = fields.html> Ämnen </a>
        <a class ="footer-item" href = about.html> Om oss </a>
        <p class ="footer-copyright"> Copyright</p>`

  return footerDiv
}

// down below is all functions for advertising

function advertisement () {
  // adverstise for våningen och villan
  let adContainer = document.createElement('div')
  adContainer.classList.add('ad-container')

  let cross = document.createElement('div')
  cross.innerHTML = `<i class="fa-solid fa-xmark adCross"></i>`
  // advertising div dissapears when click on cross
  cross.addEventListener('click', function () {
    adContainer.style.display = 'none'
  })

  let adContainerText = document.createElement('div')
  adContainerText.classList.add('ad-info')
  adContainerText.innerHTML = `
  <div></div>
  <p>Annons</p>`
  adContainer.append(cross)
  adContainer.append(adContainerText)

  let adBox = document.createElement('div')
  adBox.classList.add('ad-box')
  adBox.innerHTML = `
  <h5>FLYTTA TILL SOLEN</h5>
  <p> Bo i spaninen? Våra svenska mäklare i Marbella hjälper dig att hitta hem</p>
  <img src="../Databasen/Images/ad1.png"></img>`

  adContainer.appendChild(adBox)

  return adContainer
}

// advertise for sas
function adverstisement2 () {
  let adContainer = document.createElement('div')
  adContainer.classList.add('sas-ad')

  let cross = document.createElement('div')
  cross.innerHTML = `<i class="fa-solid fa-xmark adCross"></i>`
  cross.addEventListener('click', function () {
    adContainer.style.display = 'none'
  })

  adContainer.innerHTML = `
  <p> Sponsrad av sas</p>`
  adContainer.appendChild(cross)

  return adContainer
}

// advertise for Min Doktor
function adverstisement3 () {
  let adContainer = document.createElement('div')
  adContainer.classList.add('doktor-ad')

  let cross = document.createElement('div')
  cross.innerHTML = `<i class="fa-solid fa-xmark adCross"></i>`
  cross.addEventListener('click', function () {
    adContainer.style.display = 'none'
  })

  adContainer.innerHTML = `
  <p> Sponsrad av Min Doktor</p>`
  adContainer.appendChild(cross)

  return adContainer
}

// advertising for hotels.com
function adverstisement4 () {
  let adContainer = document.createElement('div')
  adContainer.classList.add('hotels-ad')

  let cross = document.createElement('div')
  cross.innerHTML = `<i class="fa-solid fa-xmark adCross"></i>`
  cross.addEventListener('click', function () {
    adContainer.style.display = 'none'
  })

  adContainer.innerHTML = `
  <p> Sponsrad av Hotels.com</p>`
  adContainer.appendChild(cross)

  return adContainer
}
