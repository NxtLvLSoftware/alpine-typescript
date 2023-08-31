import {
	AlpineComponents,
	makeAlpineConstructor,
	Globals
} from '@nxtlvlsoftware/alpine-typescript';

import {
	SwitchComponent,
	DefaultSwitchComponentName
} from "./SwitchComponent";

// Enclose these methods and types in a namespace as a courtesy.
export namespace MyComponents {

	export interface Options extends AlpineComponents.Options {
		componentName: string;

		bootstrapComponents: boolean;
	}

	export const defaultOptions = {
		...AlpineComponents.defaultOptions,

		componentName: DefaultSwitchComponentName,
		bootstrapComponents: true
	} satisfies Options;

	export const bootstrap = (
		alpine: Globals.Alpine = window.Alpine,
		options: Partial<Options> = defaultOptions
	): void => {
		const opts: Options = {
			...defaultOptions,
			...options
		};

		document.addEventListener('alpine:init', () => {
			// Register any alpine stores your components rely on here.
			// You can pull them and any other dependencies in as default params
			// for a custom component constructor when alpine-components:init is fired.
		});

		document.addEventListener('alpine-components:init', () => {
			// Basic registration by pulling the static defaultName property from the class
			// automatically and falls back to the prototype name when left undefined.
			// Can be used in your HTML with: x-data="SwitchComponent([true|false])"
			alpine.Components.register(SwitchComponent);

			// Register with name provided from options.
			// Requires an explicit call to makeAlpineConstructor() but allows defining a custom
			// constructor function with arguments re-arranged and better defaults.
			// Can be used in your HTML with: x-data="switch([true|false])"
			alpine.Components.register(
				opts.componentName,
				(state = false) => {
					return makeAlpineConstructor(SwitchComponent)(state);
				}
			);

			// No braces if that's your cup of tea. Result is the same as above.
			alpine.Components.register(
				opts.componentName,
				(state = false) => makeAlpineConstructor(SwitchComponent)(state)
			);
		});

		// Allow booting alpine with a single call to our bootstrap function.
		// This makes the client script a bit simpler as we only have to import
		// the alpine type and everything just works.
		if (opts.bootstrapComponents) {
			AlpineComponents.bootstrap(alpine, opts);
		}
	};

}

// We can even support loading our components with a standardized call to Alpine.plugin().
export function myPlugin(alpine: Globals.Alpine): void {
	// This process is easy if we take the time to define all the types above, just
	// change some default options and we're good to go.
	MyComponents.bootstrap(
		alpine,
		{
			// can't assume we're the only ones using the component library
			bootstrapComponents: false,
			// definitely not the only ones using alpine if we're being used as a plugin here
			startAlpine: false
		}
	);
}
