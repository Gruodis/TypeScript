interface BookData {
  title: string;
  author: string;
  year: number;
  available?: boolean;
}

class Book {
  constructor(
    private _title: string,
    private _author: string,
    private _year: number,
    private _isAvailable: boolean = true
  ) {}

  public get info() {
    return `${this._title} by ${this._author}, published in ${this._year}, ${
      this._isAvailable ? "available" : "not available"
    }`;
  }

  public get isAvailable() {
    return this._isAvailable;
  }

  public borrow(): string {
    if (this._isAvailable) {
      this._isAvailable = false;
      return `You have borrowed "${this._title}" by ${this._author}.`;
    } else {
      return `Sorry, "${this._title}" by ${this._author} is not available.`;
    }
  }

  public returnBook(): string {
    if (!this._isAvailable) {
      this._isAvailable = true;
      return `You have returned "${this._title}" by ${this._author}.`;
    } else {
      return `"${this._title}" by ${this._author} was not borrowed.`;
    }
  }
}

// Your array of book data
const books: BookData[] = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    available: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    available: false,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    available: true,
  },
  {
    title: "Lord of the rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    available: true,
  }
];

// Create an array of Book instances
const bookInstances: Book[] = books.map((bookData) => {
  return new Book(
    bookData.title,
    bookData.author,
    bookData.year,
    bookData.available
  );
});

// Function to display messages
function displayMessage(message: string, targetElement: HTMLElement) {
  targetElement.textContent = message;
}

// Function to update the book info in the DOM
function updateBookInfo(element: HTMLElement, book: Book) {
  element.textContent = book.info;
}

// Get the container to display books
const booksList = document.getElementById("books-list") as HTMLDivElement;

// Clear any existing content
booksList.innerHTML = "";

// Render each book
bookInstances.forEach((book, index) => {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book-item list-group-item";

  // Display book info
  const bookInfo = document.createElement("p");
  bookInfo.textContent = book.info;
  bookDiv.appendChild(bookInfo);

  // Create a message area inside the book item
  const bookMessageArea = document.createElement("div");
  bookMessageArea.className = "book-message";
  bookDiv.appendChild(bookMessageArea);

  // Create "Borrow Book" button
  const borrowButton = document.createElement("button");
  borrowButton.textContent = "Borrow Book";
  borrowButton.type = "button";
  borrowButton.className = "btn btn-primary";

  borrowButton.addEventListener("click", () => {
    bookMessageArea.classList.remove("alert", "alert-success", "alert-danger");

    if (book.isAvailable) {
        bookMessageArea.classList.add("alert", "alert-success");
    }else{
        bookMessageArea.classList.add("alert", "alert-danger");
    }
    const message = book.borrow();
    updateBookInfo(bookInfo, book);
    displayMessage(message, bookMessageArea);
  });

  bookDiv.appendChild(borrowButton);

  // Create "Return Book" button
  const returnButton = document.createElement("button");
  returnButton.textContent = "Return Book";
  returnButton.type = "button";
  returnButton.className = "btn btn-secondary";

  returnButton.addEventListener("click", () => {
    bookMessageArea.classList.remove("alert", "alert-success", "alert-danger");

    if (!book.isAvailable) {
        bookMessageArea.classList.add("alert", "alert-success");
    }else{
        bookMessageArea.classList.add("alert", "alert-danger");
    }

    const message = book.returnBook();
    updateBookInfo(bookInfo, book);
    displayMessage(message, bookMessageArea);
  });

  bookDiv.appendChild(returnButton);

  // Add the bookDiv to the books list
  booksList.appendChild(bookDiv);
});
