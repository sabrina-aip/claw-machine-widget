// Declaring variables that select elements on the HTML page so that we can interact with the using code
var claw_el = document.querySelector("#claw")
var claw_hands_el = document.querySelector("#claw-hands")
var claw_rope_el = document.querySelector("#claw-rope")
var right_arrow_el = document.querySelector("#right-arrow")
var left_arrow_el = document.querySelector("#left-arrow")
var window_el = document.querySelector("#window")
var controls_el = document.querySelector("#controls")
var drop_el = document.querySelector("#drop")

// DO NOT CHANGE THESE VARIABLES
// They set up the limits of the claw machine movement 
const MAX_X = 240;
const MIN_X = 0;
var xTransf = 0;

// OPTIONAL VARIABLES TO CHANGE
// You can set up the odds for specific prizes here, you just need to make sure that all the odds together sum to exactly 1
const RARE_ODDS =.005
const COMMON_ODDS = .1
const LOSING_ODDS = 1 - (RARE_ODDS + (COMMON_ODDS*7)) // we multiply by 7 because there are 7 prizes with common odds
var winningOdds = {0:RARE_ODDS,1:COMMON_ODDS,2:COMMON_ODDS,3:COMMON_ODDS,4:COMMON_ODDS,5:COMMON_ODDS,6:COMMON_ODDS,7:COMMON_ODDS,8:.295}

// this tells the claw how to move when someone presses the right arrow button on the page
right_arrow_el.addEventListener("click", (e) => {
    if (xTransf < MAX_X) {
        xTransf += 40
    }
    claw_el.style.transform = `translateX(${xTransf}px)`
    claw_hands_el.style.transform = `rotate(15deg)`
    setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)
})

// this tells the claw how to move when someone presses the left arrow button on the page
left_arrow_el.addEventListener("click", (e) => {
    if (xTransf > MIN_X) {
        xTransf -= 40
    }
    claw_el.style.transform = `translateX(${xTransf}px)`
    claw_hands_el.style.transform = `rotate(-15deg)`
    setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)

})

// this mimics the ovements above but if people on desktop are physically pressing the arrows on their keyboard
document.addEventListener("keydown", (e) => {
    var code = e.key;
    if (code == 'ArrowLeft') {
        // Left
        if (xTransf > MIN_X) {
            xTransf -= 40
        }
        claw_el.style.transform = `translateX(${xTransf}px)`
        claw_hands_el.style.transform = `rotate(-15deg)`
        setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)
    }
    else if (code == 'ArrowRight') {
        // Right
        if (xTransf < MAX_X) {
            xTransf += 40
        }
        claw_el.style.transform = `translateX(${xTransf}px)`
        claw_hands_el.style.transform = `rotate(15deg)`
        setTimeout(()=> {claw_hands_el.style.transform = `rotate(0deg)`}, 500)
    }
    else if (code == 'ArrowDown' || code==" ") {
        // Down
        setTimeout(dropClaw, 500)
    }
})

// this tells the claw to drop when someone clicks the drop button of the page
drop_el.addEventListener("click", () => {
    setTimeout(dropClaw, 500)}
)

// this is telling the page how to animate the act of the claw dropping and then triggering the animation to pull up the prize
function dropClaw() {
    claw_rope_el.style.transform = `scale(1,4.9)`
    claw_hands_el.style.transform = `translateY(150px)`
    setTimeout(raiseClaw, 1000);
}

// this function selects the prize based on the odds we declared in the variables above
function selectWinner(spec){
    // Use the weights to randomly select a winning ball number
    var i, sum=0, r=Math.random();
    for (i in spec) {
      sum += spec[i];
      if (r <= sum) return i;
    }
}

function raiseClaw(){
    // we select the winner
    result = selectWinner(winningOdds);
    // we choose a unique ball preview aligned to that winning number
    claw_hands_el.src = `Assets/machine_imgs/ball${result}.svg`
    claw_rope_el.style.transform = `scale(1,1)`
    claw_hands_el.style.transform = `translateY(0px)`
    // we kill some time waiting for the claw machine animation to wrap up    
    setTimeout(()=> {
        window_el.style.transform = "translateY(10px)"
        window_el.style.opacity = "0";
        controls_el.style.transform = "translateY(10px)"
        controls_el.style.opacity = "0";
    }, 1000)
    // then we go to the results page
    setTimeout(endGame, 1500);
}

function endGame(){
    // stores the winning number to the session storage so we can pull it on the results page
    sessionStorage.setItem("result", result);
    // takes us to the results page
    window.location.replace("results.html");
}