"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Welcome {
    constructor(name) {
        if (this.name)
            this.name = name;
    }
    greet() {
        console.log("Hello");
    }
}
const hello = new Welcome();
hello.greet();
