"use strict";
class Persona {
    // you can remove the properties and use the constructor parameters
    // name: string;
    // age: number;
    // email: string;
    constructor(
    // !!! if you declare the properties in the constructor, you don't need to declare them in the class
    _name, _age, _email) {
        // you can remove the properties and use the constructor parameters
        // this.name = name;
        // this.age = age;
        // this.email = email||'no email';
        // this.greet();
        this._name = _name;
        this._age = _age;
        this._email = _email;
    }
    greet() {
        console.log('Hello', this._name, 'You are', this._age + 22, 'years old', this._email);
    }
    // setters for TypeScript
    set age(ageNew) {
        if (ageNew < 50) {
            throw new Error('Age must be greater than 50');
        }
        this._age = ageNew;
    }
    // public setAge(ageNew: number) {
    //     if (ageNew < 50) {
    //         throw new Error('Age must be greater than 50');
    //     }
    //     this.age = ageNew;
    // }
    // getters for TypeScript
    get age() {
        return this._age;
    }
}
// interface Human {
//     name: string
//     age: number
//     greet: () => void
// }
// for type and interface
let john = { name: 'John', age: 44, greet: () => { console.log('Hello!'); } };
// for class
let jane = new Persona('Jane', 44);
let johna = new Persona('Johna', 14, "john@gmail.com");
//johna.setAge(12);
johna.age = 55;
console.log(`Johna age: `, johna.age);
jane.greet();
johna.greet();
