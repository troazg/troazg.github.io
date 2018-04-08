let card = document.getElementById('card');
let front = document.getElementById('front');
let back = document.getElementById('back');

let JSONdata;
let deck = new Array;

function setup() {

	if (window.localStorage.savedDraws == undefined) {
		window.localStorage.savedDraws = "";
	}

	resetSessionVars(); 

	getTimesFlipped();

	loadSavedDraws();

	loadDeck();
}

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
	xhttp.open("GET", "birds.json", true);
	xhttp.send();
}



function drawCard() {

	// Have to guess first
	if (window.sessionStorage.hasGuessed == "false") {
		document.getElementById('error').classList.remove('hidden');

		let buttons = Array.from(document.getElementById("guessButtons").children);

		buttons.forEach(function(button) {
			button.classList.add('hint');
		});

		setTimeout(function() {
			buttons.forEach(function(button) {
				button.classList.remove('hint');
			});
		}, 1100);
		return
	}

	var cardId = Math.floor(Math.random() * 4);
	var card = deck[cardId];
	var cardValue = '';

	// Dummy card for local testing (AJAX won't work locally without setting up a server)
	// var card = {
	// 	value: 3,
	// 	bird: "crane",
	// 	image: "crane.jpg"
	// }

	var birdImage = document.getElementById('birdImage');
	var birdName = document.getElementById('birdName');

	birdImage.style.backgroundImage = "url('res/" + card.image + "')";
	birdName.innerHTML = card.bird.charAt(0).toUpperCase() + card.bird.slice(1); 

	flipCard();

	window.sessionStorage.bird = card.bird;

	setTimeout(function() {
		evaluateResults();
	},1500);

}

function evaluateResults() {

	let bgColor;
	let result;

	if (window.sessionStorage.bird == window.sessionStorage.guess) {
		bgColor = '#5acc41';
		result = 'CORRECT!';
		window.sessionStorage.correct = Number(window.sessionStorage.correct) + 1;
		window.localStorage.correct = Number(window.localStorage.correct) + 1;
	} else {
		bgColor = '#ff4747';
		result = 'WRONG';
	}

	document.body.style.backgroundColor = bgColor;
	document.getElementById('message').innerHTML = result;

	document.getElementById('results').classList.remove('hidden');


	getTimesFlipped();

	window.sessionStorage.done = true;

	save();


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

// function storeAndFlip() {
// 	storeCard();
// 	setTimeout(function() {
// 		drawCard();
// 	}, 1700);
// }

function getTimesFlipped() {
	if (window.sessionStorage.correct == undefined) {
		window.sessionStorage.correct = 0;
	}

	if (window.localStorage.correct == undefined) {
		window.localStorage.correct = 0;
	}

	document.getElementById("sessionCount").innerHTML = window.sessionStorage.correct;
	document.getElementById("localCount").innerHTML = window.localStorage.correct;
}
