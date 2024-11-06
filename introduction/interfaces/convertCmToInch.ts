const cmToInch = document.getElementById("cmToInch") as HTMLInputElement;
const inchToCm = document.getElementById("inchToCm") as HTMLInputElement;

interface Converter {
    cm: number;
    inch: number;
};



const convertCmToInch = (cm: number): string => {
  return (cm * 2.54).toFixed(3);
};

const convertInchToCm = (inches: number): string => {
  return (inches / 2.54).toFixed(3);
};

if (inchToCm && cmToInch) {
  inchToCm.addEventListener('input', () => {
    const cm = convertInchToCm(inchToCm.valueAsNumber);
    cmToInch.value = cm; // Set the cm value directly
  });

  cmToInch.addEventListener('input', () => {
    const inches = convertCmToInch(cmToInch.valueAsNumber);
    inchToCm.value = inches; // Set the inches value directly
  });
}

const units = {
    cm: 0,
    inch: 0,
}