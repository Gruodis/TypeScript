"use strict";
const createVisitorDiv = (visitor) => {
    const div = document.createElement("div");
    div.textContent = `Name: ${visitor.name}, Age: ${visitor.age}`;
    return div;
};
const handleVisitorAction = (visitor, action) => {
    const htmlResult = document.getElementById("output");
    if (htmlResult) {
        const visitorDiv = createVisitorDiv(visitor);
        visitorDiv.textContent = `${action}: ${visitorDiv.textContent}`;
        htmlResult.appendChild(visitorDiv);
    }
    else {
        console.error("Div element not found!");
    }
};
let visitor = {
    name: "Aure",
    age: 44,
};
const getDistance = (points) => {
    const xDiff = Math.sqrt(points.x ** 2 + points.y ** 2);
    const div = document.createElement("div");
    div.textContent = `xDiff: ${xDiff}`;
    const htmlResult = document.getElementById("output");
    if (htmlResult) {
        htmlResult.appendChild(div);
    }
    else {
        console.error("Div element not found!");
    }
    return div;
};
const points = {
    x: 0,
    y: 0,
};
const inputXAxis = document.getElementById("xAxis");
const inputYAxis = document.getElementById("yAxis");
const button = document.getElementById("calculate");
if (button && inputXAxis && inputYAxis) {
    inputXAxis.oninput = () => {
        if (inputXAxis.value && inputYAxis.value) {
            button.removeAttribute("disabled");
        }
        else {
            button.setAttribute("disabled", "true");
        }
    };
    inputYAxis.oninput = () => {
        if (inputXAxis.value && inputYAxis.value) {
            button.removeAttribute("disabled");
        }
        else {
            button.setAttribute("disabled", "true");
        }
    };
    button.onclick = () => {
        console.log("Button clicked");
        if (!inputXAxis.value || !inputYAxis.value) {
            return alert("Please enter the x and y coordinates");
        }
        points.x = parseInt(inputXAxis.value);
        points.y = parseInt(inputYAxis.value);
        getDistance(points);
    };
}
window.onload = () => {
    handleVisitorAction(visitor, "entered");
    handleVisitorAction(visitor, "left");
    console.log(getDistance(points));
};
