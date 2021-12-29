let myLibrary = [];

let book1 = new MakeBook('ss','aa',22,true);
let book2 = new MakeBook('hh','df',22);
addBookToLibrary(book1);
addBookToLibrary(book2);
displayBooks();
/*
FOR TESTING IN CONSOLE
let book3 = new MakeBook('aaaaa','sssss',22);
addBookToLibrary(book3);
displayBooks();
*/


/* 
Constructor for book objects w/prototype method(s)
*/
function MakeBook(title, author, pages, isRead=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

MakeBook.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead === false ? 'not read yet' : 'already read'}`;
};


/*
Next, need a function for responding to user input to add a book to the library
*/
function addBookToLibrary(input) {
    myLibrary.push(input);
}

/*
Function to display books on the page
*/
function displayBooks() {
    const bookshelf = document.querySelector(".bookshelf");
    removeAllChildNodes(bookshelf);
    myLibrary.forEach((book, index) => {
        bookItem = createBookHtml(book, index);
        bookshelf.appendChild(bookItem);
    });
    initializeReadButtons();
}

/*
Function to create book html
*/
function createBookHtml(book, index) {
    let bookItem = document.createElement("div");
        bookItem.className = "book";
        bookItem.dataset.index = index;
        let title = document.createElement("p");
        title.textContent = book.title;
        let author = document.createElement("p");
        author.textContent = book.author;
        let pages = document.createElement("p");
        pages.textContent = book.pages;
        let read;
        if (book.isRead === true) {
            read = document.createElement("button");
            read.textContent = "Read";
            read.className = "btn btn-green";
        } else {
            read = document.createElement("button");
            read.textContent = "Not Read";
            read.className = "btn btn-red";
        }
        bookItem.appendChild(title);
        bookItem.appendChild(author);
        bookItem.appendChild(pages);
        bookItem.appendChild(read);
    return bookItem;
}

/*
Function to remove children on new call of display books
*/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/*
Event listener for bookItems
1) Read/Unread flipping
2) Removal
*/
function initializeReadButtons() {
    let bookReadButtons = document.querySelectorAll('.btn');
    bookReadButtons.forEach(read => {
        read.addEventListener("click", () => {
            if(read.className === "btn btn-green"){
                myLibrary[read.parentNode.dataset.index].isRead = false;
                displayBooks();
            } else {
                myLibrary[read.parentNode.dataset.index].isRead = true;
                displayBooks();
            }
        });
    });
}



