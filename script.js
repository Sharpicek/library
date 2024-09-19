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


function addBookToLibrary () {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readCheckbox = document.getElementById("check-read");
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readCheckbox.value;
    if (title === "") {
        alert("Please fill out the title!");
        return false;
    } else if (author === "") {
        alert("Please fill out the author!");
    } else if (pages === "") {
        alert("Please fill out the pages!");
    } else {
    myLibrary.push(new Book(title, author, pages, read));
    dialog.close();
    showLibrary();
    clearInputFields();
    }
};

function clearInputFields () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
}

function showLibrary() {
    const table = document.getElementById("library");

    // Kontrola, kolik řádků už je v tabulce (bez hlavičky)
    const currentRows = table.rows.length - 1;

    for (let i = currentRows; i < myLibrary.length; i++) {
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

// Dialog
const dialog = document.getElementById("open-dialog");
const showButton = document.getElementById("add-book-btn");
const closeButton = document.getElementById("close-dialog");
const addButton = document.getElementById("add-book-to-library");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
})

showLibrary();
