import type * as Globals from './Global'
import {
	type ComponentClassList,
	ComponentStore
} from "./Store";

export namespace AlpineComponents {

	export interface Options {
		components: ComponentClassList,
		startAlpine: boolean
	}

	export const defaultOptions: Options = {
		components: [],
		startAlpine: true
	};

	export function bootstrap(
		alpine: Globals.Alpine = window.Alpine,
		options: Partial<Options> = defaultOptions
	): void {
		const opts: Options = {
			...defaultOptions,
			...options
		};

		window.AlpineComponents = new ComponentStore(alpine, opts.components);

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
	AlpineComponents.bootstrap(alpine, {
		startAlpine: false
	});
}
