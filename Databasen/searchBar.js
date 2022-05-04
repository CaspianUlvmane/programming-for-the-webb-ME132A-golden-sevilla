// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

// cleans out the filter 
let clearResults = () => selectElement(".search-result").innerHTML = "";

// Creating the searchBar 
function searchBar () {
    let searchBarContainer = createElement("div")
    searchBarContainer.classList.add("containerBar") // displayNone
    
    let searchBarBox = createElement("div")
    searchBarBox.classList.add("searchBar")
    
    searchBarBox.innerHTML = `
    <input type="search" id="searchInputBar" placeholder="Search...">
    <div class="fa-solid fa-magnifying-glass"></div>
    `

    searchBarContainer.append(searchBarBox)
    document.body.append(searchBarContainer)
    searchResultBox()
    
    return searchBarContainer
}

// create the resultBox of the search 
function searchResultBox () {
    let resultBox = createElement("div")
    resultBox.classList.add("search-result")
    document.body.append(resultBox)
}

// getting the search function
function searchingInSearch () {
    // getting the value of the input
    let valueOfSearchInput = selectElement("#searchInputBar").value
    
    // Making a array of countrys, fields and cities
	let All = DB.COUNTRIES.concat(DB.FIELDS, DB.CITIES)

    // Calling for the function to clean out resultBox before running again 
    clearResults();

    // if input value is more then 0
    if (valueOfSearchInput.length > 0) {
        // loop fro the array of all 
        for (let i = 0; i < All.length; i++) {

            // if something from all.name(WILL BE CHANGE TO TEXT ?) is included in the search 
            // And get that info  
            if (All[i].name.toLocaleLowerCase().includes(valueOfSearchInput.toLocaleLowerCase())) {
                // select the searchresult box and place the info from the search in the box 
                selectElement(".search-result").innerHTML += `<div class="search-div"> 
                <div class="title"> ${All[i].name} </div> 
                <div class="textInfo">${All[i].text}</div>
                </div
                `
            }
        }
    }
}

searchBar()

// eventListneter of the input that listen to the keyup and calls the function searching 
document.querySelector("#searchInputBar").addEventListener("keyup", searchingInSearch)