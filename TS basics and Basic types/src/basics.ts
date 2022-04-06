function add(n1: number, n2: number, showResult: boolean, phrase: string) {
	console.log(typeof n1);
	const result = n1 + n2;
	if (showResult) {
		console.log(phrase + result);
	} else {
		return n1 + n2;
	}
}

const number1: number = 1.1;
console.log(typeof number1);
const number2 = 23;
const printResult = true;
const resultPhrase = "Result is ";

let value = 5;

const result = add(number1, number2, printResult, resultPhrase);
