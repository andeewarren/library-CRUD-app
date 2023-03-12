class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.image = '';
    }
}


class BookService {
    static url = "https://640a21d16ecd4f9e18c5cb25.mockapi.io/books";

    static getAllBooks() {
        return $.get(this.url);
    }

    static getBook(id) {
        return $.get(this.url + `/${id}`);
    }

    static addBook(book) {
        return $.post(this.url, book);
    }

    static updateBook(book) {
        return $.ajax({
            url: this.url + `/${book.id}`,
            dataType: "json",
            data: JSON.stringify(book),
            contentType: "application/json",
            type: "PUT"
        });
    }

    static deleteBook(id){
        return $.ajax({
            url: this.url + `/${id}`,
            type: "DELETE"
        });
    }
}

class DOMManager {
    static books;

    static getAllBooks() {
        BookService.getAllBooks().then(books => this.render(books));
    }

    static addBook(title, author) {
        BookService.addBook(new Book(title, author))
            .then(() => {
                return BookService.getAllBooks();
            })
            .then((books) => this.render(books));
    }

    static deleteBook(id) {
        BookService.deleteBook(id)
            .then(() => {
                return BookService.getAllBooks();
            })
            .then((books) => this.render(books));
            console.log("checking delete"); //runs
    }

    static render(books) {
        this.books = books;
        console.log("test render");
        $("#app").empty();
        for (let book of books) {
            // console.log(`${book.image}`);
            $("#app").prepend(
                `<div class="col">
                <div id="${book.id}" class="card text-bg-light border-dark m-1 p-1">
                    <img id="my-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/928px-Placeholder_book.svg.png?20071129174344" class="card-img-top">
                    <div class="card-body">
                        <h2 class="card-title">${book.title}</h2>
                            <h6>${book.author}</h6>
                            <button class="btn btn-outline-danger" onclick="DOMManager.deleteBook('${book.id}')">Delete</button>
                    </div>
                </div>
                </div>`
            );
        }
    }
}

$('#create-new-book').click(() => {
    DOMManager.addBook($('#new-book-title').val(), $('#new-book-author').val());
    console.log($('#new-book-cover').val());
    $('#my-image').prop("src", $('#new-book-cover').val());
    console.log($('#my-image'))
    $('#new-book-title').val(''); 
    $('#new-book-author').val('');
    $('#new-book-cover').val('');
});

DOMManager.getAllBooks();
// console.log("testing dom manager function");