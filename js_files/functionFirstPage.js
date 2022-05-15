let downButton = document.querySelector("#scroll-down");

downButton.addEventListener("click", function () {
    document.querySelector("#img-slide-box").scrollIntoView({behavior: "smooth"})
})

function buildImgCountryCard (){
    let imgBox = document.createElement("div");
    document.querySelector("#img-slide-box").appendChild(imgBox)
    imgBox.id = "img-box";
    
    function findCountry (id) {
        return DB.COUNTRIES.filter((country) => country.id == id)[0]
    }   
    
    function getCountry (id) {
        return findCountry(id).name
    }

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

function buildImgFiledCard (){
    let imgBox = document.createElement("div");
    document.querySelector("#img-slideFields-box").appendChild(imgBox)
    imgBox.id = "imgFields-box";
    
    function findFiled (id) {
        return DB.FIELDS.filter((filed) => filed.id == id)[0]
    }   
    
    function getFiled (id) {
        console.log(findFiled(id).name)
        return findFiled(id).name
    }

    for (let i = 0; i < DB.FIELDS.length; i++) {
        let img = document.createElement("div");
        imgBox.appendChild(img)
        img.classList.add("img-slide");
        img.style.backgroundImage = `url(../Databasen/Images/field_pictures/${getFiled(i)}.jpg)`

        let imgButton = document.createElement("button")
        img.appendChild(imgButton)
        imgButton.classList.add("img-slide-button")

        imgButton.innerHTML = ` <a href="../html_files/fields.html">${findFiled(i).name}</a>`
    }    
}

buildImgCountryCard()
buildImgFiledCard()

