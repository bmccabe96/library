let myLibrary = [];


//Add a couple books just to have it prepopulated. 
//When I learn how to build login/authentication and how to hook up to a DB, I can add that portion
let book1 = new MakeBook('The Fellowship of the Ring','JRR Tolkien',400,true);
let book2 = new MakeBook('The Lion, the Witch, and the Wardrobe','CS Lewis',300,true);
let book3 = new MakeBook('Game of Thrones', 'George RR Martin', 350);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
displayBooks();

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
This next section will define all the event listeners the webpage will be looking out for.
*/
const modal = document.getElementById("myModal"); // Get the modal
const addBookBtn = document.getElementById("add-btn"); // Get the button that opens the modal
const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const addBookForm = document.querySelector("#add-book-form"); //Get form

// When the user clicks on the button, open the modal
addBookBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });  
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
This next section will define all the functions used in the program
*/

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
/*
Next, need a function for responding to user input to add a book to the library
*/
function addBookToLibrary(input) {
    myLibrary.push(input);
}
/*
Function to display books on the page
This will be called anytime a book is added, removed, or edited
*/
function displayBooks() {
    const bookshelf = document.querySelector(".bookshelf");
    removeAllChildNodes(bookshelf);
    myLibrary.forEach((book, index) => {
        bookItem = createBookHtml(book, index);
        bookshelf.appendChild(bookItem);
    });
    initializeReadButtons(); //need to check for read statuses on new call of displayBooks
    initializeRemoveButtons(); //same as above...if we don't do this, our indexes stored in html wont be in line with the myLibrary array
}

/*
Function to create book html
*/
function createBookHtml(book, index) {
    let bookItem = document.createElement("div");
        bookItem.className = "book";
        bookItem.dataset.index = index;
        let container1 = document.createElement("div");
        container1.className = "container-1";
        let container2 = document.createElement("div");
        container2.className = "container-2";

        let title = document.createElement("p");
        title.textContent = book.title;
        title.className = "title";
        let author = document.createElement("p");
        author.textContent = book.author;
        author.className = "author";
        let pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;
        pages.className = "pages";
        container1.appendChild(title);
        container1.appendChild(author);
        container1.appendChild(pages);

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
        let remove = document.createElement("button");
        remove.className = "btn remove";
        remove.textContent = "Remove";
        container2.appendChild(read);
        container2.appendChild(remove);

        bookItem.appendChild(container1);
        bookItem.appendChild(container2);

    return bookItem;
}
/*
Function to remove children on new call of display books
I wrote this because, based on the overall structure of my program, it is needed to keep the index
of myLibrary in sync with the indexes of HTML elements
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
// READ / UNREAD
function initializeReadButtons() {
    let bookReadButtons = document.querySelectorAll('.toggle');
    bookReadButtons.forEach(read => {
        read.addEventListener("click", () => {
            if(read.className === "toggle btn btn-green"){
                myLibrary[read.parentNode.parentNode.dataset.index].isRead = false;
                displayBooks();
            } else {
                myLibrary[read.parentNode.parentNode.dataset.index].isRead = true;
                displayBooks();
            }
        });
    });
}
// REMOVAL
function initializeRemoveButtons() {
    let bookRemovalButtons = document.querySelectorAll('.remove');
    bookRemovalButtons.forEach(remove => {
        remove.addEventListener("click", () => {
            console.log(remove.parentNode.parentNode.dataset.index);
            myLibrary.splice(remove.parentNode.parentNode.dataset.index, 1);
            remove.parentNode.parentNode.remove();
            displayBooks();
        });
    });
}







