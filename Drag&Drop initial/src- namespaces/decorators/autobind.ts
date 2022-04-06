namespace App {
	//Autobind decorator - method decorator
	export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
}
