"use strict";
function getNetPrice(price, discount, format) {
    const netPrice = price - discount;
    return format ? `$${netPrice}` : netPrice;
}
const netPriceNumber = getNetPrice(40, 10, false);
const netPriceString = getNetPrice(40, 10, true);
console.log(netPriceString, typeof netPriceString);
console.log(netPriceNumber, typeof netPriceNumber);
//////////////////
// generics
/////////////////
// cloning object or array literals
// Use generics<Type> <T> or <YouCanCallAnything> to define type
// function cloneFun<Type>(value: Type): Type {
//     const json = JSON.stringify(value);
//     return JSON.parse(json);
// }
const cloneArrow = (value) => {
    const json = JSON.stringify(value);
    return JSON.parse(json);
};
const personeMe = {
    name: 'Aure',
    age: 44,
};
const myClone = cloneArrow(personeMe);
// Output
console.log(myClone.age, myClone.name);
// Array
const city = ['Tokyo', 'Bali', 'Mexico City', 'Vancouver'];
const cloneCity = cloneArrow(city);
// Addd city to warray
cloneCity.push('Vilnius');
//Output clone
//cloneCity.forEach(citytas => console.log(citytas));
//Original array not changed
//city.forEach(citytas => console.log(citytas));
//////////
// Type narrowing
/////////
const reverseArrow = (value) => {
    if (typeof value === 'string') {
        return value.split('').reverse().join('');
    }
    else {
        return [...value].reverse();
    }
};
// Output
const reversedString = reverseArrow('hello'); // reversedString will be "olleh"
const reversedArray = reverseArrow(['a', 'b', 'c']); // reversedArray will be ["c", "b", "a"]
console.log(reversedString, reversedArray);
const factorial = (n) => {
    if (n < 0) {
        throw new Error('Factorial is not defined for negative numbers.');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
};
// Example usage:
console.log(factorial(3)); // Output: 120
