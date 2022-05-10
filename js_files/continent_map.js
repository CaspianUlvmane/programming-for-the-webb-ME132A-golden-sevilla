function createContinentMap(){
    let mapContainer = document.getElementById("world-map")
    mapContainer.addEventListener("click", changeImg)
    mapContainer.addEventListener("mousemove", logKey)

    return mapContainer
}

createContinentMap()

function logKey(e){
    let info = document.getElementById("position")
    info.innerHTML =`${e.offsetX}, ${e.offsetY}`
}


function changeImg (e){

    if (e.offsetX > 100 && e.offsetX <200 && e.offsetY > 65 && e.offsetY < 190){
        document.getElementById("world-map").src = "Nordamerika.copy.svg"
        document.getElementById("info-div").innerHTML = "Välj land"
    } else if (e.offsetX > 330 && e.offsetX <420 && e.offsetY > 48 && e.offsetY < 140){
        document.getElementById("world-map").src = "Europa-2.svg"
        document.getElementById("info-div").innerHTML = "Välj land"
        // if(e.offsetX >)
    }
}