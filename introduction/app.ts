// function getNetPrice(
//   price: number,
//   discount: number,
//   format: boolean
// ): unknown {
//   let netPrice = price - discount;
//   return format ? `$${netPrice}` : netPrice;
// }

// const netPriceNumber = <number>getNetPrice(40, 10, false);
// const netPriceString = <string>getNetPrice(40, 10, true);

// console.log(netPriceString, typeof netPriceString);
// console.log(netPriceNumber, typeof netPriceNumber);

// //////////////////
// // generics
// /////////////////

// // cloning object or array literals
// // Use generics to define type
// function cloneFun<Type>(value: Type): Type {
//   const json = JSON.stringify(value);
//   return JSON.parse(json);
// }

// const cloneArrow = <Typeas>(value: Typeas): Typeas => {
//   const json = JSON.stringify(value);
//   return JSON.parse(json);
// };

// interface Person {
//   name: string;
//   age: number;
// }

// const personeMe: Person = {
//   name: "Aure",
//   age: 44,
// };

// const myClone = cloneArrow(personeMe);
// // Output
// console.log(myClone.age, myClone.name);

// // Array
// const city: string[] = ["Tokyo", "Bali", "Mexico City", "Vancouver"];

// const cloneCity = cloneArrow<string[]>(city);

// // Addd city to warray
// cloneCity.push("Vilnius");

// //Output clone
// //cloneCity.forEach(citytas => console.log(citytas));

// //Original array not changed
// //city.forEach(citytas => console.log(citytas));

// //////////
// // Type narrowing
// /////////

// const reverseArrow = (value: string | string[]) => {
//   if (typeof value === "string") {
//     return value.split("").reverse().join("");
//   } else {
//     return [...value].reverse();
//   }
// };

// // Output
// const reversedString = reverseArrow("hello"); // reversedString will be "olleh"
// const reversedArray = reverseArrow(["a", "b", "c"]); // reversedArray will be ["c", "b", "a"]

// console.log(reversedString, reversedArray);
