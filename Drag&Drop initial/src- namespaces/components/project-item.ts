/// <reference path = 'base-component.ts' />
/// <reference path = '../decorators/autobind.ts'/>
/// <reference path = '../models/drag-drop.ts'/>
/// <reference path = '../models/project.ts'/>

namespace App {
	// Project item class

	export class ProjectItem
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
}
