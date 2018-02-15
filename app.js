// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() { }

// Add book to list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // Create tr element
    const row = document.createElement('tr');

    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

UI.prototype.showAlert = function (type, nameClass) {
    const div = document.createElement("div");
    const text = document.createTextNode(type);
    div.className = `${nameClass} alert`;
    div.appendChild(text);
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);

}

// Delete book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // instantiate a book      
    const book = new Book(title, author, isbn);

    // instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert("Please fill in all fields", "error");
    } else {
        // add book to list
        ui.addBookToList(book);

        // Show success 
        ui.showAlert('Book added', 'success');

        // Clear fields
        ui.clearFields();
    }
    e.preventDefault();
})

// Event listener for delete
document.getElementById('book-list').addEventListener('click',
    function (e) {
        // instantiate UI
        const ui = new UI();

        // Delete book 
        ui.deleteBook(e.target);

        // Show alert
        ui.showAlert('Book removed!', 'success');


        e.preventDefault();
    });