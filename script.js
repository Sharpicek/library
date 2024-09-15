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

addBookToLibrary('Dune', 'Frank Herbert', '638', 'yes');
console.log(myLibrary);
