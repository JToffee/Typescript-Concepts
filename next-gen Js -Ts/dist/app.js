"use strict";
const userName = "Toff";
let age = 30;
age = 28;
console.log(age);
var result;
const add = (a, b = 800) => a + b;
console.log(add(200));
const printOutput = (output) => console.log(output);
printOutput(add(200));
const hobbies = ["sports", "software dev", "more software dev"];
const activeHobbies = ["Hiking", ...hobbies];
console.log(activeHobbies);
const book = {
    bookName: "The monk mind",
    author: "Jay Shetty",
};
const bookCopy = Object.assign({}, book);
console.log(bookCopy);
bookCopy.bookName = "Find your purpose";
console.log(bookCopy);
console.log(book);
const addValues = (...numbers) => {
    return numbers.reduce((curResult, curValue) => curResult + curValue, 0);
};
console.log(addValues(300, 222, 4445, 656, 3232));
const [hobby1, hobby2, ...extraHobbies] = hobbies;
console.log(extraHobbies);
const { bookName: bookTitle, author } = book;
console.log(bookTitle, author);
