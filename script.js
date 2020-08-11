
function changeCards(type) {
  resetGuesses()
  document.querySelectorAll('#game > DIV').forEach(card => card.className = "card " + type)
  let something = shuffle(Object.keys(images[type])).slice(0,8)
  let temp = shuffle(something.concat(something))
  document.querySelectorAll(".back").forEach((card, i) => {card.style.backgroundImage = `url('${type}/${temp[i]}.jpg')`} )
  document.querySelectorAll(".front").forEach((card, i) => {card.dataset.id = temp[i]} )
}

function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  guesses = 0;
  previousTarget = null;
  document.querySelectorAll('.selected').forEach(card => {card.classList.toggle('selected')});
};

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

window.onload = function(){
  for (let i = 0; i < 16; i++) {
    let card = document.createElement('div');
    let front = document.createElement('div');
    let back = document.createElement('div');
    card.classList.add('card');
    card.classList.add('portrait');
    front.classList.add('front');
    back.classList.add('back');
    card.appendChild(front);
    card.appendChild(back);
    document.getElementById('game').appendChild(card);
  }
  changeCards("portrait")
};

/* BUTTONS HEADER*/
var btnContainer = document.getElementsByClassName("header")[0];
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
btnContainer.addEventListener('click', (e) => e.target.nodeName=='A' && changeCards(e.target.id))


let firstGuess = '';
let secondGuess = '';
let guesses = 0;
let previousTarget = null;

document.getElementById('game').addEventListener('click', event => {
	if ( event.target.id === "game" ||
       event.target === previousTarget ||
       event.target.parentNode.classList.contains('selected') ||
       event.target.parentNode.classList.contains('match') ) 
    	return

	guesses++
	if (guesses === 1) {
		firstGuess = event.target.nextSibling.style.backgroundImage;
		event.target.parentNode.classList.toggle('selected');
	}
	else if (guesses === 2) {
		secondGuess = event.target.nextSibling.style.backgroundImage;
		event.target.parentNode.classList.toggle('selected');
		if (firstGuess === secondGuess) {
			setTimeout(function() {
        document.querySelectorAll('.selected').forEach(card => card.classList.add('match'));
        const painting = images[event.target.parentNode.classList[1]][event.target.dataset.id]
        document.getElementById("matched-image-info").textContent = `${painting.title} (${painting.year}), by ${painting.painter}.`
      }, 1200)
		};
		if (firstGuess && secondGuess) {setTimeout(resetGuesses, 1200)}
	};
	previousTarget = event.target;
});
