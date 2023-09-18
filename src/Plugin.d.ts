import type Alpine from 'alpinejs';
import type * as Globals from './Global';
import { type ComponentList } from './Store';
export declare namespace AlpineComponents {
    /**
     * Bootstrap options.
     */
    interface Options {
        /**
         * List of named components to register.
         */
        components: ComponentList;
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
    const defaultOptions: Options;
    /**
     * Bootstrap the components package.
     *
     * @param options Provided options (defaults applied to missing values {@link defaultOptions}.)
     * @param alpine The Alpine instance to use (defaults to window.Alpine or creates Alpine when
     * the bootstrapAlpine option is set)
     */
    function bootstrap(options?: Partial<Options>, alpine?: typeof Alpine): void;
}
/**
 * Export a function to be used with alpine.plugin().
 *
 * Calls {@link AlpineComponents.bootstrap} with sensible options.
 *
 * @param alpine
 */
export declare function componentsPlugin(alpine: Globals.Alpine): void;
