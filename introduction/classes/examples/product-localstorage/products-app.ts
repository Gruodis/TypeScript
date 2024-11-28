class Products {
  constructor(
    private _name: string,
    private _price: number,
    private _quantity: number,
    private _date: Date = new Date()
  ) {}

  get name() {
    return this._name;
  }
  get date() {
    return this._date;
  }

  get quantity() {
    return this._quantity;
  }

  // Method to get formatted date
  getFormattedDate(
    locale: string = "lt-LT",
    defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }
  ): string {
    const date = new Date(this._date);

    return date.toLocaleDateString(locale, defaultOptions);
  }

  priceWithTax() {
    return this._price * 1.21;
  }
}

// get input fields
const inputName = document.getElementById("name") as HTMLInputElement;
const inputPrice = document.getElementById("price") as HTMLInputElement;
const inputQuantity = document.getElementById("quantity") as HTMLInputElement;

const total = document.getElementById("total") as HTMLDivElement;

// get button element
const addProductBtn = document.getElementById(
  "addProductBtn"
) as HTMLButtonElement;

// Initialize warehouse from localStorage or empty array
let warehouse: Products[] = [];

// Function to load warehouse from localStorage
const loadWarehouse = () => {
  const data = localStorage.getItem("warehouse");
  if (data) {
    JSON.parse(data).forEach((product: ProductData) => {
      const temp = new Products(
        product._name,
        product._price,
        product._quantity,
        product._date
      );

      warehouse.push(temp);
    });
    //warehouse = JSON.parse(data);
  }
};

// Function to save warehouse to localStorage
const saveWarehouse = () => {
  localStorage.setItem("warehouse", JSON.stringify(warehouse));
};

// Load existing data on page load
loadWarehouse();

// add event listener to button
addProductBtn.addEventListener("click", () => {
  const name = inputName.value.trim();
  const price = Number(inputPrice.value);
  const quantity = Number(inputQuantity.value);

  if (name && price > 0 && quantity > 0) {
    const product = new Products(name, price, quantity);
    warehouse.push(product); // Add to warehouse array
    saveWarehouse(); // Save updated array to localStorage
    console.log("Product added:", product);

    // Clear input fields
    inputName.value = "";
    inputPrice.value = "";
    inputQuantity.value = "";
  } else {
    console.error("Please enter valid product details.");
  }

  // clear input fields
  inputName.value = "";
  inputPrice.value = "";
  inputQuantity.value = "";

  displayProducts();
  countTotal();
});

interface ProductData {
  _name: string;
  _price: number;
  _quantity: number;
  _date: Date;
}

