"use strict";
class Products {
    _name;
    _price;
    _quantity;
    _date;
    constructor(_name, _price, _quantity, _date = new Date()) {
        this._name = _name;
        this._price = _price;
        this._quantity = _quantity;
        this._date = _date;
    }
    get name() {
        return this._name;
    }
    get date() {
        return this._date;
    }
    // Method to get formatted date
    getFormattedDate(locale = "lt-LT", defaultOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }) {
        const date = new Date(this._date);
        return date.toLocaleDateString(locale, defaultOptions);
    }
    priceWithTax() {
        return this._price * 1.21;
    }
}
// get input fields
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputQuantity = document.getElementById("quantity");
// get button element
const addProductBtn = document.getElementById("addProductBtn");
// Initialize warehouse from localStorage or empty array
let warehouse = [];
// Function to load warehouse from localStorage
const loadWarehouse = () => {
    const data = localStorage.getItem("warehouse");
    if (data) {
        JSON.parse(data).forEach((product) => {
            const temp = new Products(product._name, product._price, product._quantity, product._date);
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
    }
    else {
        console.error("Please enter valid product details.");
    }
    // clear input fields
    inputName.value = "";
    inputPrice.value = "";
    inputQuantity.value = "";
    displayProducts();
});
function sortByDate(order = "asc") {
    warehouse.forEach((product) => {
        console.log(`product date: ${product.date}`); // Debugging log
    });
    warehouse.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        console.log(`dateA: ${dateA}, dateB: ${dateB}`); // Debugging log
        if (order === "asc") {
            return dateA - dateB;
        }
        else {
            return dateB - dateA;
        }
    });
}
// Update the sortByPrice function to accept a sorting order parameter
function sortByPrice(order = "asc") {
    warehouse.sort((a, b) => {
        if (order === "asc") {
            return a.priceWithTax() - b.priceWithTax();
        }
        else {
            return b.priceWithTax() - a.priceWithTax();
        }
    });
}
// Update the sortByName function to accept a sorting order parameter
const sortByName = (order = "asc") => {
    warehouse.sort((a, b) => {
        if (order === "asc") {
            return a.name.localeCompare(b.name);
        }
        else {
            return b.name.localeCompare(a.name);
        }
    });
};
const sortByDateBtn = document.getElementById("sortByDate");
const sortByPriceBtn = document.getElementById("sortByPrice");
const sortByNameBtn = document.getElementById("sortByName");
const resetSortingBtn = document.getElementById("resetSorting");
// i want to select span element inside sortByDateBtn element
const sortByDateSpan = sortByDateBtn.querySelector("span");
const sortByPriceSpan = sortByPriceBtn.querySelector("span");
const sortByNameSpan = sortByNameBtn.querySelector("span");
const resetSorting = () => {
    // warehouse = JSON.parse(localStorage.getItem("warehouse") || "[]");
    const outputData = document.getElementById("products-list");
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
        }
        else {
            sortByDate("desc"); // Sort from latest to earliest
            sortByDateSpan.innerHTML = "↑";
        }
        displayProducts();
        isDateAscending = !isDateAscending; // Toggle the date sorting order
    });
}
let isPriceAscending = true; // Flag to track price sorting order
// check if button exists
if (sortByPriceBtn && warehouse.length > 0) {
    sortByPriceBtn.addEventListener("click", () => {
        if (isPriceAscending) {
            sortByPrice("asc"); // Sort from low to high
            sortByPriceSpan.innerHTML = "↓";
        }
        else {
            sortByPrice("desc"); // Sort from high to low
            sortByPriceSpan.innerHTML = "↑";
        }
        displayProducts();
        isPriceAscending = !isPriceAscending; // Toggle the price sorting order
    });
}
let isAscending = true; // Flag to track sorting order
if (sortByNameBtn && warehouse.length > 0) {
    sortByNameBtn.addEventListener("click", () => {
        if (isAscending) {
            sortByName("asc"); // Sort from A to Z
            sortByNameSpan.innerHTML = "A-Z";
        }
        else {
            sortByName("desc"); // Sort from Z to A
            sortByNameSpan.innerHTML = "Z-A";
        }
        displayProducts();
        isAscending = !isAscending; // Toggle the sorting order
    });
}
const deleteProduct = (index) => {
    warehouse.splice(index, 1);
    saveWarehouse();
    displayProducts();
};
const createProductListItems = (product, index) => {
    const outputData = document.getElementById("products-list");
    const productDiv = document.createElement("li");
    productDiv.className = "list-group-item";
    productDiv.innerHTML = `
    <h3>${product.name} index ${index}</h3>
    <p>Price: $${product.priceWithTax().toFixed(2)}</p>
    <p>Quantity: ${product["_quantity"]}</p>
    <p>Date Added: ${product.getFormattedDate("en-GB")}</p>
  `;
    // Create and append the delete button
    const deleteButton = createDeleteButton(index);
    productDiv.appendChild(deleteButton);
    outputData.appendChild(productDiv);
};
const createDeleteButton = (index) => {
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteProduct(index);
    });
    return deleteButton;
};
const displayProducts = () => {
    const outputData = document.getElementById("products-list");
    if (outputData && warehouse.length > 0) {
        outputData.innerHTML = "";
        warehouse.forEach((product, index) => {
            createProductListItems(product, index);
            // create delete button
            // createDeleteButton(index);
        });
    }
    else {
        outputData.innerHTML = "<p>No products available</p>";
    }
};
const clearProducts = () => {
    localStorage.removeItem("warehouse");
    warehouse = [];
    displayProducts();
};
const clearProductsBtn = document.getElementById("removeAllProducts");
if (clearProductsBtn) {
    clearProductsBtn.addEventListener("click", clearProducts);
}
// Display products on page load
window.onload = () => {
    displayProducts();
    console.log("Page loaded");
};
