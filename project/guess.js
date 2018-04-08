function guess(element) {

	if (window.sessionStorage.done == 'true') {
		resetHint();

		return;
	}
	
	clearPulse();

	element.classList.add('pulse');

	window.sessionStorage.guess = element.innerHTML.toLowerCase();
	window.sessionStorage.hasGuessed = true;

	document.getElementById('error').classList.add('hidden');

}

function resetGame() {

	clearPulse();

	storeCard();

	document.body.style.backgroundColor = '';

	resetSessionVars();

	document.getElementById('results').classList.add("hidden");

}

function clearPulse() {
	let buttons = document.getElementById("guessButtons").children;

	Array.from(buttons).forEach(function(button) {
		button.classList.remove('pulse');
	});
	
}

function resetSessionVars() {

	window.sessionStorage.hasGuessed = false; 
	window.sessionStorage.removeItem('guess');
	window.sessionStorage.removeItem('bird');
	window.sessionStorage.removeItem('done');
}

function resetHint() {

	reset = document.getElementById('reset');

	reset.classList.add('hint');

	setTimeout(function() {
		reset.classList.remove('hint');
	}, 1100);
}