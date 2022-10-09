const $body = document.querySelector('body');
const $wrapper = document.querySelector('.wrapper');

/* developer */
let cardFrontPage = 'image/(1).jpg';
let totalCards = 30;
/* --------- */

let cardArray = Array.from({length: totalCards}, (_, i) => i + 1);
let shuffled =[];
window.onload = init();

/** card in random order */
function shuffle() {
	for(let i = 0 ; cardArray.length > 0; i++) {
		let randomNum = Math.floor(Math.random() * totalCards);
		shuffled = shuffled.concat(cardArray.splice(randomNum,1));
	}
	console.log(shuffled);
}

/** card create */
function createCard(i) {
	const card = document.createElement('div');
	card.className = 'card';
	const cardInner = document.createElement('div');
	cardInner.className = 'card-inner';
	const cardFront = document.createElement('img');
	cardFront.className = 'card-front';
	cardFront.src = cardFrontPage;
	cardFront.style.width = '200px';
	const cardBack = document.createElement('img');
	cardBack.className = 'card-back';
	cardBack.style.width = '200px';
	cardBack.src = `./image/Dream_TradingCard (${shuffled[i]}).jpg`;
	card.appendChild(cardInner);
	cardInner.appendChild(cardFront);
	cardInner.appendChild(cardBack);
	return card;
}

/** card flip */
function cardClicked(i) {
	this.classList.toggle('flipped');
}

function init() {
	shuffle();
	for (let i = 0; i < totalCards; i++) {
		let card = createCard(i);
		$wrapper.appendChild(card);
	}

	let $cards = document.querySelectorAll('.card')
	$cards.forEach((card, index) => {
		setTimeout(() => {
			card.classList.add('flipped');
		}, 2000 + index * 100);
		let cardClickedBind = cardClicked.bind(card); //바인드로 this고정
		card.addEventListener('click',() => {cardClickedBind(index)});
	})
}