function sortByDate(order: "asc" | "desc" = "asc") {
  warehouse.forEach((product) => {
    console.log(`product date: ${product.date}`); // Debugging log
  });

  warehouse.sort((a: Products, b: Products): number => {
    const dateA: number = new Date(a.date).getTime();
    const dateB: number = new Date(b.date).getTime();
    console.log(`dateA: ${dateA}, dateB: ${dateB}`); // Debugging log
    if (order === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
}

// Update the sortByPrice function to accept a sorting order parameter
function sortByPrice(order: "asc" | "desc" = "asc") {
  warehouse.sort((a, b) => {
    if (order === "asc") {
      return a.priceWithTax() - b.priceWithTax();
    } else {
      return b.priceWithTax() - a.priceWithTax();
    }
  });
}

// Update the sortByName function to accept a sorting order parameter
const sortByName = (order: "asc" | "desc" = "asc") => {
  warehouse.sort((a, b) => {
    if (order === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
};

const sortByDateBtn = document.getElementById(
  "sortByDate"
) as HTMLButtonElement;

const sortByPriceBtn = document.getElementById(
  "sortByPrice"
) as HTMLButtonElement;

const sortByNameBtn = document.getElementById(
  "sortByName"
) as HTMLButtonElement;

const resetSortingBtn = document.getElementById(
  "resetSorting"
) as HTMLButtonElement;

// i want to select span element inside sortByDateBtn element
const sortByDateSpan = sortByDateBtn.querySelector("span") as HTMLSpanElement;
const sortByPriceSpan = sortByPriceBtn.querySelector("span") as HTMLSpanElement;
const sortByNameSpan = sortByNameBtn.querySelector("span") as HTMLSpanElement;

const resetSorting = () => {
  // warehouse = JSON.parse(localStorage.getItem("warehouse") || "[]");
  const outputData = document.getElementById(
    "products-list"
  ) as HTMLUListElement;

  if (outputData) {
    outputData.innerHTML = "";
    warehouse = [];
    loadWarehouse();
    displayProducts();
  }
};

if (resetSortingBtn && warehouse.length > 0) {
  resetSortingBtn.addEventListener("click", resetSorting);
}
let isDateAscending = true; // Flag to track date sorting order

if (sortByDateBtn && warehouse.length > 0) {
  sortByDateBtn.addEventListener("click", () => {
    if (isDateAscending) {
      sortByDate("asc"); // Sort from earliest to latest
      sortByDateSpan.innerHTML = "↓";
    } else {
      sortByDate("desc"); // Sort from latest to earliest
      sortByDateSpan.innerHTML = "↑";
    }
    displayProducts();
    isDateAscending = !isDateAscending; // Toggle the date sorting order
  });
}

let isPriceAscending: boolean = true; // Flag to track price sorting order

// check if button exists
if (sortByPriceBtn && warehouse.length > 0) {
  sortByPriceBtn.addEventListener("click", () => {
    if (isPriceAscending) {
      sortByPrice("asc"); // Sort from low to high
      sortByPriceSpan.innerHTML = "↓";
    } else {
      sortByPrice("desc"); // Sort from high to low
      sortByPriceSpan.innerHTML = "↑";
    }
    displayProducts();
    isPriceAscending = !isPriceAscending; // Toggle the price sorting order
  });
}

let isAscending: boolean = true; // Flag to track sorting order

if (sortByNameBtn && warehouse.length > 0) {
  sortByNameBtn.addEventListener("click", () => {
    if (isAscending) {
      sortByName("asc"); // Sort from A to Z
      sortByNameSpan.innerHTML = "A-Z";
    } else {
      sortByName("desc"); // Sort from Z to A
      sortByNameSpan.innerHTML = "Z-A";
    }
    displayProducts();
    isAscending = !isAscending; // Toggle the sorting order
  });
}

const deleteProduct = (index: number) => {
  warehouse.splice(index, 1);
  saveWarehouse();
  displayProducts();
  countTotal();
};

const createProductListItems = (product: Products, index: number) => {
  const outputData = document.getElementById("products-list") as HTMLDivElement;
  const productDiv = document.createElement("li") as HTMLLIElement;
  productDiv.className = "list-group-item";

  // Create and append the product name
  const productName = document.createElement("h3");
  productName.textContent = `${product.name} index ${index}`;
  productDiv.appendChild(productName);

  // Create and append the product price
  const productPrice = document.createElement("p");
  productPrice.textContent = `Price: $${product.priceWithTax().toFixed(2)}`;
  productDiv.appendChild(productPrice);

  // Create and append the product quantity
  const productQuantity = document.createElement("p");
  productQuantity.textContent = `Quantity: ${product["_quantity"]}`;
  productDiv.appendChild(productQuantity);

  // Create and append the product date
  const productDate = document.createElement("p");
  productDate.textContent = `Date Added: ${product.getFormattedDate("en-GB")}`;
  productDiv.appendChild(productDate);

  // Create and append the delete button
  const deleteButton = createDeleteButton(index);
  productDiv.appendChild(deleteButton);

  outputData.appendChild(productDiv);
};

const createDeleteButton = (index: number): HTMLButtonElement => {
  const deleteButton = document.createElement("button") as HTMLButtonElement;
  deleteButton.className = "btn btn-danger";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteProduct(index);
  });
  return deleteButton;
};

const displayProducts = () => {
  const outputData = document.getElementById("products-list") as HTMLDivElement;
  if (outputData && warehouse.length > 0) {
    outputData.innerHTML = "";

    warehouse.forEach((product: Products, index: number) => {
      createProductListItems(product, index);
    });
  } else {
    outputData.innerHTML = "<p>No products available</p>";
  }
};

const clearProducts = () => {
  localStorage.removeItem("warehouse");
  warehouse = [];
  displayProducts();
};

const clearProductsBtn = document.getElementById(
  "removeAllProducts"
) as HTMLButtonElement;

if (clearProductsBtn) {
  clearProductsBtn.addEventListener("click", clearProducts);
}

const countTotal = () => {
  let totalSum = 0;
  if (total) {
    warehouse.forEach((product: Products) => {
      totalSum += product.priceWithTax() * product.quantity;
    });
  }
  return (total.innerHTML = totalSum.toFixed(2));
};

if (total) {
  total.innerHTML = `Total products: ${countTotal()}`;
}
// Display products on page load
window.onload = () => {
  displayProducts();
  console.log("Page loaded");
};
