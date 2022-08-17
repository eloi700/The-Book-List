//BOOK CONSTRUCTOR
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI CONSTRUCTOR
class UI {
  addBookToList(book) {
    const list = document.querySelector(".book-list");
    //Create tr Element
    const row = document.createElement("tr");
    //Insert cols into tr (td)
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete text-decoration-none text-danger">X</a></td>`;

    list.appendChild(row);
  }
  clearFields() {
    document.querySelector(".title").value = "";
    document.querySelector(".author").value = "";
    document.querySelector(".isbn").value = "";
  }
  showAlert(message, className) {
    const div = document.createElement("div");
    // div.className = `error ${className}`;
    div.classList.add(className);
    // div.appendChild(document.createTextNode(message));
    div.textContent = message;
    //The Parent of Form
    const container = document.querySelector(".container");
    const form = document.querySelector(".book-form");
    //Inserting DIV before the FORM
    container.insertBefore(div, form);
    //setTimeout for 3 seconds
    setTimeout(() => {
      div.remove("error");
      div.remove("success");
    }, 3000);
  }

  deleteBook(target) {
    const delTargetList = document.querySelectorAll(".delete");
    for (const delTarget of delTargetList) {
      if (target === delTarget) {
        target.parentElement.parentElement.remove();
        return true;
      }
    }
    return false;
  }
}

//Local Storage Class
class Store {
  //fetching books from LS
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();
      // Add book to UI
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      const ui = new UI();
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//Event Listener for Adding Book
document.querySelector(".submit-btn").addEventListener("click", (e) => {
  //Get the Form Values
  const title = document.querySelector(".title").value,
    author = document.querySelector(".author").value,
    isbn = document.querySelector(".isbn").value;

  //Instatiate Book - Making Book Object
  const book = new Book(title, author, isbn);

  //INSTANTIATE UI Object
  const ui = new UI();

  //Validation of Input
  if (title === "" || author === "" || isbn === "") {
    //ERROR Handling (Alert) - (message, className)
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to List
    ui.addBookToList(book);

    //Add book to LS
    Store.addBook(book);

    //Show SUCCESS Alert Message - (message, className)
    ui.showAlert("Book Added!", "success");

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for Delete
document.querySelector(".book-list").addEventListener("click", (e) => {
  //INSTANTIATE UI Object
  const ui = new UI();

  //Delete Book
  const hasDeletedBook = ui.deleteBook(e.target);

  if (hasDeletedBook) {
    //Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show Alert Message
    ui.showAlert("Book Deleted!", "success");
  }

  e.preventDefault();
});
