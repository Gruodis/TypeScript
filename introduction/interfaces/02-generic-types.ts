const dalyba = (a: number, b: number): number => {

    if (b === 0) {
        return a;
    }
    return dalyba(b, a % b)
}


const num1 = 4;
const num2 = 8;
const result = dalyba(num1, num2);
console.log(`The GCD of ${num1} and ${num2} is ${result}`);
console.log(dalyba(4, 8)); // Output: 4

// display result insede element with id result
// when window is loaded
window.onload = () => {
  const htmlResult = document.getElementById("output") as HTMLDivElement;

  if (htmlResult) {
    // Access properties and methods of the div element
    htmlResult.textContent = `The GCD of ${num1} and ${num2} is ${result}`;
  } else {
    console.error("Div element not found!");
  }
};
