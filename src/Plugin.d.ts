import type * as Globals from './Global';
import { type ComponentList } from "./Store";
export declare namespace AlpineComponents {
    interface Options {
        components: ComponentList;
        startAlpine: boolean;
        logErrors: boolean;
    }
    const defaultOptions: Options;
    function bootstrap(options?: Partial<Options>, alpine?: Globals.Alpine): void;
}
export declare function componentsPlugin(alpine: Globals.Alpine): void;
