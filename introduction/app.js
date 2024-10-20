var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function getNetPrice(price, discount, format) {
    var netPrice = price - discount;
    return format ? "$".concat(netPrice) : netPrice;
}
var netPriceNumber = getNetPrice(40, 10, false);
var netPriceString = getNetPrice(40, 10, true);
console.log(netPriceString, typeof netPriceString);
console.log(netPriceNumber, typeof netPriceNumber);
//////////////////
// generics
/////////////////
// cloning object or array literals
// Use generics to define type
function cloneFun(value) {
    var json = JSON.stringify(value);
    return JSON.parse(json);
}
var cloneArrow = function (value) {
    var json = JSON.stringify(value);
    return JSON.parse(json);
};
var personeMe = {
    name: "Aure",
    age: 44,
};
var myClone = cloneArrow(personeMe);
// Output
console.log(myClone.age, myClone.name);
// Array
var city = ["Tokyo", "Bali", "Mexico City", "Vancouver"];
var cloneCity = cloneArrow(city);
// Addd city to warray
cloneCity.push("Vilnius");
//Output clone
//cloneCity.forEach(citytas => console.log(citytas));
//Original array not changed
//city.forEach(citytas => console.log(citytas));
//////////
// Type narrowing
/////////
var reverseArrow = function (value) {
    if (typeof value === "string") {
        return value.split("").reverse().join("");
    }
    else {
        return __spreadArray([], value, true).reverse();
    }
};
// Output
var reversedString = reverseArrow("hello"); // reversedString will be "olleh"
var reversedArray = reverseArrow(["a", "b", "c"]); // reversedArray will be ["c", "b", "a"]
console.log(reversedString, reversedArray);
