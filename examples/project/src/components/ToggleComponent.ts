import {AlpineComponent} from '@nxtlvlsoftware/alpine-typescript';

/**
 * Simple toggle that switches between on/off values.
 *
 * All properties and events are prefixed with 'toggle' to make
 * it clear which variables belong to the component in the HTML.
 */
export class ToggleComponent extends AlpineComponent {

	constructor(
		public toggleState: boolean = false
	) {
		super();
	}

	init(): void {
		this.$watch('toggleState', (val: boolean, oldVal: boolean) => {
			console.log(`Toggle triggered. New value: ${val}, old value: ${oldVal}`);

			// x-on:toggle-[on|off] or @toggle-[on|off] attributes
			this.$dispatch(`toggle-${val ? 'on' : 'off'}`, {
				new: val,
				old: oldVal
			});
		});
	}

}
