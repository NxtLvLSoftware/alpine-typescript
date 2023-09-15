import type * as Impl from './Component';
import type * as Globals from './Global';
import { AlpineComponent } from './Component';
export type ComponentList = {
    [name: string]: Impl.KnownConstructor<any>;
};
export declare class ComponentStore {
    private alpine;
    private logErrors;
    private initialized;
    private components;
    constructor(alpine: Globals.Alpine, components?: ComponentList, logErrors?: boolean);
    private init;
    component(name: string): Impl.AlpineComponentConstructor;
    registerAll(components: ComponentList): void;
    register<T>(name: string, component: Impl.KnownConstructor<T>): void;
    register<T extends Impl.AlpineComponent>(component: Impl.KnownClassConstructor<T>, name?: string): void;
    private registerConstructorAsAlpineData;
    private static getObjectData;
    private static getClassData;
    private logRegisterFailure;
}
export declare function transformToAlpineData<T extends AlpineComponent>(instance: T): object;
export declare function makeAlpineConstructor<T extends AlpineComponent>(component: Impl.KnownClassConstructor<T>): Impl.AlpineComponentConstructor;
