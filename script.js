
let buttons = document.getElementById("buttons")
let selected = document.querySelectorAll(".active a")[0];
buttons.onclick = function(event){
	let target = event.target;
	if (selected) {selected.parentNode.classList.remove("active")};
	if (target.tagName == "A") {
		selected = target
		target.parentNode.classList.add("active")
	}
}

var btnContainer = document.getElementById("buttons");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
} 

function doIt(type='portrait'){
  var something = Object.keys(images[type])
  var something2 = shuffle(something)
  var something3 = something2.slice(0,8)
  var something4 = something3.concat(something3)
  var something5 = shuffle(something4)
  return something5
}

window.onload = function(){
  for (let i = 0; i < 16; i++) {
    const card = document.createElement('li');
    const front = document.createElement('div');
    const back = document.createElement('div');
    card.classList.add('portrait');
    front.classList.add('front');
    back.classList.add('back');
    let temp = doIt()
    back.style.backgroundImage = `url('portrait/${temp[i]}.jpg')`;
    card.dataset.name = temp[i]
    document.getElementById('game').appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  }
};

const changeCards = (type) => {
  resetGuesses()
  document.querySelectorAll('#game > LI').forEach(card => card.className = type)
  let counter = 0
  let temp = doIt(type)
  document.querySelectorAll(".back").forEach(card => {card.style.backgroundImage = `url('${type}/${temp[counter]}.jpg')`; counter++} )
  counter = 0
}

document.getElementById('buttons').onclick = (e) => {
  if (e.target.nodeName == 'A') {changeCards(e.target.id)} //A used to be BUTTON
}
 
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  document.querySelectorAll('.selected').forEach(card => {card.classList.toggle('selected')});
};

document.getElementById('game').addEventListener('click', event => {
  if ( event.target.nodeName === 'UL' ||
       event.target === previousTarget ||
       event.target.parentNode.classList.contains('selected') ||
       event.target.parentNode.classList.contains('match') ) 
    return

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = event.target.nextSibling.style.backgroundImage
      event.target.parentNode.classList.toggle('selected')}
      else {
      secondGuess = event.target.nextSibling.style.backgroundImage
      event.target.parentNode.classList.toggle('selected')}
    if (firstGuess === secondGuess) {
      setTimeout(i => document.querySelectorAll('.selected').forEach(card => {card.classList.add('match'); document.querySelector("P").innerHTML = card.className}), 1200)
    }
    if (firstGuess && secondGuess) {setTimeout(resetGuesses, 1200)}
    previousTarget = event.target;
  }
});

