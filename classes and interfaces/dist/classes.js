"use strict";
class Department {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2022;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT_id");
        this.admins = admins;
    }
    describe() {
        console.log(`Accounting department ID : ${this.id}`);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "acc_id");
        this.reports = reports;
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
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    set mostRecentReport(value) {
        if (!value)
            return;
        this.addReport(value);
    }
    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        else
            return " Failed";
    }
    printReports() {
        console.log(this.reports);
    }
    addEmployee(name) {
        if (name === "HSNR")
            return;
        this.employees.push(name);
    }
}
const employee1 = Department.createEmployee("Kd");
console.log(employee1, Department.fiscalYear);
const techTeam = new ITDepartment("Tech Team", ["Toff"]);
techTeam.describe();
console.log(techTeam);
const accounting = AccountingDepartment.getInstance();
accounting.addReport("Payment to Toff industries paid");
accounting.printReports();
accounting.addEmployee("HSN");
accounting.mostRecentReport = "Toff industries";
accounting.describe();
console.log(accounting);
console.log(accounting.mostRecentReport);
