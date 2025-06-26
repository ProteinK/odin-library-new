const myLibrary = [];
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const showButton = document.querySelector('#showForm');
const addButton = document.querySelector('#addBook');
const formDialog = document.querySelector('#formDialog');

showButton.addEventListener('click', () => {
  formDialog.showModal();
});

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
}

function displayBooks() {
  const books = document.querySelector('.books');
  books.innerHTML = '';

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
    el.setAttribute('data-id', b.id);

    const btn = document.createElement('button');
    btn.addEventListener('click', (event) => {
      const id = event.target.parentNode.dataset.id;
      const index = myLibrary.findIndex(b => b.id === id);
      myLibrary.splice(index, 1);
      displayBooks();
    });
    btn.textContent = 'Remove';
    el.appendChild(btn);

    books.appendChild(el);
  }
}

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary(formTitle.value, formAuthor.value, formPages.value);
  formDialog.close();
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  displayBooks();
});

addBookToLibrary("test", "test author", 500);
addBookToLibrary("Moby-Dick", "Herman Melville", 635);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281);

displayBooks();