function add(n1: number, n2: number) {
	return n1 + n2;
}
function printResult(num: number) {
	console.log("Result: " + num);
}

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
	const result = n1 + n2;
	callback(result);
}

printResult(add(5, 6));
console.log(printResult(4));

let combineValues: (a: number, b: number) => number;

// combineValues = printResult;
combineValues = add;

console.log(combineValues(65, 2));

addAndHandle(10, 20, (result) => {
	console.log(result);
	return result;
});
function sendRequest(data: string, cb: (response: any) => void) {
	// ... sending a request with "data"
	return cb({ data: "Hi there!" });
}

sendRequest("Send this!", (response) => {
	console.log(response);
	return true;
});

function voidTest(): void {
	const name = "Sheila Jerotich";
	// return name; ERROR!!!
}
