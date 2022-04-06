"use strict";
const names = ["Sheila", "Jerotich"];
const types = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(" Win");
    }, 1000);
});
promise.then((data) => {
    data.concat(data, "Win");
});
function mergeObjects(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
console.log(mergeObjects({ name: "sheila" }, { age: 22 }));
const mergedObject = mergeObjects({ name: "sheila" }, { age: 22 });
console.log(mergedObject.name);
function mergeObjects1(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
const mergedObject1 = mergeObjects1({ name: "sheila" }, { age: 22 });
console.log(mergedObject1.name);
function countAndDescribe(element) {
    let descriptionText = "Without value";
    if (element.length > 0)
        descriptionText =
            element.length === 1 ? `Has 1 element` : `Has ${element.length} elements`;
    return [element, descriptionText];
}
console.log(countAndDescribe(["SHEILA", "IS", "POWERFUL"]));
console.log(countAndDescribe([]));
function extractAndConvert(obj, key) {
    return obj[key];
}
console.log(extractAndConvert({ name: "London" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const strings = new DataStorage();
strings.addItem("Patience");
strings.addItem("Silence");
strings.addItem("Faith");
strings.addItem("random");
strings.removeItem("random");
console.log(strings.getItems());
const numbers = new DataStorage();
function createCourseGoal(title, description, date) {
    let CourseGoal = {};
    CourseGoal.title = title;
    CourseGoal.description = description;
    CourseGoal.completeUntil = date;
    return CourseGoal;
}
const goals = [
    "Fullstack Developer",
    "softball olymipic qualifiers",
    "Mt kenya hike",
    "watamu baecation with vic",
    "Royal salon",
    "achiever",
];
console.log(goals);
