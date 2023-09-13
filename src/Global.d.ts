import type { Alpine as AlpineType } from 'alpinejs';
import type { ComponentStore } from "./Store";
import type { AlpineComponentConstructor } from "./Component";
export declare interface AlpineComponentMixins {
    Components: ComponentStore;
    component: (name: string) => AlpineComponentConstructor;
}
export declare type AlpineWithComponents = AlpineType & AlpineComponentMixins;
export declare type Alpine = AlpineType | AlpineWithComponents;
declare global {
    interface Window {
        Alpine: Alpine;
        AlpineComponents: ComponentStore;
    }
}
