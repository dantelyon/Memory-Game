
function changeCards(type) {
  resetGuesses()
  document.querySelectorAll('.card').forEach(card => card.className = "card " + type)
  let chosenCards = shuffle(Object.keys(images[type])) . slice(0,8)
  let chosenCards2x = chosenCards.concat(chosenCards)
  let shuffledCards = shuffle(chosenCards2x)
  document.querySelectorAll(".back").forEach((card, i) => {card.style.backgroundImage = `url('${type}/${shuffledCards[i]}.jpg')`} )
  document.querySelectorAll(".front").forEach((card, i) => {card.dataset.id = shuffledCards[i]} )
}

function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  guesses = 0;
  previousTarget = null;
  document.querySelectorAll('.selected').forEach(card => card.classList.toggle('selected'));
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}

window.onload = function(){
  for (let i = 0; i < 16; i++) {
    let card = document.createElement('div');
    let front = document.createElement('div');
    let back = document.createElement('div');
    card.classList.add('card');
    card.classList.add('landscape');
    front.classList.add('front');
    back.classList.add('back');
    card.appendChild(front);
    card.appendChild(back);
    document.getElementById('game').appendChild(card);
  };
  changeCards("landscape")
};

const header = document.querySelector('#header')
const headerButtons = header.getElementsByClassName("genreButton");

for (let i = 0; i < headerButtons.length; i++) {
  headerButtons[i].addEventListener("click", function() {
    const activeButton = document.getElementsByClassName("active");
    activeButton[0].className = activeButton[0].className.replace(" active", "");
    this.className += " active";
  });
}

header.addEventListener('click', event => event.target.nodeName=='A' && changeCards(event.target.id))

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
        document.getElementById("matched-image-title").textContent = `${painting.title}`
        document.getElementById("matched-image-info").textContent = `(${painting.year}), by ${painting.painter}.`
      }, 1200)
		};
		if (firstGuess && secondGuess) {setTimeout(resetGuesses, 1200)}
	};
	previousTarget = event.target;
});

