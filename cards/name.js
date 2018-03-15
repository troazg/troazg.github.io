function addPrompt() {

	let saveBtn = btnFactory("Save Name");
	saveBtn.addEventListener("click", saveName);
	saveBtn.setAttribute("id", "saveBtn");
	
	let owner = document.getElementById('owner');

	owner.appendChild(saveBtn);


	let newInput = document.createElement("input");
	newInput.setAttribute("id", "nameInput");
	newInput.setAttribute("placeholder", "Enter your name");

	owner.insertBefore(newInput, saveBtn);

}

function saveName() {
	window.localStorage.owner = document.getElementById('nameInput').value;

	document.getElementById('owner').removeChild(document.getElementById('nameInput'));
	document.getElementById('owner').removeChild(document.getElementById('saveBtn'));

	displayOwner();

}

function displayOwner() {
	let newH4 = document.createElement("h4");
	let text = document.createTextNode(window.localStorage.owner + "'s Deck");
	newH4.appendChild(text);
	newH4.setAttribute("id", "ownerH4");
	document.getElementById('owner').appendChild(newH4);

	let changeBtn = btnFactory("Change Name");
	changeBtn.addEventListener("click", editName);
	changeBtn.setAttribute("id", "changeBtn");
	document.getElementById('owner').appendChild(changeBtn);
}

function btnFactory(text) {
	let newButton = document.createElement("button");
	let btntxt = document.createTextNode(text);
	newButton.appendChild(btntxt);

	return newButton;
}

function editName() {

	document.getElementById('owner').removeChild(document.getElementById('ownerH4'));
	document.getElementById('owner').removeChild(document.getElementById('changeBtn'));

	addPrompt();
}