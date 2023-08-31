import {AlpineComponent} from "../../src/Component";

export const DefaultSwitchComponentName: string = "switch";

/**
 * Simple component that switches between on/off values.
 *
 * All properties and events are prefixed with 'switch' to make
 * it clear which variables belong to the component in the HTML.
 */
export class SwitchComponent extends AlpineComponent<SwitchComponent> {
	static override readonly defaultName: string = DefaultSwitchComponentName;

	constructor(
		public switchState: boolean = false
	) {
		super();
	}

	init(): void {
		this.$watch('switchState', (val: boolean, oldVal: boolean) => {
			console.log(`Switch triggered.`, `new value: ${val}, old value: ${oldVal}`);

			// x-on:switch-[on|off] or @switch-[on|fff] attributes
			this.$dispatch(`switch-${val ? 'on' : 'off'}`, {
				new: val,
				old: oldVal
			});
		});
	}

}
