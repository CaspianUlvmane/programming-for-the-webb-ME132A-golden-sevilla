function footer(){
    let footerDiv = document.createElement("div")

    footerDiv.innerHTML = `
        <h3> <a href = index.HTML> STUDERIENCE </a> </h3> 
        <p> info.studerience.com</p>
        <p><a href = info.html> Utbyteslivet </a></p>
        <p><a href = continents.html> Världsdelar och länder </a></p>
        <p><a href = fields.html> Ämnen </a></p>
        <p><a href = about.html> Om oss </a></p>
        <p> Copyright</p>`
    return footerDiv
}

document.querySelector("body").appendChild(footer())