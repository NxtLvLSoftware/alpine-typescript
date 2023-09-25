import {AlpineComponent} from '@nxtlvlsoftware/alpine-typescript';

/**
 * Simple alert component for closing the default alert.
 *
 * All properties and events are prefixed with 'alert' to make
 * it clear which variables belong to the component in the HTML.
 */
export class AlertComponent extends AlpineComponent {

	constructor(
		public alertState: boolean = false,
		private transitionDelayMs = 300
	) {
		super();
	}

	init(): void {
		this.$watch('alertState', (val: boolean) => {
			let el = this.$el;
			if (val) {
				el.classList.remove('hidden');
				el.ariaHidden = 'false';
			} else {
				setTimeout(() => {
					el.classList.add('hidden');
					el.ariaHidden = 'true';
				}, this.transitionDelayMs);
			}
		});
	}

	/**
	 * Expose x-bind="alertContent" for toggling DOM elements when the alert
	 * state changes.
	 */
	protected alertContent = this.binding({
		['x-show']() {
			return this.alertState;
		}
	})

	/**
	 * Expose x-bind="alertCloseTarget" for closing the alert when a DOM
	 * element is clicked.
	 */
	protected alertCloseTarget = this.binding({
		['@click.prevent']() {
			this.alertState = false;
		}
	});

}
