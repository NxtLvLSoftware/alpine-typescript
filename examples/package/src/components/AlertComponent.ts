import {AlpineComponent} from "@nxtlvlsoftware/alpine-typescript";

export const DefaultAlertComponentName = 'alert';

/**
 * Simple alert component for closing the default alert.
 *
 * All properties and events are prefixed with 'alert' to make
 * it clear which variables belong to the component in the HTML.
 */
export class AlertComponent extends AlpineComponent<AlertComponent> {

	constructor(
		public alertState: boolean = false
	) {
		super();
	}

	init(): void {
		this.$watch('alertState', (val: boolean) => {
			let el = this.$el;
			if (val) {
				el.classList.remove('hidden');
				el.ariaHidden = 'true';
			} else {
				setTimeout(() => {
					el.classList.add('hidden');
					el.ariaHidden = 'true';
				}, 300);
			}
		});
	}

}
