// Refers to a selected element 
let selectElement = (select) => document.querySelector(select); 

// creates a element 
let createElement = (element) => document.createElement(element);

function testDontKeep () {
    let programs = DB.PROGRAMMES
    programs.forEach(program => {
        let button = createElement("button")
        button.innerHTML = program.name
        button.addEventListener("click", popUpProgram)
        document.body.append(button)
    });
}

testDontKeep()


function popUpProgram (event) {
    let programName = event.target.innerHTML
    DB.PROGRAMMES.find(program => program.name == programName)
    console.log(DB.PROGRAMMES.find(program => program.name == programName))
    let container = createElement("div")
    container.classList.add("container")
    document.body.append(container)

    return container
} 

function interactWithPop () {
    let barContainer = createElement("div")
    
}


