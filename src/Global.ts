/**
 * Type declarations for Alpine and browser window global.
 */
import type {Alpine as AlpineType} from 'alpinejs';
import type {ComponentStore} from "./Store";
import type {Constructor} from "./Component";

/**
 * Define the properties we add to the window.Alpine object.
 */
export declare interface AlpineComponentMixins {
	Components: ComponentStore;
	component: (name: string) => Constructor;
}

/**
 * Expose the properties we add to the window.Alpine object.
 */
export declare type Alpine = AlpineType & AlpineComponentMixins;

/**
 * Expose window.Alpine and window.AlpineComponents globals.
 */
declare global {

	interface Window {
		Alpine: Alpine;
		AlpineComponents: ComponentStore;
	}

}
