const table = document.querySelector("#assignmentsTable");
const buttonInsert = document.querySelector("#buttonInsert");
const buttonClear = document.querySelector("#buttonClear");
const buttonDelete = document.querySelectorAll("#buttonDelete");
let allInputs = document.querySelectorAll("input");
let rowNo = 2;
const classes = [];

// Default due time value
document.querySelector(".timeinput").value = "23:59";
// Default due date value (today)
document.querySelector(".dateinput").value = new Date().toISOString().substring(0, 10);

// Deleting a table row and from local storage
const deleteRow = (index) => {
	let row = table.rows[index];
	row.parentNode.removeChild(row);
	localStorage.removeItem(index);
};

// Add each index from local storage to the table
let index = 0;
for (let i = localStorage.length - 1; i >= 0; i--) {
	currentRowString = localStorage.getItem(i);
	currentRow = JSON.parse(currentRowString);

	// Create a new row and add it to the table
	let newRow = table.insertRow(2);
	let cell1 = newRow.insertCell(0);
	let cell2 = newRow.insertCell(1);
	let cell3 = newRow.insertCell(2);
	let cell4 = newRow.insertCell(3);
	let cell5 = newRow.insertCell(4);
	let cell6 = newRow.insertCell(5);
	let cell7 = newRow.insertCell(6);
	let cell8 = newRow.insertCell(7);

	cell1.innerText = currentRow.assignmentName;
	cell2.innerText = currentRow.className;
	cell3.innerText = currentRow.dueDate;
	cell4.innerText = currentRow.dueTime;
	cell5.innerText = currentRow.priority;
	cell6.innerText = currentRow.estimatedTime;
	cell7.innerText = currentRow.status;
	// Add input of type button to cell8
	let deleteButton = document.createElement("input");
	deleteButton.setAttribute("type", "button");
	deleteButton.setAttribute("value", "❌");
	deleteButton.setAttribute("id", "buttonDelete");
	cell8.appendChild(deleteButton);
	// Get parent of delete button
	let parentRow = deleteButton.parentNode.parentNode;
	// Add event listener to delete button to delete row and remove from local storage
	deleteButton.addEventListener("click", () => {
		deleteRow(parentRow.rowIndex);
	});
}

// Add all classes to the dropdown menu
for (let i = 0; i < localStorage.length; i++) {
	let currentRowString = localStorage.getItem(i);
	let currentRow = JSON.parse(currentRowString);
	if (!classes.includes(currentRow.className)) {
		classes.push(currentRow.className);
		let newOptionElement = document.createElement("OPTION");
		newOptionElement.setAttribute("value", currentRow.className);
		let par = document.createTextNode(currentRow.className);
		newOptionElement.appendChild(par);
		document.querySelector("#classes").appendChild(newOptionElement);
	}
}

// Add event listener to insert button
buttonInsert.addEventListener("click", () => {
	let allInputsFilled = true; // allInputsFilled to check if all inputs are filled
	let duplicateClass = false; // duplicateClass to check if the class is already in the table

	// Check if any inputs are empty
	for (let i = 0; i < allInputs.length; i++) {
		if (allInputs[i].value == "") {
			allInputsFilled = false;
		}
	}

	// If all inputs are filled, add a new row to the table
	if (allInputsFilled === true) {
		// Create a new row and add it to the table
		let row = table.insertRow(rowNo);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		let cell6 = row.insertCell(5);
		let cell7 = row.insertCell(6);
		let cell8 = row.insertCell(7);

		cell1.innerText = document.querySelector(".assignmentName").value;
		cell2.innerText = document.querySelector(".className").value;
		cell3.innerText = document.querySelector(".dateinput").value;
		cell4.innerText = document.querySelector(".timeinput").value;
		cell5.innerText = document.querySelector(".priorityInput").value;
		cell6.innerText = document.querySelector(".estimatedTimeInput").value;
		cell7.innerText = document.querySelector(".status").value;
		// Add input of type button to cell8
		let deleteButton = document.createElement("input");
		deleteButton.setAttribute("type", "button");
		deleteButton.setAttribute("value", "❌");
		deleteButton.setAttribute("id", "buttonDelete");
		cell8.appendChild(deleteButton);
		// Get parent of delete button
		let parentRow = deleteButton.parentNode.parentNode;
		// Add event listener to delete button to delete row and remove from local storage
		deleteButton.addEventListener("click", () => {
			deleteRow(parentRow.rowIndex);
		});
		// Check if the class is already in the table
		let classNameInput = document.querySelector(".className").value;
		for (let i = 0; i < classes.length; i++) {
			if (String(classes[i]) === String(classNameInput)) {
				duplicateClass = true;
			}
		}

		// If the class is not in the array, add it
		if (duplicateClass === false) {
			classes.push(classNameInput);
			let newOptionElement = document.createElement("OPTION");
			newOptionElement.setAttribute("value", classNameInput);
			let par = document.createTextNode(classNameInput);
			newOptionElement.appendChild(par);
			document.querySelector("#classes").appendChild(newOptionElement);
		}

		// Add row to local storage
		let assignment = {
			assignmentName: document.querySelector(".assignmentName").value,
			className: document.querySelector(".className").value,
			dueDate: document.querySelector(".dateinput").value,
			dueTime: document.querySelector(".timeinput").value,
			priority: document.querySelector(".priorityInput").value,
			estimatedTime: document.querySelector(".estimatedTimeInput").value,
			status: document.querySelector(".status").value,
		};
		localStorage.setItem(localStorage.length, JSON.stringify(assignment));

		// Reset the inputs to default values
		document.querySelector(".assignmentName").value = "";
		document.querySelector(".className").value = "";
		document.querySelector(".dateinput").value = new Date().toISOString().substring(0, 10);
		document.querySelector(".timeinput").value = "23:59";
		document.querySelector(".estimatedTimeInput").value = "";
		document.querySelector(".status").value = "Not Started";
	}
});

// Add event listener to clear button
buttonClear.addEventListener("click", () => {
	// Clear local storage
	localStorage.clear();
	// Clear the table
	while (table.rows.length > 2) {
		table.deleteRow(2);
	}
	// Clear the dropdown menu
	while (document.querySelector("#classes").firstChild) {
		document
			.querySelector("#classes")
			.removeChild(document.querySelector("#classes").firstChild);
	}
	// Reset the classes array
	classes.length = 0;
});
