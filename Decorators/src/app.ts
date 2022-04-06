//Decorators - functions that are prefixed @expression symbol, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

//  - functions useful for metaprogramming - used to add metadata to existeng code in a declarative way

// -no direct impact on end users. Makes it easier for other devs to use

//1. First class decorator

//Executes when a class is declared - class definition encountered
// -When used with a class, it takes in the constructor as an  argument

function Logger1(constructor: Function) {
	console.log("Loggging");
	console.log(constructor);
}

//Decorater factory - returns a decorator fx but allows us to configure it when we assign it as a decorator to something. We can pass arguments to a decorator factory because we call it.
// -Customize values the decorator fx uses when it executes with the factory fx

function Logger(logString: string) {
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	};
}

//Gets added to a class
function WithTemplate(template: string, hookId: string) {
	return function <T extends { new (...args: any[]): { name: string } }>(
		originalConstructor: T
	) {
		return class extends originalConstructor {
			constructor(...args: any[]) {
				super();
				console.log("Rendering template");

				const hookEl = document.getElementById(hookId);
				// const p = new originalConstructor();
				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector("h1")!.textContent = this.name;
				}
			}
		};
	};
}
//Creation happens top-down
//Executed from the bottom up
@Logger("Ski")
@WithTemplate("<h1> Decorator <h1>", "app")
class Person {
	name = "Sheila";

	constructor() {
		console.log("Creating object person...");
	}
}

const person = new Person();

console.log(person);

function Log(target: any, propertyName: string | number | boolean) {
	console.log("Property decorator");
	console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("Accessor decorator");
	console.log(target);
	console.log(name);
	console.log(descriptor);
	// return {enumerable};
}
function Log3(
	target: any,
	name: string | symbol,
	descriptor: PropertyDescriptor
) {
	console.log("Method decorator");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

function Log4(target: any, name: string | symbol, position: number) {
	console.log("Parameter decorator");
	console.log(target);
	console.log(name);
	console.log(position);
}
class Product {
	//Property decorator - receives two arguments - target(prototype or constructor fx), property name
	//Executed when the property is defined- class definitionis registered
	@Log
	title: string;
	private _price: number;

	constructor(title: string, price: number) {
		this.title = title;
		this._price = price;
	}

	//Accessor decorator - receives in three arguments - target(prototype or constructor fx), property name, and property descriptor
	@Log2
	set price(value: number) {
		if (value > 0) this._price = value;
		else throw new Error("Invalid price - should be positive");
	}
	//Method decorator(Log3) - receives in three arguments - target(prototype or constructor fx), property name, and property descriptor

	//Parameter decorator (Log4) - receives in three arguments - target(prototype or constructor fx), name(method name), and position(index in arguments list-starts at 0)

	@Log3
	getPricewithTax(@Log4 tax: number) {
		return this.price * (1 + tax);
	}
}

//Order of execution -execute when the class is defined. Allows dev to do behind the scenes additional setup work. Add metadata

// --------------Returning from a decorator-----------
// -Return type depends on what kind of data you're working with

//Gets added to a class - return class, constructor fx

//-Class, method , accessor decorators return values that can be used

//Target is prototype of the object the property sits on, else constructor fx if the property is static

// Class returns a class
//method and accessor return - property descriptor
//-Property and parameter decorators can return values but they are ignored. Cant be used

// In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from the same class.

//-------------------Implementing autobind------------------------

function Autobind(
	target: any,
	methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	const newDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return newDescriptor;
}
class Printer {
	message = "This works";
	@Autobind
	showMessage() {
		console.log(this.message);
	}
}
const printer = new Printer();

const button = document.querySelector("button")!;

button.addEventListener("click", printer.showMessage);

//-------------------------Validation with decorators----------------------------

//Interface to configure storage - stores objects (validators)
interface ValidatorConfig {
	[property: string]: {
		[validatableProp: string]: string[]; //['requires', 'positive'] - validators
	};
}
const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propertyName]: ["required"],
	}; //Registers classname as a key and propertyname as a key and value required as a string to the string array
}
function PositiveNumber(target: any, propertyName: string) {
	registeredValidators[target.constructor.name] = {
		[propertyName]: ["positive"],
	};
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	if (!objValidatorConfig) return true;

	let isValid = true;
	for (const property in objValidatorConfig) {
		console.log(property);
		for (const validator of objValidatorConfig[property])
			switch (validator) {
				case "required":
					isValid = isValid && !!obj[property];
					break;
				case "positive":
					isValid = isValid && obj[property] > 0;
					break;
			}
	}
	return isValid;
}
class Course {
	@Required
	title: string;
	@PositiveNumber
	price: number;

	constructor(title: string, price: number) {
		this.title = title;
		this.price = price;
	}
}
const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const titleEl = document.getElementById("title") as HTMLInputElement;
	const priceEl = document.getElementById("price") as HTMLInputElement;

	const title = titleEl.value;
	const price = +priceEl.value;

	const createdCourse = new Course(title, price);
	if (!validate(createdCourse)) {
		alert("Invalid input , please try again");
		return;
	}

	console.log(createdCourse);
});
