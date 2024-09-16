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
        let cellCount = 0;

        for (let key in myLibrary[i]) {

            const newCell = newRow.insertCell(cellCount);
            const newText = document.createTextNode(myLibrary[i][key]);
            newCell.appendChild(newText);
            ++cellCount;

        }
    }
}

showLibrary();
