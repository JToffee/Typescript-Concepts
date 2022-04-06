// intersection types - allow us to combine other types
// 1. With objects - it's a combination of the object properties

type Admin = {
	name: string;
	priviledges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

//Intersection type

type ElevatedEmployee = Admin & Employee;

const employee1: ElevatedEmployee = {
	name: "sheila",
	priviledges: ["create-server"],
	startDate: new Date(),
};

// 2. With primitives - The type they have in commom is the intersection type

type Combinable = string | number;

type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Usecase

// --------------------------- Type Guards and function overloads--------------------------

// 1. Primitive types
// Function overloads - Used when typescript is unable to infer the return type

function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}

const result1 = add(1000, 53939);
const result2 = add("Sheila", "Jerotich");
result2.split(" ");

//2. Objects

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(employee: UnknownEmployee) {
	console.log(`Name: ${employee.name}`);
	if ("priviledges" in employee)
		console.log(`Priviledges: ${employee.priviledges}`);
	if ("startDate" in employee) console.log(`Start Date: ${employee.startDate}`);
}

printEmployeeInfo(employee1);
printEmployeeInfo({ name: "Jsa", startDate: new Date() });

// 3. Classes

class Car {
	drive() {
		console.log("Driving a car...");
	}
}
class Truck {
	drive() {
		console.log("Driving a truck...");
	}

	loadCargo(amount: number) {
		console.log(`Loading cargo ${amount}`);
	}
}

type Vehicle = Car | Truck;

const vehicle1 = new Car();
const vehicle2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	// if ("loadCargo" in vehicle) vehicle.loadCargo(1000);
	if (vehicle instanceof Truck) vehicle.loadCargo(1000);
}

useVehicle(vehicle1);
useVehicle(vehicle2);

//-------------------Discriminate Unions --------------------
// -Pattern used to make implemeting typeguards easier when working with unions
//object types only

//  instance of doesn't work in interfaces because they do not have a constructor function
interface Bird {
	type: "bird";
	flyingSpeed: number;
}

const bird1: Bird = {
	type: "bird",
	flyingSpeed: 300,
};
interface Horse {
	type: "horse";
	runningSpeed: number;
}

const horse1 = {
	runningSpeed: 500,
};
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.type) {
		case "bird":
			speed = animal.flyingSpeed;
			break;
		case "horse":
			speed = animal.runningSpeed;
			break;
	}
	console.log(`Moving at speed: ${speed}`);
}

moveAnimal(bird1);

//-------------------------Type casting--------------------------

// Tells typescript that a value is of a certain type when  TS is unable to infer the type

// const inputElement = <HTMLInputElement>document.getElementById("user-input")!;

const inputElement = document.getElementById("user-input")! as HTMLInputElement;

inputElement.value = "Hi there";

// ! - tells TS the value will never return null

//Alterntively
const testEl = document.getElementById("user-input");

if (testEl) (testEl as HTMLInputElement).value = "Hi there";

//-----------------------Index properties----------------

// 1.index types - allow us to create object which are more flexible regarding the properties they might have
// -We dont need to know in advance which property names we want to use and how many properties we need
interface errorContainer {
	//Holds properties for inputs where we have an error
	[prop: string]: string;
}
const errorBag: errorContainer = {
	email: "Not a valid email",
	userName: "Username not available",
};

//----------------------Optional chaining---------------------------

//access nested properties and nested objects safely in the object data

const fetchedUserData = {
	id: "SJ",
	name: "Sheila Jerotich",
	job: {
		// title: "CEO",
		description: "Toff industries leader",
	},
};

const title = fetchedUserData?.job?.title;

//-----------------------Nullish coalescing Operator------------

//Null and undefined are the only falsey values

const userInput = 0;

const storedData = userInput ?? "Default";

console.log(storedData);
