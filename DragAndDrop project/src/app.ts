import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

const form = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");

//Third party libs

import _ from "lodash";

declare var GLOBAL: any;

console.log(_.shuffle([1, 2, 3, 4]));
console.log(GLOBAL);

import { Product } from "./classTransformer";
import "reflect-metadata";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

const products = [
	{ title: "Carpet", price: 7500 },
	{ title: "Coach", price: 300000 },
];

const loadedProducts = plainToClass(Product, products); //Class to converts to, data to be transformed

console.log(loadedProducts);

const newProduct = new Product("", -9);
validate(newProduct).then((errors) => {
	if (errors.length > 0) {
		console.log("VALIDATION ERRORS: ", errors);
	} else {
		console.log(newProduct.getInformation());
	}
});

const p1 = new Product("Book", 1299);

console.log(p1.getInformation());
