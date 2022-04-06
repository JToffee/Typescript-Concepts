"use strict";
let userInput;
userInput = 5;
userInput = "Tof";
let useName;
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
console.log("sjekkkks basj");
const button = document.querySelector("button");
function clickHandler(message) {
    console.log(`I'm buttoned ${message}`);
}
if (button) {
    button.addEventListener("click", clickHandler.bind(null, "hurray"));
}
