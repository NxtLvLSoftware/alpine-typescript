import type Alpine from 'alpinejs';
import type * as Globals from './Global';
import {
	type ComponentList,
	ComponentStore
} from './Store';

export namespace AlpineComponents {

	export interface Options {
		components: ComponentList,

		bootstrapAlpine: boolean;
		startAlpine: boolean;

		logErrors: boolean;
	}

	export const defaultOptions: Options = {
		components: {},

		bootstrapAlpine: false,
		startAlpine: true,

		logErrors: false
	};

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
				window.Alpine = alpine;
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
 * @param alpine
 */
export function componentsPlugin(alpine: Globals.Alpine) {
	AlpineComponents.bootstrap({
		startAlpine: false
	}, alpine);
}
