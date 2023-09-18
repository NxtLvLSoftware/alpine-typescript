import type Alpine from 'alpinejs';
import type * as Globals from './Global';
import {
	type ComponentList,
	ComponentStore
} from './Store';

export namespace AlpineComponents {

	/**
	 * Bootstrap options.
	 */
	export interface Options {
		/**
		 * List of named components to register.
		 */
		components: ComponentList,

		/**
		 * Create Alpine object and inject into window.Alpine?
		 */
		bootstrapAlpine: boolean;
		/**
		 * Call Alpine.start()?
		 */
		startAlpine: boolean;

		/**
		 * Log errors to console?
		 */
		logErrors: boolean;
	}

	/**
	 * Default bootstrap options.
	 *
	 * Assumes production environment.
	 */
	export const defaultOptions: Options = {
		components: {},

		bootstrapAlpine: false,
		startAlpine: true,

		logErrors: false
	};

	/**
	 * Bootstrap the components package.
	 *
	 * @param options Provided options (defaults applied to missing values {@link defaultOptions}.)
	 * @param alpine The Alpine instance to use (defaults to window.Alpine or creates Alpine when
	 * the bootstrapAlpine option is set)
	 */
	export function bootstrap(
		options: Partial<Options> = defaultOptions,
		alpine: typeof Alpine = window.Alpine
	): void {
		const opts: Options = {
			...defaultOptions,
			...options
		};

		if (opts.bootstrapAlpine && alpine !== undefined) {
			if (opts.logErrors) {
				console.error('Cannot bootstrap Alpine when window.Alpine is already defined.');
			}
			return;
		}

		Promise.resolve(
			opts.bootstrapAlpine ?
				import('alpinejs').then((imp) => imp.default) : alpine
		).then((alpine: typeof Alpine): void => {
			if (opts.bootstrapAlpine) {
				window.Alpine = <Globals.AlpineWithComponents>alpine;
			}

			window.AlpineComponents = new ComponentStore(alpine, opts.components, opts.logErrors);

			if (opts.startAlpine) {
				alpine.start();
			}
		});
	}

}

/**
 * Export a function to be used with alpine.plugin().
 *
 * Calls {@link AlpineComponents.bootstrap} with sensible options.
 *
 * @param alpine
 */
export function componentsPlugin(alpine: Globals.Alpine) {
	AlpineComponents.bootstrap({
		bootstrapAlpine: false,
		startAlpine: false
	}, alpine);
}
