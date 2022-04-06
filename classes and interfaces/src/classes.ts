abstract class Department {
	static fiscalYear = 2022;
	// private name: string;
	protected employees: string[] = [];

	constructor(private name: string, protected readonly id: string) {
		// this.name = name;
	}

	static createEmployee(name: string) {
		return { name };
	}
	abstract describe(this: Department): void;
	//  {
	// 	// console.log(`Department: ${this.name}, id: ${this.id}`);
	// 	// console.log(Department.fiscalYear);
	// }
	addEmployee(employee: string) {
		this.employees.push(employee);
	}
	printEmployeeInfo() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

class ITDepartment extends Department {
	constructor(id: string, public admins: string[]) {
		super(id, "IT_id");
	}

	describe() {
		console.log(`Accounting department ID : ${this.id}`);
	}
}
class AccountingDepartment extends Department {
	private lastReport: string;
	private static instance: AccountingDepartment;
	private constructor(id: string, private reports: string[]) {
		super(id, "acc_id");
		this.lastReport = reports[0];
	}
	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new AccountingDepartment("d2", []);
		return this.instance;
	}
	describe() {
		console.log(`Accounting department ID : ${this.id}`);
	}
	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}
	set mostRecentReport(value: string) {
		if (!value) return;
		this.addReport(value);
	}

	get mostRecentReport() {
		if (this.lastReport) return this.lastReport;
		else return " Failed";
	}
	printReports() {
		console.log(this.reports);
	}
	addEmployee(name: string) {
		if (name === "HSNR") return;
		this.employees.push(name);
	}
}

const employee1 = Department.createEmployee("Kd");

console.log(employee1, Department.fiscalYear);

const techTeam = new ITDepartment("Tech Team", ["Toff"]);
techTeam.describe();

// Can't instantiate abstract class
// const finance = new Department("Finance", "Fin_id");

// finance.desc

console.log(techTeam);

// const accounting = new AccountingDepartment("Accounting", []);
const accounting = AccountingDepartment.getInstance();
accounting.addReport("Payment to Toff industries paid");

accounting.printReports();

accounting.addEmployee("HSN");
accounting.mostRecentReport = "Toff industries";

accounting.describe();

console.log(accounting);
console.log(accounting.mostRecentReport);

// const financeCopy = { name: "branch", describe: finance.describe };

// financeCopy.describe();
