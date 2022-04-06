//Drag and drop interfaces

namespace App {
	export interface Dragabble {
		dragStartHandler(e: DragEvent): void; //listens to start of drag event
		dragEndHandler(e: DragEvent): void; //listens to end of drag event
	}

	export interface DragTarget {
		dragOverHandler(e: DragEvent): void; //signal js & browser that its a valid drag target (permit drop)
		dropHandler(e: DragEvent): void; //react to drop (handle)
		dragLeaveHandler(e: DragEvent): void; // useful for visual feedback
	}
}
