//BOOK CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI CONSTRUCTOR
function UI() {}

//Creating Prototype Function for addBookToList(book)
UI.prototype.addBookToList = (book) => {
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
};

//Creating Prototype Function for clearFields()
UI.prototype.clearFields = () => {
  document.querySelector(".title").value = "";
  document.querySelector(".author").value = "";
  document.querySelector(".isbn").value = "";
};

//Creating Prototype Function for showAlert(message, className)
UI.prototype.showAlert = (message, className) =>{
    const div = document.createElement('div');
    // div.className = `error ${className}`;----OR
    div.classList.add(className);
    // div.appendChild(document.createTextNode(message)); ---OR
    div.textContent = message;
    //The Parent of Form
    const container = document.querySelector('.container');
    const form = document.querySelector('.book-form');
    //Inserting DIV before the FORM
    container.insertBefore(div, form);
    //setTimeout for 3 seconds
    setTimeout(() =>{
        div.classList.remove('error');
        div.classList.remove('success');
        div.textContent = '';
    }, 3000);
}

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
    ui.showAlert('Please fill in all fields', 'error');

  } else {
    //Add book to List
    ui.addBookToList(book);

    //Show SUCCESS Alert Message - (message, className)
    ui.showAlert('Book Added!', 'success');

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});
