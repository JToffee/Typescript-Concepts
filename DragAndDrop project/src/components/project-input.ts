import { Component } from "./base-component";
import { Validatable, validate } from "../util/validation";
import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

// Making the form visible
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputEl: HTMLInputElement;
	descriptionInputEl: HTMLInputElement;

	peopleInputEl: HTMLInputElement;

	constructor() {
		super("project-input", "app", true, "user-input");

		//Selecting form elements - typecasting required
		this.titleInputEl = this.element.querySelector(
			"#title"
		) as HTMLInputElement;
		this.descriptionInputEl = this.element.querySelector(
			"#description"
		) as HTMLInputElement;
		this.peopleInputEl = this.element.querySelector(
			"#people"
		) as HTMLInputElement;

		const importedTemplateNode = document.importNode(
			this.templateEl.content,
			true
		);

		this.configure();
	}

	//Add form submit event listener
	configure() {
		this.element.addEventListener("submit", this.submitHandler);
	}
	renderContent() {}

	//Get form user input
	private gatherUserInput(): [string, string, number] | void {
		//Retrieve
		const title = this.titleInputEl.value;
		const description = this.descriptionInputEl.value;
		const people = this.peopleInputEl.value;

		//Construct Validatable object

		const titleValidatable: Validatable = {
			value: title,
			required: true,
		};
		const descriptionValidatable: Validatable = {
			value: description,
			required: true,
			minLength: 5,
		};
		const peopleValidatable: Validatable = {
			value: +people,
			required: true,
			min: 1,
			max: 5,
		};

		// if (
		// 	title.trim().length === 0 ||
		// 	description.trim().length === 0 ||
		// 	people.trim().length === 0
		// ) {
		// 	alert("Invalid input . please try again");
		// 	return;
		// } else {
		// 	return [title, +people, description];
		// }

		//Validate

		if (
			!validate(titleValidatable) ||
			!validate(descriptionValidatable) ||
			!validate(peopleValidatable)
		) {
			alert("Invalid input . please try again");
			return;
		} else {
			return [title, description, +people];
		}
	}
	//  Clear form input fields
	private clearInputs() {
		this.titleInputEl.value = "";
		this.descriptionInputEl.value = "";
		this.peopleInputEl.value = "";
	}

	//submit form handler
	@Autobind //Bind this
	private submitHandler(e: Event) {
		e.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;

			//Update projects [] in the state
			projectState.addProject(title, description, people);
		}
		this.clearInputs();
	}
}
