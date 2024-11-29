// Declaring variables that select elements on the HTML page so that we can interact with the using code
var playAgain_el = document.querySelector("#play-again")
var download_el = document.querySelector("#download")
var window_el = document.querySelector("#result-window")
var result_img_el = document.querySelector("#result-image")

// Pulls the winning result information from the previous page to this one
var result = sessionStorage.getItem("result")

// this function tells the page to load up with the winning result
function loadPage() {
    window_el.style.opacity = "1"
    window_el.style.transform = "translateY(0px)"
    download_el.style.opacity = "1"
    playAgain_el.style.opacity = "1"
    result_img_el.src = `Assets/preview_imgs/preview${result}.png`
}

// this actually calls that loading function
loadPage();

// this tells the website to find the winning prize imagine and prompt the user to download if they hit the download button
download_el.addEventListener("click", () => {
    const link = document.createElement('a')
    link.href = `Assets/prize_imgs/prize${result}.jpeg` // this is where you can change the file type of the prize to something besides .jpeg
    link.download = `claw-machine-prize.jpeg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
})

// this tells the website to go back to the game page if the user hits the play again button
playAgain_el.addEventListener("click", ()=> {
    window.location.replace("game.html");
    window_el.style.opacity = "0"
    window_el.style.transform = "translateY(10px)"
    download_el.style.opacity = "0"
    playAgain_el.style.opacity = "0"
})