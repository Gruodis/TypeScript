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
    const htmlResult: HTMLElement | null = document.getElementById('output');
    if (htmlResult) {
        const visitorDiv = createVisitorDiv(visitor);
        visitorDiv.textContent = `${action}: ${visitorDiv.textContent}`;
        htmlResult.appendChild(visitorDiv);
    } else {
        console.error('Div element not found!');
    }
};

const visitor: Person = {
    name: 'Aure',
    age: 44,
};

// Get coordinates of the two points

interface Axis {
    x: number;
    y: number;
}

const getDistance = (points: Axis): HTMLDivElement => {
    const xDiff = Math.sqrt(points.x ** 2 + points.y ** 2);
    const div = document.createElement('div');
    div.textContent = `xDiff: ${xDiff}`;
    const htmlResult = document.getElementById('output') as HTMLDivElement;
    if (htmlResult) {
        htmlResult.appendChild(div);
    } else {
        console.error('Div element not found!');
    }
    return div;
};

// const points: Axis = {
//   x: 5,
//   y: 5,
// };

const inputXAxis = document.getElementById('xAxis') as HTMLInputElement;
const inputYAxis = document.getElementById('yAxis') as HTMLInputElement;
const button = document.getElementById('calculate') as HTMLButtonElement;

if (button && inputXAxis && inputYAxis) {
    inputXAxis.oninput = () => {
        if (inputXAxis.value && inputYAxis.value) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'true');
        }
    };
    inputYAxis.oninput = () => {
        if (inputXAxis.value && inputYAxis.value) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'true');
        }
    };

    button.onclick = () => {
        console.log('Button clicked');
        if (!inputXAxis.value || !inputYAxis.value) {
            return alert('Please enter the x and y coordinates');
        }

        // points.x = parseInt(inputXAxis.value);
        // points.y = parseInt(inputYAxis.value);
        // getDistance(points);

        const x = parseFloat(inputXAxis.value);
        const y = parseFloat(inputYAxis.value);

        getDistance({ x, y });
    };
}

const birthDate = document.getElementById('birthDate') as HTMLInputElement;
const howOld = document.getElementById('howOld') as HTMLButtonElement;

const calculateAge = (birthDateValue: Date): string => {
    const currentDate = new Date();
    let yearsDiff = currentDate.getFullYear() - birthDateValue.getFullYear();
    let monthsDiff = currentDate.getMonth() - birthDateValue.getMonth();
    const daysDiff = currentDate.getDate() - birthDateValue.getDate();

    // Check if the birthday has not yet occurred this year
    const birthdayHasPassed =
        monthsDiff > 0 || (monthsDiff === 0 && daysDiff >= 0);

    if (!birthdayHasPassed) {
        yearsDiff--; // shorthand for yearsDiff = yearsDiff - 1;
        monthsDiff += 12; // shorthand for monthsDiff = monthsDiff + 12;
    }

    if (yearsDiff > 0) {
        return `${yearsDiff} years, ${monthsDiff} months, and ${daysDiff} days old`;
    } else if (monthsDiff > 0) {
        return `${monthsDiff} months and ${daysDiff} days old`;
    } else {
        return `${daysDiff} days old`;
    }
};

howOld.onclick = () => {
    console.log('Button clicked');
    if (!birthDate.value) {
        return alert('Please enter your birth date');
    } else {
        const birthDateValue = new Date(birthDate.value);

        // Call calculateAge here
        const age = calculateAge(birthDateValue);

        const div = document.createElement('div');
        div.textContent = `bDay: ${birthDate.value} - ${age}`;
        const htmlResult = document.getElementById('output') as HTMLDivElement;
        if (htmlResult) {
            htmlResult.appendChild(div);
        } else {
            console.error('Div element not found!');
        }
        return div;
    }
};

window.onload = () => {
    function oscarBirthDate() {
        // Call calculateAge here
        const age = calculateAge(new Date('2024-07-14'));

        const div = document.createElement('div');
        div.textContent = `bDay: ${age}`;
        const htmlResult = document.getElementById('output') as HTMLDivElement;
        if (htmlResult) {
            htmlResult.appendChild(div);
        } else {
            console.error('Div element not found!');
        }
        return div;
    }
    oscarBirthDate();
    handleVisitorAction(visitor, 'entered');
    handleVisitorAction(visitor, 'left');
    console.log('Age fixed', calculateAge(new Date('2024-07-14')));
};
