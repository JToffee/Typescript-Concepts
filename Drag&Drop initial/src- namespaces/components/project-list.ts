/// <reference path = '../decorators/autobind.ts'/>
/// <reference path = '../state/project-state.ts'/>
/// <reference path = '../models/drag-drop.ts'/>
/// <reference path = '../models/project.ts'/>

namespace App {
	//Project list class

	export class ProjectList
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
}
