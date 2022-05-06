let array = ["hej", "hej"]

function likedPrograms (likedArray) {
    let likeContainer = document.createElement("div")
    likeContainer.classList.add("container-hidden")
    document.querySelector("body").appendChild(likeContainer)
    
    if (likedArray.length > 0){
        for (let liked of likedArray){
            let likedItem = document.createElement("div")
            likedItem.innerHTML = `${liked}`
            likeContainer.appendChild(likedItem)
        }
    } else {
        console.log("finns inga liked")
    }
}

likedPrograms(array)