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
    if ( search_icon.classList.contains("active") ) {
        search_icon.classList.remove("active")
        selectElement(".container").classList.remove("active")
        clearResults(".search-result")
        selectElement("#searchInputBar").value = ""
    } 
    else 
    {
        search_icon.classList.add("active")
        selectElement(".container").classList.add("active")
    }
})


// Creating the searchBar 
function searchBar () {
    let searchBarContainer = createElement("div")
    searchBarContainer.classList.add("container")

    let searchBarBox = createElement("div")
    searchBarBox.classList.add("searchBar")
    
    searchBarBox.innerHTML = `
    <div class="searchDiv">
        <div class="fa-solid fa-magnifying-glass iconSearch"></div>
        <input type="search" id="searchInputBar" placeholder="Search...">
        <div class="fa-solid fa-xmark iconCross"></div>
    </div>`

    searchBarContainer.append(searchBarBox)
    searchBarContainer.append(searchResultBox())
    document.body.append(searchBarContainer)
    
    return searchBarContainer
}

searchBar()

// close filterBox iconGlass press in search  
function closeSearchInSearch () {
    selectElement(".iconSearch").addEventListener("click", function() {
        search_icon.classList.remove("active")
        selectElement(".container").classList.remove("active")
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

closeSearchInSearch()
cleanSearch()



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
	let All = DB.COUNTRIES.concat(DB.FIELDS, DB.CITIES)

    // Calling for the function to clean out resultBox before running again 
    clearResults(".search-result");
    
    // if input value is more then 0
    if (valueOfSearchInput.length > 0) {
        // loop fro the array of all 
        for (let i = 0; i < All.length; i++) {
            // if something from all.name(WILL BE CHANGE TO TEXT ?) is included in the search And get that info  
            if (All[i].text.toLocaleLowerCase().includes(valueOfSearchInput.toLocaleLowerCase())) {
                // select the searchresult box and place the info from the search in the box 

                // !!!!! MAKE A FUNCTION TO GO FRO ALL LINKS TO GET TO RIGHT PAGE !!!!! 
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