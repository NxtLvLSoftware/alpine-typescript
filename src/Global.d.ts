/**
 * Type declarations for Alpine and browser window global.
 */
import type { Alpine as AlpineType } from 'alpinejs';
import type { ComponentStore } from './Store';
import type { AlpineComponentConstructor } from './Component';
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
export declare type AlpineWithComponents = AlpineType & AlpineComponentMixins;
/**
 * Expose the properties we add to the window.Alpine object.
 */
export declare type Alpine = AlpineType | AlpineWithComponents;
/**
 * Check if an {@link Alpine} object has the components properties.
 *
 * @param obj The Alpine object to check
 *
 * @return True if component properties are injected, false otherwise.
 */
export declare function satisfiesAlpineWithComponents(obj: Alpine): boolean;
/**
 * Cast an {@link Alpine} object to {@link AlpineWithComponents} if it
 * has the injected properties.
 *
 * @param obj The Alpine object to cast
 *
 * @return The object cast to {@link AlpineWithComponents} if properties are
 * injected, null otherwise.
 */
export declare function castToAlpineWithComponents(obj?: Alpine): AlpineWithComponents | null;
declare global {
    /**
     * Expose window.Alpine and window.AlpineComponents globals.
     */
    interface Window {
        Alpine: AlpineWithComponents;
        AlpineComponents: ComponentStore;
    }
}
