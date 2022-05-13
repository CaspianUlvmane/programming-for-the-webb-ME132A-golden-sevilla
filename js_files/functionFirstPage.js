let downButton = document.querySelector("#scroll-down");

downButton.addEventListener("click", function () {
    document.querySelector("#text-info").scrollIntoView({behavior: "smooth"})
})

function setCityBackground (){

    let imgBox = document.createElement("div");
    document.querySelector("#img-slide-box").appendChild(imgBox)
    imgBox.id = "img-box";

    for (let i = 0; i < DB.COUNTRIES.length; i++) {
    
        let img = document.createElement("div");
        imgBox.appendChild(img)
        img.classList.add("img-slide");
        img.style.backgroundImage = `url(../Databasen/Images/${getCountry(i)}_normal_2.jpg)`

        let imgButton = document.createElement("button")
        img.appendChild(imgButton)
        imgButton.classList.add("img-slide-button")

        imgButton.innerHTML = ` <a href="../html_files/country.html?country=${findCountry(i).id}">${findCountry(i).name}</a>`
    }    
}

setCityBackground()

function findCountry (id) {
    return DB.COUNTRIES.filter((country) => country.id == id)[0]
}   

function getCountry (id) {
    return findCountry(id).name
}