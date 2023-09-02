/**
 * Type declarations for Alpine and browser window global.
 */
import type {Alpine as AlpineType} from 'alpinejs';
import type {ComponentStore} from "./Store";
import type {AlpineComponentConstructor} from "./Component";

/**
 * Define the properties we add to the window.Alpine object.
 */
export declare interface AlpineComponentMixins {
	Components: ComponentStore;
	component: (name: string) => AlpineComponentConstructor;
}

/**
 * Expose the properties we add to the window.Alpine object.
 */
export declare type AlpineWithComponents = AlpineType&AlpineComponentMixins;

/**
 * Expose the properties we add to the window.Alpine object.
 */
export declare type Alpine = AlpineType|AlpineWithComponents;

/**
 * Expose window.Alpine and window.AlpineComponents globals.
 */
declare global {

	interface Window {
		Alpine: Alpine;
		AlpineComponents: ComponentStore;
	}

}
