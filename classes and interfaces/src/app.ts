// type Addfn = (a: number, b: number) => number;
interface AddFn {
	(a: number, b: number): number;
}

let add: AddFn;

add = (n1: number) => {
	return n1;
};

interface Named {
	readonly name?: string; // Optional property
	outputName?: string;
}
interface Greetable extends Named {
	greet(message: string): void;
}

// // Class Welcome  must contain properties and methods in greetable that are not optional
class Welcome implements Greetable {
	name?: string;
	constructor(name?: string) {
		if (this.name) this.name = name;
	}
	greet() {
		console.log("Hello");
	}
}
const hello = new Welcome();
hello.greet();

// class Person implements Greetable {
// 	// name?: string;
// 	age: number = 22;
// 	constructor(name?: string) {
// 		// if (name) this.name = name;
// 	}

// 	greet(message: string) {
// 		// if (this.name) console.log(`${message} ${this.name} `);
// 		// else console.log("Hi");
// 	}
// }

// let user1: Greetable;

// user1 = new Person("Sheila");

// user1 = {
// 	// name: "Sheila",

// 	greet(message: string) {
// 		console.log(`${message} ${this.name} `);
// 	},
// };

// user1.greet("Hello miss ");

// console.log(user1);
