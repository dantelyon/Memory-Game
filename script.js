




const imgArray = ['img/point.png', 'img/contemporary.png', 'img/modern.png', 'img/cubism.png', 'img/realism.png', 'img/postimp.png', 'img/soleil.png', 'img/express.png',]

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const gameGrid = shuffle(imgArray.concat(imgArray))

gameGrid.forEach(item => {
  const card = document.createElement('li');
  const front = document.createElement('div');
  const back = document.createElement('div');
  card.classList.add('card');
  front.classList.add('front');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item})`;
  document.getElementById('game').appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});


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
      setTimeout(i => document.querySelectorAll('.selected').forEach(card => {card.classList.add('match');}), 1200)
    }
    if (firstGuess && secondGuess) {
      setTimeout(resetGuesses, 1200)}
    previousTarget = event.target;
  }
});
