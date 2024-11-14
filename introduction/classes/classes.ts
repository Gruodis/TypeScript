
class Persona {
    // you can remove class properties and use the constructor parameters instead
    // name: string;
    // age: number;
    // email: string;

    constructor(
        // !!! if you declare the properties in the constructor, 
        // you don't need to declare them in the class

        // declare the properties in the constructor with "_" to avoid naming conflicts
        // between the constructor parameters and the class methods (setters and getters)
        private _name: string, 
        private _age: number, 
        private _email?: string
    ) {
        // you can remove these properties 
        // and use the constructor parameters(_name, _age, _email) instead,
        // like in example above 

        // this.name = name;
        // this.age = age;
        // this.email = email||'no email';
        // this.greet();
    
    }

    // public method
    public greet() {
        console.log(
            'Hello', this._name, 'You are', this._age + 22, 'years old', this._email
        );
    }

    // setter PROPERTY Method
    set age(ageNew: number) {
        if (ageNew < 50) {
            throw new Error('Age must be greater than 50');
        }
        this._age = ageNew;
    }

    // setter Method
    // public setAge(ageNew: number) {
    //     if (ageNew < 50) {
    //         throw new Error('Age must be greater than 50');
    //     }
    //     this.age = ageNew;
    // }

    // getters for TypeScript (public by default)
    get age() {
        return this._age;
    }


    // public getAge() {
    //     return this.age;
    // }
}

// interface Human {
//     name: string
//     age: number

//     greet: () => void
// }


// for class
let jane = new Persona('Jane', 44);
let johna = new Persona('Johna', 14, "john@gmail.com");

//johna.setAge(12);
johna.age = 55;
console.log(`Johna age: `, johna.age);

jane.greet();
johna.greet();