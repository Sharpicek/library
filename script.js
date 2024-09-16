const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};


function addBookToLibrary (title, author, pages, read) {
     myLibrary.push(new Book(title, author, pages, read));
};

addBookToLibrary("Dune", "Frank Herbert", "638", true);
addBookToLibrary("Harry Potter and the Half-Blood Prince", "J. K. Rowling", "668", false);

function showLibrary() {
    const table = document.getElementById("library");

    for (let i = 0; i < myLibrary.length; i++) {

        const newRow = table.insertRow(i + 1);
        newRow.setAttribute("id",`row${i}`);
        let cellCount = 0;

        for (let key in myLibrary[i]) {

            // Doesn't create column for prototype.changeRead function
            if (key === "toggleRead") {
                break;
            }

            let value = myLibrary[i][key];

            // Read is boolean value, so I change it to Yes for true and to No for fals
            if (key === 'read') {
                value = value ? "Yes" : "No";
            }

            const newCell = newRow.insertCell(cellCount);
            const newText = document.createTextNode(value);
            newCell.appendChild(newText);
            ++cellCount;

            // Creates button for toggleRead value change
            if (key === 'read') {
                const changeButton = document.createElement("button");
                changeButton.classList.add("change-btn");
                changeButton.setAttribute("id", `btn-cell${i}`);
                changeButton.textContent = "Change";

                changeButton.addEventListener("click", () => {
                    myLibrary[i].toggleRead();
                    // Updates the value in DOM after changing it
                    newCell.firstChild.nodeValue = myLibrary[i].read ? "Yes" : "No";
                });

                newCell.setAttribute("id", `cell${i}`);
                newCell.appendChild(changeButton);
            }                  
        }

        const lastCell = newRow.insertCell(cellCount);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.setAttribute("id", `btn-row${i}`);
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            myLibrary.splice(i, 1);
            removeBook(i);
        })
        lastCell.appendChild(deleteButton);
    }
}

function removeBook(row) {
    const deleteRow = document.getElementById(`row${row}`);
    deleteRow.remove();
}

showLibrary();
