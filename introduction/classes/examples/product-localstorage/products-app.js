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
    getFormattedDate(locale = "lt-LT", options) {
        const date = new Date(this._date);
        return date.toLocaleDateString(locale, options);
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
const sortByDate = () => {
    warehouse.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });
};
const sortByPrice = () => {
    warehouse.sort((a, b) => {
        const priceA = a.priceWithTax();
        const priceB = b.priceWithTax();
        return priceB - priceA;
    });
};
const sortByName = () => {
    warehouse.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        else if (a.name > b.name) {
            return 1;
        }
        else {
            return 0;
        }
    });
};
const sortByDateBtn = document.getElementById("sortByDate");
const sortByPriceBtn = document.getElementById("sortByPrice");
const sortByNameBtn = document.getElementById("sortByName");
sortByDateBtn.addEventListener("click", () => {
    sortByDate();
    displayProducts();
});
// check if button exists
if (sortByPriceBtn && warehouse.length > 0) {
    sortByPriceBtn.addEventListener("click", () => {
        sortByPrice();
        displayProducts();
    });
}
// check if button exists
if (sortByNameBtn && warehouse.length > 0) {
    sortByNameBtn.addEventListener("click", () => {
        sortByName();
        displayProducts();
    });
}
const displayProducts = () => {
    const outputData = document.getElementById("products-list");
    if (outputData && warehouse.length > 0) {
        outputData.innerHTML = "";
        // stringify data
        // outputData.innerHTML = JSON.stringify(warehouse, null, 2);
        warehouse.forEach((product) => {
            console.log(typeof product.date);
            const productDiv = document.createElement("li");
            productDiv.className = "list-group-item";
            productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $${product.priceWithTax().toFixed(2)}</p>
                    <p>Quantity: ${product["_quantity"]}</p>
                    <p>Date Added: ${product.getFormattedDate("lt-LT", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            })}</p>
                `;
            outputData.appendChild(productDiv);
        });
    }
};
// Display products on page load
displayProducts();
// data.forEach((product: ProductData) => {
//     const temp = new Products(product._name, product._price, product._quantity);
//     parsedProducts.push(
//         temp
//     );
// });
//console.log(`parsed data frpm api`, data[0].name);
