export enum ProjectStatus {
	Active,
	Finished,
}
//Project type - class because i want to instantiate it
export class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public people: number,
		public status: ProjectStatus
	) {}
}
