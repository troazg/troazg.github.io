function save() {

	let a = [];

	if (window.localStorage.savedDraws != "") {
		a = JSON.parse(window.localStorage.savedDraws);
	}

	let value = window.sessionStorage.value;
	let suit = window.sessionStorage.suit.toUpperCase();

	if (a.length == 0) {
		var id = 1;
	} else {
		var id = a[a.length - 1].id + 1;
	}
	

	a.push({
		id: id,
		value: value,
		suit: suit
	});	

	rowFactory(id, value, suit);

	window.localStorage.savedDraws = JSON.stringify(a);
}

function remove() {
	let row = this.parentNode.parentNode;
	let table = row.parentNode;

	table.removeChild(row);

	let a = [];
	a = JSON.parse(window.localStorage.savedDraws);

	let id = row.getAttribute("id");

	let index = findWithAttr(a, "id", id)

	console.log(index);
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] == value) {
            return i;
        }
    }
    return -1;
}

function loadSavedDraws() {

	if (window.localStorage.savedDraws == "") {
		var draws = [];
	} else {
		var draws = JSON.parse(window.localStorage.savedDraws);
	}

	for (let i = 0; i < draws.length; i++) {
		rowFactory(draws[i].id, draws[i].value, draws[i].suit);
	}
}

function rowFactory(id, value, suit) {

	let row = document.createElement("tr");
	let tdvalue = document.createElement("td");
	let tdsuit = document.createElement("td");
	let tdbtn = document.createElement("td");
	let btn = document.createElement("button");

	let vt = document.createTextNode(value);
	let st = document.createTextNode(suit);
	let bt = document.createTextNode("Remove");

	tdvalue.appendChild(vt);
	tdsuit.appendChild(st);
	btn.appendChild(bt);
	btn.addEventListener("click", remove);

	tdbtn.appendChild(btn);

	row.appendChild(tdvalue);
	row.appendChild(tdsuit);
	row.appendChild(tdbtn);

	row.setAttribute("id", id);

	document.getElementById("savedTable").appendChild(row);
}