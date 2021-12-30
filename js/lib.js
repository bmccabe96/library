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
            read.className = "toggle btn btn-green";
        } else {
            read = document.createElement("button");
            read.textContent = "Not Read";
            read.className = "toggle btn btn-red";
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
    let bookReadButtons = document.querySelectorAll('.toggle');
    bookReadButtons.forEach(read => {
        read.addEventListener("click", () => {
            if(read.className === "toggle btn btn-green"){
                myLibrary[read.parentNode.dataset.index].isRead = false;
                displayBooks();
            } else {
                myLibrary[read.parentNode.dataset.index].isRead = true;
                displayBooks();
            }
        });
    });
}





// Get the modal
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const addBookBtn = document.getElementById("add-btn");
// When the user clicks on the button, open the modal
addBookBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });  
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
//Get form
const addBookForm = document.querySelector("#add-book-form");
/*
Prevent form from refreshing window on submit
Also add event listener for storing form results
*/
function handleForm(event) { event.preventDefault(); } 
addBookForm.addEventListener('submit', handleForm);
addBookForm.addEventListener("submit", () => {
    let newBook = getBookFromInput();
    console.log(newBook);
    addBookToLibrary(newBook);
    modal.style.display = "none";
    addBookForm.reset();
    displayBooks();
});







// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

/*
Function for getting new book data from form
*/
const getBookFromInput = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('is-read').checked;
    return new MakeBook(title, author, pages, isRead);
};


