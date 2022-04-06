// const person: {
// 	name: string;
// 	age: number;
// } = {

const person: {
	name: string;
	age: number;
	hobbies: string[];
	role: [number, string, string];
} = {
	name: "Sheila Jerotich",
	age: 22,
	hobbies: ["Sports", "Coding", "Dancing"],
	role: [2, "Developer", "Athlete"],
};

// object[], string[], boolean[], number[], any[]
// let favoriteActivities: A[];
person.role.push("Intelligence");
person.role[1] = "aaa";
console.log(person);

const Sports = [5, 5];
const Reading = ["tlam", "wgtnmw"];

let favoriteActivities = [Sports, Reading, true];

let randomFacts: any[];

randomFacts = [
	"Likes Pizza",
	"Creative",
	"Flexible",
	"Supports mental health campaigns",
	5.8,
];

console.log(person.name);

for (const hobby of person.hobbies) {
	console.log(hobby.toLowerCase());
	// console.log(hobby.map());  ERROR
}

//Enum

enum Role {
	ADMIN = "ADMIN",
	READ_ONLY = 100,
	AUTHOR,
}
console.log(Role.ADMIN);

const me = {
	name: "Sheila Jerotich",
	age: 22,
	hobbies: ["Sports", "Coding", "Dancing"],
	does: [2, "Developer", "Athlete"],
	role: Role.AUTHOR,
};

if (me.role === Role.ADMIN) {
	console.log("Is admin");
} else {
	console.log("Admin access only");
}
