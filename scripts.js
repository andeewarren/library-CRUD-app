class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class HouseService {
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
        HouseService.getAllBooks().then(books => this.render(books));
    }

    static addBook(title, author) {
        HouseService.addBook(new Book(title, author))
            .then(() => {
                return HouseService.getAllBooks();
            })
            .then((books) => this.render(books));
    }

    static deleteBook(id) {
        HouseService.deleteBook(id)
            .then(() => {
                return HouseService.getAllBooks();
            })
            .then((books) => this.render(books));
            console.log("checking delete"); //runs
    }

    static render(books) {
        this.books = books;
        console.log("test render");
        $("#app").empty();
        for (let book of books) {
            $("#app").prepend(
                `<div id="${book.id}" class="card">
                    <div class="card-header">
                        <h2>${book.title}</h2>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <h6>${book.author}</h6>
                            <button class="btn btn-danger" onclick="DOMManager.deleteBook('${book.id}')">Delete</button>
                        </div>
                    </div>
                </div><br>`
            );
        }
    }
}

$('#create-new-book').click(() => {
    DOMManager.addBook($('#new-book-title').val(), $('#new-book-author').val());
    $('#new-book-title').val(''); 
    $('#new-book-author').val('');
});

DOMManager.getAllBooks();
console.log("testing dom manager function");