//Project state management - set up listeners for changes

// - Call add project from form class
// -Pass updated list of projects to project list class
// -Set up listeners at places where change in state(projects[]) matter - project list class

//Drag and drop interfaces

interface Dragabble {
	dragStartHandler(e: DragEvent): void; //listens to start of drag event
	dragEndHandler(e: DragEvent): void; //listens to end of drag event
}

interface DragTarget {
	dragOverHandler(e: DragEvent): void; //signal js & browser that its a valid drag target (permit drop)
	dropHandler(e: DragEvent): void; //react to drop (handle)
	dragLeaveHandler(e: DragEvent): void; // useful for visual feedback
}
enum ProjectStatus {
	Active,
	Finished,
}
// type Listener = (items: Project[]) => void;
type Listener<T> = (items: T[]) => void;

//Project type - class because i want to instantiate it
class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public people: number,
		public status: ProjectStatus
	) {}
}

class State<T> {
	//Array of listener function references - used when changes occur
	protected listeners: Listener<T>[] = [];

	// 	//Add listener to listeners array
	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}

class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	//Singleton to make sure we have one instance of the project state- project state management object
	private constructor() {
		super();
	}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	//Called when add project is clicked
	addProject(title: string, description: string, numPeople: number) {
		//Instantiate project
		const newProject = new Project(
			`prj${Math.random().toString()}`,
			title,
			description,
			numPeople,
			ProjectStatus.Active // use projectstatus enum type
		);

		this.projects.push(newProject);
		this.updateListeners();
	}

	//Move project between lists
	moveProject(projectId: string, newStatus: ProjectStatus) {
		const project = this.projects.find((project) => project.id === projectId);

		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}

	private updateListeners() {
		//Execute all listeners and pass in a copy of projects [] - projects is the state

		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}
}

const projectState = ProjectState.getInstance();

//Validation

//validatable object
interface Validatable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

//Validator function
function validate(validatableInput: Validatable) {
	let isValid = true;
	if (validatableInput.required) {
		isValid = isValid && validatableInput.value.toString().trim().length !== 0;
	}
	if (
		validatableInput.minLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid && validatableInput.value.length > validatableInput.minLength;
	}
	if (
		validatableInput.maxLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid && validatableInput.value.length < validatableInput.maxLength;
	}
	if (
		validatableInput.min != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value >= validatableInput.min;
	}
	if (
		validatableInput.max != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value < validatableInput.max;
	}
	return isValid;
}

//Autobind decorator - method decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	//console.log(descriptor);

	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

//Component base class - renderable component with some functionalities

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateEl: HTMLTemplateElement;
	hostElement: T;
	element: U;

	constructor(
		templateId: string,
		hostElementId: string,
		insertAtStart: boolean,
		newElementId?: string
	) {
		// ----------------Selecting elements-------------------

		this.templateEl = <HTMLTemplateElement>document.getElementById(templateId)!;
		this.hostElement = <T>document.getElementById(hostElementId)!;

		//Importing node (template with form content -form )to be rendered in app div
		const importedTemplateNode = document.importNode(
			this.templateEl.content,
			true
		); //Pass in a pointer to html template content & and a choice to import with a deep clode (true | false)

		//Generate actual html from imported nodes
		this.element = <U>importedTemplateNode.firstElementChild;
		if (newElementId) this.element.id = newElementId;

		this.attach(insertAtStart);
	}

	// Render project list section
	private attach(insertAtStart: boolean) {
		this.hostElement.insertAdjacentElement(
			insertAtStart ? "afterbegin" : "beforeend",
			this.element
		);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}

// Project item class

class ProjectItem
	extends Component<HTMLUListElement, HTMLInputElement>
	implements Dragabble
{
	private project: Project;

	get people() {
		return this.project.people === 1
			? "1 person "
			: `${this.project.people} people `;
	}
	constructor(hostId: string, project: Project) {
		super("single-project", hostId, false, project.id);
		this.project = project;

		this.configure();
		this.renderContent();
	}
	configure() {
		//Add drag event listeners

		this.element.addEventListener("dragstart", this.dragStartHandler);
		this.element.addEventListener("dragend", this.dragEndHandler);
	}
	renderContent() {
		this.element.querySelector("h2")!.textContent = this.project.title;
		this.element.querySelector("h3")!.textContent = this.people + "assigned";
		this.element.querySelector("p")!.textContent = this.project.description;
	}
	@Autobind
	dragStartHandler(e: DragEvent) {
		//Attach data to drag event - Js stores drag data
		e.dataTransfer!.setData("text/plain", this.project.id); //Args: Data format, data

		//controls how cursor looks like : move/copy
		e.dataTransfer!.effectAllowed = "copy";
	}
	@Autobind
	dragEndHandler(e: DragEvent) {
		console.log("DragEnd");
	}
}

//Project list class

class ProjectList
	extends Component<HTMLDivElement, HTMLElement>
	implements DragTarget
{
	assignedProjects: Project[] = [];

	constructor(private type: "active" | "finished") {
		super("project-list", "app", false, `${type}-projects`);

		this.configure();
		this.renderContent();
	}

	configure() {
		//Register drag events on element
		this.element.addEventListener("dragover", this.dragOverHandler);
		this.element.addEventListener("dragleave", this.dragLeaveHandler);
		this.element.addEventListener("drop", this.dropHandler);
		// Register listener for changes in the state - projects[]
		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter((project) => {
				if (this.type === "active") {
					return project.status === ProjectStatus.Active;
				}
				return project.status == ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProjects;
			//Called when new projects are added
			this.renderProjects();
		});
	}

	//Render content of seection - ul list, h2
	renderContent() {
		//Assign  ul element an ID
		const listId = `${this.type}-projects-list`;
		this.element.querySelector("ul")!.id = listId;

		// Set h2 content
		this.element.querySelector(
			"h2"
		)!.textContent = `${this.type.toUpperCase()} PROJECTS `;
	}
	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		listEl.innerHTML = "";
		for (const projectItem of this.assignedProjects) {
			new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
		}
	}
	@Autobind
	dragOverHandler(e: DragEvent) {
		//Drop plain text only
		if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
			e.preventDefault(); //default is to not allow dropping
			const listEl = this.element.querySelector("ul")!;
			listEl?.classList.add("droppable");
		}
	}
	@Autobind
	dropHandler(e: DragEvent) {
		const projectId = e.dataTransfer?.getData("text/plain")!;
		projectState.moveProject(
			projectId,
			this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
		);
	}
	@Autobind
	dragLeaveHandler(e: DragEvent) {
		const listEl = this.element.querySelector("ul")!;
		listEl?.classList.remove("droppable");
	}
}

// Making the form visible
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const form = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");
