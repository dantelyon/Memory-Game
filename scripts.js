
let firstGuess = ''
let secondGuess = ''
let guesses = 0
let previousTarget = null

const genreButtons = document.querySelectorAll(".genreButtons > button");
genreButtons.forEach(button => {
  button.addEventListener("click", function(event) {
    document.querySelector(".selectedButton").classList.remove("selectedButton");
    this.className = "selectedButton";
    changeGenre(event.target.dataset.genre)
  });
})

window.addEventListener('load', createCards)

function createCards() {
  for (let i = 0; i < 16; i++) {
    let card = document.createElement('div');
    let front = document.createElement('div');
    let back = document.createElement('div');
    front.classList.add('cardFront');
    back.classList.add('cardBack');
    front.addEventListener("click", checkMatch)
    card.appendChild(front);
    card.appendChild(back);
    document.querySelector(".cardsGrid").appendChild(card);
  };
  changeGenre("landscape");
}

function changeGenre(selectedGenre) {
  resetGuesses();
  document.querySelectorAll('.matched').forEach(card => card.classList.remove('matched'));
  document.querySelector(".cardsGrid").className = `cardsGrid ${selectedGenre}`;
  let randomCards = shuffle(Object.keys(METADATA[selectedGenre])).slice(0, 8);
  if (randomCards.length < 8) console.error(`Only ${randomCards.length} paintings in the ${selectedGenre} collection!`);
  let shuffledCards = shuffle(randomCards.concat(randomCards));
  document.querySelectorAll(".cardFront").forEach((card, i) => card.dataset.id = shuffledCards[i]);
  document.querySelectorAll(".cardBack").forEach((card, i) => {
    let image = `url('${selectedGenre}/${shuffledCards[i]}.jpg')`;
    card.style.backgroundImage = image;
  });
}

function resetGuesses() {
  firstGuess = ''
  secondGuess = ''
  guesses = 0
  previousTarget = null
  document.querySelectorAll('.selected').forEach(card => card.classList.remove('selected'));
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}


function checkMatch(event) {
  if ( event.target.classList.contains("cardsGrid") || event.target === previousTarget || event.target.parentNode.classList.contains('selected') || event.target.parentNode.classList.contains('matched')) return;

  guesses++;
  if (guesses === 1) {
    firstGuess = event.target.dataset.id;
    event.target.parentNode.classList.add('selected');
  }
  if (guesses === 2) {
    secondGuess = event.target.dataset.id;
    event.target.parentNode.classList.add('selected');
    if (firstGuess === secondGuess) {
      setTimeout(function() {
        document.querySelectorAll('.selected').forEach(card => card.classList.add('matched'));
        const currentGenre = document.querySelector(".selectedButton").dataset.genre;
        const painting = METADATA[currentGenre][event.target.dataset.id];
        document.getElementById("matched-image-title").textContent = `${painting.title}`;
        document.getElementById("matched-image-info").textContent = `(${painting.year}), by ${painting.painter}.`;
      }, 1200)
    };
    setTimeout(resetGuesses, 1200);
  };
  previousTarget = event.target;
}