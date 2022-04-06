//Component base class - renderable component with some functionalities

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
