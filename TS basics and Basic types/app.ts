let userInput: unknown;
userInput = 5;
userInput = "Tof";
let useName: string;

function generateError(message: string, code: number) {
	throw { message: message, errorCode: code };
}

// generateError("An error occured", 503);*** BREAKS THE CODE **
// const result = generateError("An error occured", 503); *** BREAKS THE CODE **

console.log("sjekkkks");
