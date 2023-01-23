'use strict';

const player0Elem = document.querySelector('.player--0');
console.log(player0Elem);

const player1Elem = document.querySelector('.player--1');
console.log(player1Elem);

const playerScr0Elem = document.querySelector('#score--0');
console.log(playerScr0Elem);

const playerScr1Elem = document.querySelector('#score--1');
console.log(playerScr1Elem);

const currentPlayScr0Elem = document.querySelector('#current--0');
console.log(currentPlayScr0Elem);

const currentPlayScr1Elem = document.querySelector('#current--1');
console.log(currentPlayScr1Elem);

const diceImgELem = document.querySelector('.dice');
const newBtnElem = document.querySelector('.btn--new');
const rollBtnElem = document.querySelector('.btn--roll');
const holdBtnElem = document.querySelector('.btn--hold');

const scores = [0, 0];

let playerScore0 = 0;
let playerScore1 = 0;
let currentScore = 0;
let currentActivePlayer = 0;
let gameInSequence = true;

const init = function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  currentActivePlayer = 0;
  gameInSequence = true;

  playerScr0Elem.textContent = playerScore0;
  playerScr1Elem.textContent = playerScore1;
  currentPlayScr0Elem.textContent = 0;
  currentPlayScr1Elem.textContent = 0;
  diceImgELem.classList.add('hidden');
  player0Elem.classList.remove('player--winner');
  player1Elem.classList.remove('player--winner');
  player0Elem.classList.add('player--active');
  player1Elem.classList.remove('player--active');
};
init();
playerScr0Elem.textContent = playerScore0;
playerScr1Elem.textContent = playerScore1;
diceImgELem.classList.add('hidden');

const switchPlayers = function () {
  document.querySelector(`#current--${currentActivePlayer}`).textContent = 0;
  currentScore = 0;
  currentActivePlayer = currentActivePlayer === 0 ? 1 : 0;
  player0Elem.classList.toggle('player--active');
  player1Elem.classList.toggle('player--active');
};

rollBtnElem.addEventListener('click', function () {
  if (gameInSequence) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceImgELem.classList.remove('hidden');
    diceImgELem.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      console.log(currentScore);
      document.querySelector(`#current--${currentActivePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

holdBtnElem.addEventListener('click', function () {
  if (gameInSequence) {
    scores[currentActivePlayer] += currentScore;

    document.querySelector(`#score--${currentActivePlayer}`).textContent =
      scores[currentActivePlayer];

    if (scores[currentActivePlayer] >= 100) {
      gameInSequence = false;
      diceImgELem.classList.add('hidden');
      document
        .querySelector(`.player--${[currentActivePlayer]}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${[currentActivePlayer]}`)
        .classList.remove('player--active');
    }

    switchPlayers();
  }
});

newBtnElem.addEventListener('click', init);
