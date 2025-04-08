// Root Var
var root = document.querySelector(":root")
var activeColor1 = document.querySelectorAll(".active-color")[0]
var activeColor2 = document.querySelectorAll(".active-color")[1]
// var activeColor3 = document.querySelectorAll(".active-color")[2]
var activeColors = [activeColor1, activeColor2]
var ratioThreshold = .5

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

// Check for touchscreen and adjust control
if ('ontouchstart' in document.documentElement) {
  document.getElementById("mobile-touch-area").addEventListener("touchstart", (e) => {
    updateColor([randomColor(), randomColor()])
  });
}

document.addEventListener("keydown", (e) =>{
  // console.log(e.key)
  if ((e.key).toLowerCase() == " ") {
    document.getElementById('tb-spacebar').style.backgroundColor = "var(--dc1)"
    document.getElementById('tb-spacebar').style.color = "var(--dc2)"
    c1 = randomColor(); c2 = randomColor()
    while (checkContrast(c1, c2) > ratioThreshold) {
      c1 = randomColor(); c2 = randomColor()
    }
    updateColor([c1, c2])
  } else if ((e.key).toLowerCase() == "arrowleft" || (e.key).toLowerCase() == "a") {
    document.getElementById('tb-a').style.backgroundColor = "var(--dc1)"
    document.getElementById('tb-a').style.color = "var(--dc2)"
  } else if ((e.key).toLowerCase() == "arrowright" || (e.key).toLowerCase() == "d") {
    document.getElementById('tb-d').style.backgroundColor = "var(--dc1)"
    document.getElementById('tb-d').style.color = "var(--dc2)"
  } else if ((e.key).toLowerCase() == "arrowup" || (e.key).toLowerCase() == "w") {
    document.getElementById('tb-w').style.backgroundColor = "var(--dc1)"
    document.getElementById('tb-w').style.color = "var(--dc2)"
  } else if ((e.key).toLowerCase() == "arrowdown" || (e.key).toLowerCase() == "s") {
    document.getElementById('tb-s').style.backgroundColor = "var(--dc1)"
    document.getElementById('tb-s').style.color = "var(--dc2)"
  } else {

  }
})

document.addEventListener("keyup", (e) => {
  if ((e.key).toLowerCase() == " ") {
    document.getElementById('tb-spacebar').style.backgroundColor = "var(--dc2)"
    document.getElementById('tb-spacebar').style.color = "var(--dc1)"
  } else if ((e.key).toLowerCase() == "arrowleft" || (e.key).toLowerCase() == "a") {
    document.getElementById('tb-a').style.backgroundColor = "var(--dc2)"
    document.getElementById('tb-a').style.color = "var(--dc1)"
  } else if ((e.key).toLowerCase() == "arrowright" || (e.key).toLowerCase() == "d") {
    document.getElementById('tb-d').style.backgroundColor = "var(--dc2)"
    document.getElementById('tb-d').style.color = "var(--dc1)"
  } else if ((e.key).toLowerCase() == "arrowup" || (e.key).toLowerCase() == "w") {
    document.getElementById('tb-w').style.backgroundColor = "var(--dc2)"
    document.getElementById('tb-w').style.color = "var(--dc1)"
  } else if ((e.key).toLowerCase() == "arrowdown" || (e.key).toLowerCase() == "s") {
    document.getElementById('tb-s').style.backgroundColor = "var(--dc2)"
    document.getElementById('tb-s').style.color = "var(--dc1)"
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
      localStorage.setItem(`c${colorArray.indexOf(i)+1}`, i)
      activeColors[colorArray.indexOf(i)].value = i
      activeColors[colorArray.indexOf(i)].nextElementSibling.innerHTML = i
    }
  }
}

var localColors = [localStorage.getItem("c1"), localStorage.getItem("c2")]
updateColor(localColors)

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
    tntl.to(".nav-button", {x: 0, duration: .25, ease:"ease", stagger: .1}, "<0")
    tntl.play()
    gsap.to("#toggle-nav span", {yPercent: 100, duration: .25, ease: "ease"})
    navStatus = true
  }
}

var toolStatus = false
var ttl = gsap.timeline()
ttl.set(".tt-item", {yPercent: 50, opacity: 0}) 
function toggleToolTip() {
  toolStatus ? ttl.to(".tt-item", {yPercent: 50, opacity: 0, ease:"ease", stagger: -.15}) 
  :    ttl.to(".tt-item", {yPercent: 0, opacity: 1, ease:"ease", stagger: .15})
  toolStatus = !toolStatus 
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
// var nctl = gsap.timeline()
function navColor(overrideOff = false) {
  if(navColorStatus || overrideOff) {
    document.getElementById("nav-color-button").style.backgroundColor = ""
    document.getElementById("nav-color-button").style.color = ""
    document.getElementById("nav-color-dropdown").style.transform = ""
    document.getElementById("nav-color-dropdown").style.opacity = ""
    document.getElementById("nav-color-dropdown").style.maxHeight = ""
    document.getElementById("nav-color-dropdown").style.marginBottom = ""
    navColorStatus = false
  } else {
    document.getElementById("nav-color-button").style.backgroundColor = "var(--dc1)"
    document.getElementById("nav-color-button").style.color = "var(--dc2)"
    document.getElementById("nav-color-dropdown").style.transform = "translateX(0)"
    document.getElementById("nav-color-dropdown").style.opacity = "1"
    document.getElementById("nav-color-dropdown").style.maxHeight = "10rem"
    document.getElementById("nav-color-dropdown").style.marginBottom = ".75rem"
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

function checkContrast(c1, c2) {
  if (c1.length > 6 || c2.length > 6) {
    c1 = c1.replace("#", ""); c2 = c2.replace("#", "")
  }
    var c = [
      parseInt(c1.slice(0, 2), 16), parseInt(c1.slice(2, 4), 16), parseInt(c1.slice(4, 6), 16),
      parseInt(c2.slice(0, 2), 16), parseInt(c2.slice(2, 4), 16), parseInt(c2.slice(4, 6), 16)
    ].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
   l1 = c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
   l2 = c[3] * 0.2126 + c[4] * 0.7152 + c[5] * 0.0722;
  
   const ratio = l1 > l2 
    ? ((l2 + 0.05) / (l1 + 0.05))
    : ((l1 + 0.05) / (l2 + 0.05));

    const result = `
    AA-level large text: ${ratio < 1/3 ? '✓' : 'x' }
    AA-level small text: ${ratio < 1/4.5 ? '✓' : 'x' }
    AAA-level large text: ${ratio < 1/4.5 ? '✓' : 'x' }
    AAA-level small text: ${ratio < 1/7 ? '✓' : 'x' }
    Ratio: ${ratio}
   `;
   return ratio
}

// Version
var version = "0.03" // -- 04/08/2025 03:21 PM --
var releaseVersion = "0.02" 
// -- Release Notes --
// Made whole nav on left, restyled, and fixed the hover outside issue
// Added accessibility button + tooltip button
// Added tooltip functionality

// To Work On
// - Readability: Dyslexic mode? Contrast Mode, Larger text mode, color blind vision
// 

// Fill versions with version
for (v of document.querySelectorAll(".version")) {
  v.innerHTML = releaseVersion
}

