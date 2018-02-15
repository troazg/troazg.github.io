let card = document.getElementById('card');
let front = document.getElementById('front');
let back = document.getElementById('back');

let JSONdata;
let deck = new Array;

function loadDeck() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			JSONdata = JSON.parse(this.responseText);

			//Turn 2 dimentional array into 1 dimentional array
			for (i = 0; i < JSONdata['deck'].length; i++) {
				deck[i] = JSONdata['deck'][i];
			}
		}
	};
	xhttp.open("GET", "cards.json", true);
	xhttp.send();
}



function drawCard() {
	var cardId = Math.floor(Math.random() * 52);
	var card = deck[cardId];
	var cardValue = '';
	var valueElement = document.getElementById('cardValue');
	var suitElement = document.getElementById('suitIcon');

	switch(card.value) {
		case 1:
			cardValue = 'A';
			break;
		case 11:
			cardValue = 'J';
			break;
		case 12:
			cardValue = 'Q';
			break;
		case 13:
			cardValue = 'K';
			break;
		default:
			cardValue = card.value;
	}

	valueElement.innerHTML = cardValue;
	valueElement.style.color = card.color;
	suitElement.style.backgroundImage = "url('" + card.suit + ".png')";

	flipCard();
}

function flipCard() {
	card.classList.add('flipped');
}

function storeCard() {
	card.classList.add('stowed');
			
	setTimeout(function() {
		card.classList.remove('flipped');
		card.classList.remove('stowed');
		card.classList.add('low');
	}, 1600);

	setTimeout(function() {
		card.classList.remove('low');
	}, 1650);
}

function storeAndFlip() {
	storeCard();
	setTimeout(function() {
		drawCard();
	}, 1700);
}
