interface Person {
    name: string;
    age: number;
    job?: string;
  }
  
  const createVisitorDiv = (visitor: Person): HTMLDivElement => {
    const div = document.createElement('div');
    div.textContent = `Name: ${visitor.name}, Age: ${visitor.age}`;
    return div;
  };
  
  const handleVisitorAction = (visitor: Person, action: string) => {
    const htmlResult = document.getElementById("output") as HTMLDivElement;
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
  

    const getDistance = (points: Axis): number => {
        const xDiff = Math.sqrt(points.x ** 2 + points.y ** 2);
        return xDiff;
    };

const points:Axis = {
    x: 5,
    y: 5
}
  window.onload = () => {
    handleVisitorAction(visitor, "entered");
    handleVisitorAction(visitor, "left");
    console.log(getDistance(points));
  };