// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

// cleans out the filter 
let clearResults = (element) => selectElement(element).innerHTML = "";

// to try with interact with navbar
let search_icon = selectElement(".search"); 

// Creating the searchBar 
function searchBar () {
    let searchBarContainer = createElement("div")
    searchBarContainer.classList.add("searchBarcontainer")

    let searchBarBox = createElement("div")
    searchBarBox.classList.add("searchBar")
    
    searchBarBox.innerHTML = `
    <div class="searchfieldBox">
        <div class="fa-solid fa-magnifying-glass iconSearch"></div>
        <input type="search" id="searchInputBar" placeholder="Search...">
        <div class="fa-solid fa-xmark iconCross"></div>
    </div>`

    searchBarContainer.append(searchBarBox)
    searchBarContainer.append(searchResultBox())
    selectElement("header").append(searchBarContainer)
    
    return searchBarContainer
}

// close filterBox iconGlass press in search  
function closeSearchInSearch () {
    selectElement(".iconSearch").addEventListener("click", function() {
        search_icon.classList.remove("active")
        selectElement(".search").innerHTML =  `<i class="fa-solid fa-magnifying-glass"> </i>`
        selectElement(".searchBarcontainer").classList.remove("active")
        clearResults(".search-result")
        selectElement("#searchInputBar").value = ""
    })
}
// cleans out by pressing x in search
function cleanSearch () {
    selectElement(".iconCross").addEventListener("click", function() {
        selectElement("#searchInputBar").value = ""
        clearResults(".search-result")
    })
} 

// create the resultBox of the search 
function searchResultBox () {
    let resultBox = createElement("div")
    resultBox.classList.add("search-result")
    return resultBox
}

// getting the search function
function searchingInSearch () {
    // getting the value of the input
    let valueOfSearchInput = selectElement("#searchInputBar").value
    
    // Making a array of countrys, fields and cities
	// let All = DB.COUNTRIES.concat(DB.FIELDS, DB.CITIES)
    let countrys = DB.COUNTRIES 
    let fields = DB.FIELDS 
    let cityies = DB.CITIES 

    // Calling for the function to clean out resultBox before running again 
    clearResults(".search-result");
    
    // if input value is more then 0
    if (valueOfSearchInput.length > 0) {
    //     // loop fro the array of all 
        for ( let conutry of countrys ) {
            if (conutry.text.toLocaleLowerCase().includes(valueOfSearchInput.toLocaleLowerCase())) {
                selectElement(".search-result").innerHTML += `<a href=../html_files/country.html?country=${conutry.id}"> 
                <div class="result-box"> 
                    <h4 class="titleInfoSearch"> ${conutry.name} </h4> 
                    <div class="textInfoSearch">${conutry.text}</div>
                </div></a>`
            }
        }
        for ( let field of fields ) {
            if (field.text.toLocaleLowerCase().includes(valueOfSearchInput.toLocaleLowerCase())) {
                selectElement(".search-result").innerHTML += `<a href="../html_files/filter.html?field=${field.id}"> 
                <div class="result-box"> 
                    <h4 class="titleInfoSearch"> ${field.name} </h4> 
                    <div class="textInfoSearch">${field.text}</div>
                </div></a>`
            }
        }
        for ( let city of cityies ) {
            if (city.text.toLocaleLowerCase().includes(valueOfSearchInput.toLocaleLowerCase())) {
                selectElement(".search-result").innerHTML += `<a href="../html_files/filter.html?city=${city.id}">
                <div class="result-box"> 
                    <h4 class="titleInfoSearch"> ${city.name} </h4> 
                    <div class="textInfoSearch">${city.text}</div>
                </div></a>`
            }
        }
    }
}

searchBar()
closeSearchInSearch()
cleanSearch()

// eventListneter of the input that listen to the keyup and calls the function searching 
selectElement("#searchInputBar").addEventListener("keyup", searchingInSearch)