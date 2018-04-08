function save() {

	let a = [];

	if (window.localStorage.savedDraws != "") {
		a = JSON.parse(window.localStorage.savedDraws);
	}

	let guess = window.sessionStorage.guess.toLowerCase();
	let card = window.sessionStorage.bird.toLowerCase();

	if (a.length == 0) {
		var id = 1;
	} else {
		var id = a[a.length - 1].id + 1;
	}
	

	a.push({
		id: id,
		guess: guess,
		card: card
	});	

	rowFactory(id, guess, card);

	window.localStorage.savedDraws = JSON.stringify(a);
}

function loadSavedDraws() {

	if (window.localStorage.savedDraws == "") {
		var draws = [];
	} else {
		var draws = JSON.parse(window.localStorage.savedDraws);
	}

	for (let i = 0; i < draws.length; i++) {
		rowFactory(draws[i].id, draws[i].guess, draws[i].card);
	}
}

function rowFactory(id, guess, card) {

	let row = document.createElement("tr");
	let tdguess = document.createElement("td");
	let tdcard = document.createElement("td");
	
	let gt = document.createTextNode(guess.charAt(0).toUpperCase() + guess.slice(1));
	let ct = document.createTextNode(card.charAt(0).toUpperCase() + card.slice(1));

	
	

	tdguess.appendChild(gt);
	tdcard.appendChild(ct);

	row.appendChild(tdguess);
	row.appendChild(tdcard);

	row.setAttribute("id", id);

	document.getElementById("savedTable").appendChild(row);
}

function clearHistory() {
	window.localStorage.removeItem('savedDraws');

	let table = document.getElementById("savedTable");
	let rows = Array.from(table.children);


	for (i = 1; i < rows.length; i++) {
		table.removeChild(rows[i]);
	}

	window.localStorage.savedDraws = "";

}