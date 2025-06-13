const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  console.log(this.id);
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
}

function displayBooks() {
  const books = document.querySelector('.books');
  for (let b of myLibrary) {
    const el = document.createElement('div');
    el.classList.add('book');
    const titleP = document.createElement('p');
    const authorP = document.createElement('p');
    const pagesP = document.createElement('p');
    titleP.textContent = b.title;
    authorP.textContent = b.author;
    pagesP.textContent = b.pages;
    el.appendChild(titleP);
    el.appendChild(authorP);
    el.appendChild(pagesP);
    books.appendChild(el);
  }
}

addBookToLibrary("test", "test author", 500);
addBookToLibrary("Moby-Dick", "Herman Melville", 635);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281);

displayBooks();