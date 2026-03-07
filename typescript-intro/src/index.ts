/**
 * 
 * Basic Types :
 * string let name: string = "John"
 * number let age: number = 30
 * boolean let isActive:boolean = true;
 * any - let anything: any = 5; something = "Hello";
 * array let studentAge: number[] = [20,50,56]
 * tuple - let user: [string, number] = ["John", 25]
 * enum - enum Role {Admin, User}; let r: Role = Role.Admin or Role.User
 */

let username: string = "Alice";
let age: number = 25;
let isAdmin: boolean = true;

// console.log("User:", username)
// console.log("Age:", age)
// console.log("Admin:", isAdmin)

// FUnctions 

function greet(name: string, age: number){
    return ` Hello ${name}!, your age is ${age}`;
}

// console.log(greet(username, age))

// array with type
let studentScores: number[] = [45,70, 50];
console.log(studentScores);

// Object Interface - It defines structure that Object should have

interface User {
    readonly id: number,
    name: string,
    age: number,
    isActive?: boolean // optional (?)
}

interface Employee extends User {
    employeeId: number
}

const user: Employee = {
    id: 1,
    name: "Taiwo",
    age: 90,
    employeeId: 10001
}

// user.id = 10; // Readonly property 

interface MathOperation {
    (a: number, b: number) : number
}

const add: MathOperation = (x,y) => x + y;

const multiply: MathOperation = (x,y) => x *y;

console.log(add(5,6));
console.log(multiply(5,6));
