// Const and let

const userName = "Toff";

let age = 30;

age = 28;
console.log(age);
var result;
// function add(a: number, b: number) {
// 	result = a + b;
// 	return result;
// }
// console.log(add(3, 42));

// Arrow functions, default parameters

const add = (a: number, b: number = 800) => a + b;
console.log(add(200));

const printOutput = (output: string | number) => console.log(output);

printOutput(add(200));

//The spread operator

const hobbies = ["sports", "software dev", "more software dev"];

const activeHobbies = ["Hiking", ...hobbies];

console.log(activeHobbies);

const book = {
	bookName: "The monk mind",
	author: "Jay Shetty",
};

const bookCopy = { ...book };
console.log(bookCopy);

bookCopy.bookName = "Find your purpose";
console.log(bookCopy);

console.log(book);

//Rest parameters

const addValues = (...numbers: number[]) => {
	return numbers.reduce((curResult, curValue) => curResult + curValue, 0);
};

console.log(addValues(300, 222, 4445, 656, 3232));

//Destructuring

// 1. Arrays

const [hobby1, hobby2, ...extraHobbies] = hobbies;
console.log(extraHobbies);

const { bookName: bookTitle, author } = book;

console.log(bookTitle, author);
