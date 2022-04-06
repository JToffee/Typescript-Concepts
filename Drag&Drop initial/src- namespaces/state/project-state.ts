namespace App {
	//Project state management - set up listeners for changes

	// - Call add project from form class
	// -Pass updated list of projects to project list class
	// -Set up listeners at places where change in state(projects[]) matter - project list class
	// type Listener = (items: Project[]) => void;
	type Listener<T> = (items: T[]) => void;

	class State<T> {
		//Array of listener function references - used when changes occur
		protected listeners: Listener<T>[] = [];

		// 	//Add listener to listeners array
		addListener(listenerFn: Listener<T>) {
			this.listeners.push(listenerFn);
		}
	}

	export class ProjectState extends State<Project> {
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

	export const projectState = ProjectState.getInstance();
}
