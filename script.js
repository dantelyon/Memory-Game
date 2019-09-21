

const cardsArray = [{
    'name': 'point',
    'img': 'img/point.png',
  },
  {
    'name': 'contemporary',
    'img': 'img/contemporary.png',
  },
  {
    'name': 'modern',
    'img': 'img/modern.png',
  },
  {
    'name': 'cubism',
    'img': 'img/cubism.png',
  },
  {
    'name': 'realism',
    'img': 'img/realism.png',
  },
  {
    'name': 'postimp',
    'img': 'img/postimp.png',
  },
  {
    'name': 'soleil',
    'img': 'img/soleil.png',
  },
  {
    'name': 'express',
    'img': 'img/express.png',
  },
];



const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());


const game = document.getElementById('game');

gameGrid.forEach(item => {
  const card = document.createElement('li');
  const front = document.createElement('div');
  const back = document.createElement('div');
  card.classList.add('card');
  front.classList.add('front');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;
  game.appendChild(card);
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

game.addEventListener('click', event => {
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
      document.querySelectorAll('.selected').forEach(card => {card.classList.add('match2')})
      setTimeout(i => document.querySelectorAll('.selected').forEach(card => {card.classList.add('match');}), 1200)
    }
    if (firstGuess && secondGuess) {
      setTimeout(resetGuesses, 1200)}
    previousTarget = event.target;
  }
});
