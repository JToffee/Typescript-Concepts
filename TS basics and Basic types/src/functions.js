"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: " + num);
}
function addAndHandle(n1, n2, callback) {
    const result = n1 + n2;
    callback(result);
}
printResult(add(5, 6));
console.log(printResult(4));
let combineValues;
// combineValues = printResult;
combineValues = add;
console.log(combineValues(65, 2));
addAndHandle(10, 20, (result) => {
    console.log(result);
    return result;
});
function sendRequest(data, cb) {
    // ... sending a request with "data"
    return cb({ data: "Hi there!" });
}
sendRequest("Send this!", (response) => {
    console.log(response);
    return true;
});
function voidTest() {
    const name = "Sheila Jerotich";
    // return name; ERROR!!!
}
