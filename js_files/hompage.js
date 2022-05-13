document.querySelector("footer").appendChild(footer())
buildTopMenu()

// document.querySelector('header').appendChild(buildTopMenu(array))
// document.querySelector('header').appendChild(buildTopMenu())
// document.querySelector('header').appendChild(createBurgerItems())
likedPrograms()


let downButton = document.querySelector("#scroll-down");

downButton.addEventListener("click", function () {
    document.querySelector("#text-info").scrollIntoView({behavior: "smooth"})
})