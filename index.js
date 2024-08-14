// Root Var
var root = document.querySelector(":root")
var activeColor1 = document.querySelectorAll(".active-color")[0]
var activeColor2 = document.querySelectorAll(".active-color")[1]
// var activeColor3 = document.querySelectorAll(".active-color")[2]
var activeColors = [activeColor1, activeColor2]

// Make sure active colors are set correctly because html cannot read css vars
// activeColors[0].setAttribute("value", (getComputedStyle(root).getPropertyValue('--dc1')))
// activeColors[1].setAttribute("value", (getComputedStyle(root).getPropertyValue('--dc2')))
// activeColors[0].nextElementSibling.innerHTML =  getComputedStyle(root).getPropertyValue('--dc1')
// activeColors[0].nextElementSibling.innerHTML =  getComputedStyle(root).getPropertyValue('--dc2')

// Update colors on input change

for (i of activeColors) {
  var z = Number((i.id).slice(-1))
  i.setAttribute("value", (getComputedStyle(root).getPropertyValue(`--dc${z}`)))
  i.nextElementSibling.innerHTML = getComputedStyle(root).getPropertyValue(`--dc${z}`)
  i.addEventListener("input", (event) => {
    var z = Number((event.target.id).slice(-1))
    // event.target.style.backgroundColor = event.target.value
    var updateColorConstructor = []; updateColorConstructor[z-1] = event.target.value;
    updateColor(updateColorConstructor)
  })
}

// Check for touchscreen and adjsut control
if ('ontouchstart' in document.documentElement) {
  document.getElementById("mobile-touch-area").addEventListener("touchstart", (e) => {
    updateColor([randomColor(), randomColor()])
  });
}

document.addEventListener("keydown", (e) =>{
  console.log(e.key)
  if ((e.key).toLowerCase() == " ") {
    updateColor([randomColor(), randomColor()])
  } else if ((e.key).toLowerCase() == "arrowleft") {

  } else if ((e.key).toLowerCase() == "arrowright") {

  } else if ((e.key).toLowerCase() == "arrowup") {

  } else if ((e.key).toLowerCase() == "arrowdown") {

  } else {

  }
})

var hexComponent = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A","B","C","D","E","F"]
function randomColor() {
  var result = "#"
  for (let i = 0; i <6; i++) {
    result += hexComponent[Math.floor(Math.random() * hexComponent.length)]
  }
  return result
}

function updateColor(colorArray) {
  for (i of colorArray){
    if (i) {
      root.style.setProperty(`--dc${colorArray.indexOf(i)+1}`, i)
      activeColors[colorArray.indexOf(i)].value = i
      activeColors[colorArray.indexOf(i)].nextElementSibling.innerHTML = i
    }
  }
}

var navStatus = false
var tntl = gsap.timeline()
function toggleNav() {
  if (navStatus) {
    // gsap.to(".nav-button", {yPercent: -300, duration: .2, ease:"ease", stagger: .1}, "<0")
    tntl.reverse()
    gsap.to("#toggle-nav span", {yPercent: 0, duration: .2, ease: "ease"})
    navColor(true)
    navStatus = false
  } else {
    tntl.to(".nav-button", {y: 0, duration: .25, ease:"ease", stagger: .1}, "<0")
    tntl.play()
    gsap.to("#toggle-nav span", {yPercent: 100, duration: .25, ease: "ease"})
    navStatus = true
  }
}

if (window.matchMedia("(max-width: 600px)").matches) {
  // FIRST STEP
  // TODO: change first tween in timeline with:
  // .to('.box', {scale: 1.2})
}



function navFullscreen() {
  var body = document.querySelector("body")
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) { /* Safari */
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) { /* IE11 */
    body.msRequestFullscreen();
  }

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

var navColorStatus = false
var nctl = gsap.timeline()
function navColor(overrideOff = false) {
  if(navColorStatus || overrideOff) {
    document.getElementById("nav-color-button").style.backgroundColor = ""
    document.getElementById("nav-color-button").style.color = ""
    document.getElementById("nav-color-dropdown").style.transform = ""
    document.getElementById("nav-color-dropdown").style.opacity = ""
    navColorStatus = false
  } else {
    document.getElementById("nav-color-button").style.backgroundColor = "var(--dc1)"
    document.getElementById("nav-color-button").style.color = "var(--dc2)"
    document.getElementById("nav-color-dropdown").style.transform = "translateX(0)"
    document.getElementById("nav-color-dropdown").style.opacity = "1"
    navColorStatus = true
  }
}

var navColorAdvStatus = false
var anctl = gsap.timeline({paused: true, defaults: {ease: 'ease', duration: .5}})
anctl.to("#nav-color-dropdown", {height: '12rem'})
anctl.to("#nav-color-dropdown .active-color-bg", {width: '8rem', height: '13rem'}, "<0")
anctl.to("#nav-color-dropdown .active-color-bg span", {display: "block"}, "<0")
anctl.to("#nav-color-dropdown .active-color-bg span", {y: 0},)

// anctl.pause()
function navColorAdv(overrideOff = false) {
  if(navColorAdvStatus || overrideOff) {
    anctl.reverse() 
    navColorAdvStatus = false
  } else {
    anctl.play() 
    navColorAdvStatus = true
  }
  // document.getElementById("nav-color-dropdown").classList.add('color-adv')
}

// FOR TESTING NAV
// toggleNav()
// navColor()

// Version
var version = "0.01" // -- 08/28/2024 08:40:27 PM --
var releaseVersion = "0.01a" 
// -- Release Notes --
// inital use of versioning

// To Work On
// 
// 

// Fill versions with version
for (v of document.querySelectorAll(".version")) {
  v.innerHTML = releaseVersion
}
