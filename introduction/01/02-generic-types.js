var dalyba = function (a, b) {
    if (b === 0) {
        return a;
    }
    return dalyba(b, a % b);
};
var num1 = 4;
var num2 = 8;
var result = dalyba(num1, num2);
console.log("The GCD of ".concat(num1, " and ").concat(num2, " is ").concat(result));
console.log(dalyba(4, 8)); // Output: 4
// display result insede element with id result
// when window is loaded
window.onload = function () {
    var htmlResult = document.getElementById("output");
    if (htmlResult) {
        // Access properties and methods of the div element
        htmlResult.textContent = "The GCD of ".concat(num1, " and ").concat(num2, " is ").concat(result);
    }
    else {
        console.error("Div element not found!");
    }
};
