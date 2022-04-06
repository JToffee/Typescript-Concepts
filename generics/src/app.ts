//  GENERICS -  Allows us to get additional type information

//A type that is connected with some other type and is flexible regarding which type that other type is
//Enhances type safety
// Gives both flexibility and type safety - type safety is due to constraints
// ------------------------ Built in----------------------
const names = ["Sheila", "Jerotich"];

// 1. Array generic

const types: Array<string> = [];

//2.Promise

const promise: Promise<string> = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(" Win");
	}, 1000);
});

promise.then((data) => {
	data.concat(data, "Win");
});

// --------------------------Generic function---------------------

//We pass extra info <> to the merge function so as to work in a better way with the result of the function

function mergeObjects<T, U>(obj1: T, obj2: U) {
	return Object.assign(obj1, obj2);
}

console.log(mergeObjects({ name: "sheila" }, { age: 22 }));

// One can fill in different concrete types to T and  U for different funtion calls or let typescript infer
const mergedObject = mergeObjects({ name: "sheila" }, { age: 22 });

console.log(mergedObject.name);

// ------------------Constraints--------------------

function mergeObjects1<T extends object, U extends object>(obj1: T, obj2: U) {
	return Object.assign(obj1, obj2);
}
const mergedObject1 = mergeObjects1({ name: "sheila" }, { age: 22 });

console.log(mergedObject1.name);

// -----------------Generic example 2------------------

interface Lengthy {
	length: number;
}

// Generic type T must fullfil lengthy interface

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descriptionText = "Without value";

	if (element.length > 0)
		descriptionText =
			element.length === 1 ? `Has 1 element` : `Has ${element.length} elements`;
	return [element, descriptionText];
}

console.log(countAndDescribe(["SHEILA", "IS", "POWERFUL"]));

console.log(countAndDescribe([]));

//	Allows funtions to take in parameters without restricting the type. To add constraints to a generic, use extends keyword.
// -Helps Avoid overloads, long union types

// ---------------Keyof constraint---------------

// -To ensure a function only access a property that actually exists

function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return obj[key];
}
console.log(extractAndConvert({ name: "London" }, "name"));

//-----------------------------Generic Classes-------------------

class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		// indexof returns -1 if the element is not found
		if (this.data.indexOf(item) === -1) return;
		this.data.splice(this.data.indexOf(item), 1);
	}

	getItems() {
		return [...this.data];
	}
}

const strings = new DataStorage<string>();

strings.addItem("Patience");
strings.addItem("Silence");
strings.addItem("Faith");
strings.addItem("random");
strings.removeItem("random");

console.log(strings.getItems());

const numbers = new DataStorage<number>();

// const objects = new DataStorage<object>();
// objects.addItem({ name: "Kosgei" });
// objects.addItem({ name: "Toff industries" });
// objects.removeItem({ name: "kosgei" });
// console.log(objects.getItems());

// ------------------Generic utility types------------

// Partial type -  makes properties of a user defined type or interface optional

interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

function createCourseGoal(
	title: string,
	description: string,
	date: Date
): CourseGoal {
	let CourseGoal: Partial<CourseGoal> = {};
	CourseGoal.title = title;
	CourseGoal.description = description;
	CourseGoal.completeUntil = date;

	return CourseGoal as CourseGoal;
}

// return { title: title, description: description, completeUntil: date };

//Readonly type

const goals: Readonly<string[]> = [
	"Fullstack Developer",
	"softball olymipic qualifiers",
	"Mt kenya hike",
	"watamu baecation with vic",
	"Royal salon",
	"achiever",
];

// goals.push("growth");
console.log(goals);

//generic types vs union types

// Generic -  to lock in a particular type to use the same type throughout the entire class or function

// Union - good if you want to have a function to call with any of the specified types. Flexibility to have  a different type with every function call

// Generics help you create data structures that work together or wrap values of a broad variety of types (e.g. an array that can hold any type of data).

// constraints allows one to narrow down the concrete types that may be used in a generic function

function add<T extends number | string>(a: T, b: T) {
	if (typeof "T" === "string" || typeof "T" === "string") {
		return a.toString() + " " + b.toString();
	}
}

function printNumbers<T>(a: T) {
	console.log(a);
}
printNumbers;
