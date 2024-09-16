const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};


function addBookToLibrary (title, author, pages, read) {
     myLibrary.push(new Book(title, author, pages, read));
};

addBookToLibrary('Duna', 'Frank Herbert', '638', true);
addBookToLibrary('Harry Potter a Kámen Mudrců', 'J. K. Rowling', '246', true);

function showLibrary() {
    const table = document.getElementById("library");

    for (let i = 0; i < myLibrary.length; i++) {

        const newRow = table.insertRow(i + 1);
        newRow.setAttribute("id",`row${i}`);
        let cellCount = 0;

        for (let key in myLibrary[i]) {

            let value = myLibrary[i][key];

            if (key === 'read') {
                value = value ? "Yes" : "Ne";
            }

            const newCell = newRow.insertCell(cellCount);
            const newText = document.createTextNode(value);
            newCell.appendChild(newText);
            ++cellCount;

            if (key === 'read') {
                const changeButton = document.createElement("button");
                changeButton.classList.add("change-btn");
                changeButton.setAttribute("id", `btn-cell${i}`);
                changeButton.textContent = "Change";
                changeButton.addEventListener("click", () => {
                    changeRead(i);
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
        lastCell.appendChild(deleteButton);
    }
}

function changeRead(row) {
    console.log(row);
};

showLibrary();
