"use strict";
const employee1 = {
    name: "sheila",
    priviledges: ["create-server"],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result1 = add(1000, 53939);
const result2 = add("Sheila", "Jerotich");
result2.split(" ");
function printEmployeeInfo(employee) {
    console.log(`Name: ${employee.name}`);
    if ("priviledges" in employee)
        console.log(`Priviledges: ${employee.priviledges}`);
    if ("startDate" in employee)
        console.log(`Start Date: ${employee.startDate}`);
}
printEmployeeInfo(employee1);
printEmployeeInfo({ name: "Jsa", startDate: new Date() });
class Car {
    drive() {
        console.log("Driving a car...");
    }
}
class Truck {
    drive() {
        console.log("Driving a truck...");
    }
    loadCargo(amount) {
        console.log(`Loading cargo ${amount}`);
    }
}
const vehicle1 = new Car();
const vehicle2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck)
        vehicle.loadCargo(1000);
}
useVehicle(vehicle1);
useVehicle(vehicle2);
const bird1 = {
    type: "bird",
    flyingSpeed: 300,
};
const horse1 = {
    runningSpeed: 500,
};
function moveAnimal(animal) {
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
const inputElement = document.getElementById("user-input");
inputElement.value = "Hi there";
const testEl = document.getElementById("user-input");
if (testEl)
    testEl.value = "Hi there";
const errorBag = {
    email: "Not a valid email",
    userName: "Username not available",
};
const fetchedUserData = {
    id: "SJ",
    name: "Sheila Jerotich",
    job: {
        description: "Toff industries leader",
    },
};
const userInput = 0;
const storedData = userInput !== null && userInput !== void 0 ? userInput : "Default";
console.log(storedData);
