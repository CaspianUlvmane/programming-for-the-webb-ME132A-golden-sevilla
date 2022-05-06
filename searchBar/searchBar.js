// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

// cleans out the filter 
let clearResults = (element) => selectElement(element).innerHTML = "";

// to try with interact with navbar
let search_icon = document.querySelector(".search-icon"); 
// listener to display search bar 
search_icon.addEventListener("click", function () {
    if (search_icon.classList.contains("active")){
        search_icon.classList.remove("active")
        selectElement(".containerBar").classList.remove("active")
        clearResults(".search-result")
        selectElement("#searchInputBar").value = ""
    } else {
    search_icon.classList.add("active")
    selectElement(".containerBar").classList.add("active")
    }
})

searchBar()

// Creating the searchBar 
function searchBar () {
    let searchBarContainer = createElement("div")
    searchBarContainer.classList.add("containerBar")
    
    let searchBarBox = createElement("div")
    searchBarBox.classList.add("searchBar")
    
    searchBarBox.innerHTML = `
    <div class="searchDiv">
        <input type="search" id="searchInputBar" placeholder="Search...">
        <div class="fa-solid fa-magnifying-glass iconSearch"></div>
    </div>`

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

    // console.log(All)
    // Calling for the function to clean out resultBox before running again 
    clearResults(".search-result");
    
    // if input value is more then 0
    if (valueOfSearchInput.length > 0) {
        // loop fro the array of all 
        for (let i = 0; i < All.length; i++) {
        
            // if something from all.name(WILL BE CHANGE TO TEXT ?) is included in the search 
            // And get that info  
            if (All[i].text.toLocaleLowerCase().includes(valueOfSearchInput.toLocaleLowerCase())) {
                console.log(All)
                // select the searchresult box and place the info from the search in the box 
                // Make function to go fro all links to get to right page 
                selectElement(".search-result").innerHTML += `<a href=../country_code/country.html?country=${All[i].id}"> 
                <div class="result-box"> 
                    <h4 class="title"> ${All[i].name} </h4> 
                    <div class="textInfo">${All[i].text}</div>
                </div></a>`
            }
        }
    }
}


// eventListneter of the input that listen to the keyup and calls the function searching 
document.querySelector("#searchInputBar").addEventListener("keyup", searchingInSearch)