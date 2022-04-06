"use strict";
function combine(input1, input2, resultConversion) {
    let result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultConversion === "as-number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // console.log(result);
    // if (resultConversion === "as-number") {
    // 	return +result;
    // } else {
    // 	return result.toString();
    // }
}
//
const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);
//force conversion to number
const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);
const combinedNames = combine("Sheila ", "Jerotich ", "as-text");
console.log(combinedNames);
