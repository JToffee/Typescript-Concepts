/// <reference path = 'components/project-input.ts'/>
/// <reference path = 'components/project-list.ts'/>

namespace App {
	const form = new ProjectInput();
	const activeProjects = new ProjectList("active");
	const finishedProjects = new ProjectList("finished");
}
