const myLibrary = [];
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read');
const showButton = document.querySelector('#showForm');
const addButton = document.querySelector('#addBook');
const formDialog = document.querySelector('#formDialog');

showButton.addEventListener('click', () => {
  formDialog.showModal();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
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
    const readP = document.createElement('p');
    titleP.textContent = b.title;
    authorP.textContent = b.author;
    pagesP.textContent = b.pages;
    readP.textContent = b.read ? 'Read' : 'Not read';
    el.appendChild(titleP);
    el.appendChild(authorP);
    el.appendChild(pagesP);
    el.appendChild(readP);
    el.setAttribute('data-id', b.id);


    const btnRead = document.createElement('button');
    btnRead.addEventListener('click', (event) => {
      const id = event.target.parentNode.dataset.id;
      const book = myLibrary.find(b => b.id === id);
      book.read = !book.read;
      displayBooks();
    });
    btnRead.textContent = 'Read';
    btnRead.id = 'readButton';
    el.appendChild(btnRead);

    const btn = document.createElement('button');
    btn.addEventListener('click', (event) => {
      const id = event.target.parentNode.dataset.id;
      const index = myLibrary.findIndex(b => b.id === id);
      myLibrary.splice(index, 1);
      displayBooks();
    });
    btn.textContent = 'Remove';
    btn.id = 'removeButton';
    el.appendChild(btn);

    books.appendChild(el);
  }
}

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(formRead.checked);
  addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
  formDialog.close();
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  displayBooks();
});

addBookToLibrary("test", "test author", 500, false);
addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

displayBooks();