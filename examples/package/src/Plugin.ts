import type Alpine from 'alpinejs';

import {
	AlpineComponents,
	makeAlpineConstructor
} from '@nxtlvlsoftware/alpine-typescript';

import {
	AlertComponent,
	DefaultAlertComponentName
} from './components/AlertComponent';

import {
	ToggleComponent,
	DefaultToggleComponentName
} from './components/ToggleComponent';

// Enclose these methods and types in a namespace as a courtesy.
export namespace MyComponents {

	export interface Options extends AlpineComponents.Options {
		alertComponentName: string;
		toggleComponentName: string;

		bootstrapComponents: boolean;
	}

	export const defaultOptions = {
		...AlpineComponents.defaultOptions,

		alertComponentName: DefaultAlertComponentName,
		toggleComponentName: DefaultToggleComponentName,

		bootstrapComponents: true
	} satisfies Options;

	export function bootstrap (
		options: Partial<Options> = defaultOptions,
		alpine: typeof Alpine = window.Alpine
	): void {
		const opts: Options = {
			...defaultOptions,
			...options
		};

		document.addEventListener('alpine:init', (): void => {
			// Register any alpine stores your components rely on here.
			// You can pull them and any other dependencies in as default params
			// for a custom component constructor when alpine-components:init is fired.
			// const alpine = window.Alpine;
			// alpine.store(opts.myStoreName, new MyStore(...));
		});

		document.addEventListener('alpine-components:init', (): void => {
			const alpine = window.Alpine;
			// Basic registration by falling back to the prototype name when left undefined.
			// Can be used in your HTML with: x-data="ToggleComponent([true|false])"
			alpine.Components.register(AlertComponent);
			alpine.Components.register(ToggleComponent);

			// Register with name provided from options.
			// Can be used in your HTML with: x-data="alert", x-data="toggle([true|false])"
			alpine.Components.register(AlertComponent, opts.alertComponentName);
			alpine.Components.register(ToggleComponent, opts.toggleComponentName);

			// Register with name provided from options with a custom constructor function.
			// Requires an explicit call to makeAlpineConstructor() but allows re-arranged
			// arguments and better defaults.
			// Can be used in your HTML with: x-data="alert"
			alpine.Components.register(
				opts.alertComponentName,
				(defaultState: boolean = true) => {
					return makeAlpineConstructor(AlertComponent)(defaultState);
				}
			);
			// Can be used in your HTML with: x-data="toggle([true|false])"
			alpine.Components.register(
				opts.toggleComponentName,
				(defaultState: boolean = false) => {
					return makeAlpineConstructor(ToggleComponent)(defaultState);
				}
			);

			// No braces if that's your cup of tea. Result is the same as above.
			alpine.Components.register(opts.alertComponentName, (state = false) =>
				makeAlpineConstructor(AlertComponent)(state));
			alpine.Components.register(opts.toggleComponentName, (state = false) =>
				makeAlpineConstructor(ToggleComponent)(state));
		});

		// Allow booting alpine and the components package with a single call to our
		// bootstrap function. This makes the client script a bit simpler.
		if (opts.bootstrapComponents) {
			AlpineComponents.bootstrap(opts, alpine);
		}
	}

}

// We can even support loading our components with a standardized call to Alpine.plugin().
export function myPlugin(alpine: typeof window.Alpine): void {
	// This process is easy if we take the time to define all the types above, just
	// change some default options and we're good to go.
	MyComponents.bootstrap({
		// can't assume we're the only ones using the component library
		bootstrapComponents: false,
		// definitely not the only ones using alpine if we're being used as a plugin here
		startAlpine: false
	}, alpine);
}
