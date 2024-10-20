var createVisitorDiv = function (visitor) {
    var div = document.createElement('div');
    div.textContent = "Name: ".concat(visitor.name, ", Age: ").concat(visitor.age);
    return div;
};
var handleVisitorAction = function (visitor, action) {
    var htmlResult = document.getElementById("output");
    if (htmlResult) {
        var visitorDiv = createVisitorDiv(visitor);
        visitorDiv.textContent = "".concat(action, ": ").concat(visitorDiv.textContent);
        htmlResult.appendChild(visitorDiv);
    }
    else {
        console.error("Div element not found!");
    }
};
var visitor = {
    name: "Aure",
    age: 44,
};
var getDistance = function (points) {
    var xDiff = Math.sqrt(Math.pow(points.x, 2) + Math.pow(points.y, 2));
    return xDiff;
};
var points = {
    x: 5,
    y: 5
};
window.onload = function () {
    handleVisitorAction(visitor, "entered");
    handleVisitorAction(visitor, "left");
    console.log(getDistance(points));
};
