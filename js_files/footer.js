function footer(){
    let footerDiv = document.createElement("div")
    footerDiv.id = "footer-div"

    footerDiv.innerHTML = `
        <a class="footer-title" href = index.HTML> STUDERIENCE </a> </h3> 
        <p class ="footer-item"> info.studerience.com</p>
        <a class ="footer-item" href = info.html> Utbyteslivet </a>
        <a class ="footer-item" href = continents.html> Världsdelar och länder </a>
        <a class ="footer-item" href = fields.html> Ämnen </a>
        <a class ="footer-item" href = about.html> Om oss </a>
        <p class ="footer-copyright"> Copyright</p>`
        // bild istället för p här?
    return footerDiv
}


