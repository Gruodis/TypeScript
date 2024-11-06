interface Person {
  name: string;
  age: number;
  job?: string;
}

const createVisitorDiv = (visitor: Person): HTMLDivElement => {
  const div = document.createElement("div");
  div.textContent = `Name: ${visitor.name}, Age: ${visitor.age}`;
  return div;
};

const handleVisitorAction = (visitor: Person, action: string) => {
  const htmlResult:HTMLElement|null = document.getElementById("output");
  if (htmlResult) {
    const visitorDiv = createVisitorDiv(visitor);
    visitorDiv.textContent = `${action}: ${visitorDiv.textContent}`;
    htmlResult.appendChild(visitorDiv);
  } else {
    console.error("Div element not found!"); 
  }
};

let visitor: Person = {
  name: "Aure",
  age: 44,
};

// Get coordinates of the two points

interface Axis {
  x: number;
  y: number;
}

const getDistance = (points: Axis): HTMLDivElement => {
  const xDiff = Math.sqrt(points.x ** 2 + points.y ** 2);
  const div = document.createElement("div");
  div.textContent = `xDiff: ${xDiff}`;
  const htmlResult = document.getElementById("output") as HTMLDivElement;
    if (htmlResult) {
        htmlResult.appendChild(div);
    } else {
        console.error("Div element not found!");
    }
  return div;
};

const points: Axis = {
  x: 0,
  y: 0,
};

const inputXAxis = <HTMLInputElement> document.getElementById("xAxis");
const inputYAxis = <HTMLInputElement> document.getElementById("yAxis");
const button = <HTMLButtonElement> document.getElementById("calculate");

if (button && inputXAxis && inputYAxis) {
    inputXAxis.oninput = () => {
        if (inputXAxis.value && inputYAxis.value) {
            button.removeAttribute("disabled");
        }
        else {
            button.setAttribute("disabled", "true");
        }
    }
    inputYAxis.oninput = () => {
        if (inputXAxis.value && inputYAxis.value) {
            button.removeAttribute("disabled");
        }
        else {
            button.setAttribute("disabled", "true");
        }   
    }

  button.onclick = () => {
    console.log("Button clicked");
    if (!inputXAxis.value || !inputYAxis.value) {
        return alert("Please enter the x and y coordinates");
      }
  
      points.x = parseInt(inputXAxis.value);
      points.y = parseInt(inputYAxis.value);
      getDistance(points);
  }
}

window.onload = () => {
  handleVisitorAction(visitor, "entered");
  handleVisitorAction(visitor, "left");
  console.log(getDistance(points));
};
