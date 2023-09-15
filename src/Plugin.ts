import Alpine from 'alpinejs';
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
		alpine: Globals.Alpine = window.Alpine
	): void {
		const opts: Options = {
			...defaultOptions,
			...options
		};
		if (opts.bootstrapAlpine) {
			window.Alpine = <Globals.AlpineWithComponents>Alpine;
			alpine = window.Alpine;
		}

		window.AlpineComponents = new ComponentStore(alpine, opts.components, opts.logErrors);

		if (opts.startAlpine) {
			alpine.start();
		}
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
