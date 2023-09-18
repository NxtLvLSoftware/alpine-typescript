import type Alpine from 'alpinejs';
import type * as Impl from './Component';
import { AlpineComponent } from './Component';
/**
 * Type definition for list of named component constructors.
 */
export type ComponentList = {
    [name: string]: Impl.KnownConstructor<any>;
};
export declare class ComponentStore {
    private readonly logErrors;
    private initialized;
    private alpine;
    private components;
    constructor(alpinejs: typeof Alpine, components?: ComponentList, logErrors?: boolean);
    private init;
    /**
     * Retrieve a registered component constructor.
     *
     * @param name The component name
     *
     * @return ComponentConstructor
     *
     * If registered, returns a callable that accepts the component constructor arguments
     * and creates the component object. Returns undefined if not registered.
     */
    component(name: string): Impl.AlpineComponentConstructor;
    registerAll(components: ComponentList): void;
    /**
     * Register a generic object (alpine data) as a component.
     *
     * @param name The name of the component (registered to alpine for use with x-data.)
     * @param component The function that returns component data.
     */
    register<T>(name: string, component: Impl.KnownConstructor<T>): void;
    /**
     * Register a class inheriting from {@link Impl.AlpineComponent} as a component.
     *
     * @param component The name/symbol of the class to register as a component.
     * @param name The name of the component (registered to alpine for use with x-data.)
     */
    register<T extends Impl.AlpineComponent>(component: Impl.KnownClassConstructor<T>, name?: string): void;
    /**
     * Register a component to Alpine through Alpine.data().
     *
     * @param name The name of the component (must already be registered to the store.)
     */
    private registerConstructorAsAlpineData;
    private static getObjectData;
    private static getClassData;
    private logRegisterFailure;
}
/**
 * Copy prototype functions and object properties to an empty object.
 *
 * @param instance The object to copy functions and properties from
 */
export declare function transformToAlpineData<T extends AlpineComponent>(instance: T): object;
/**
 * Transform a class constructor into an alpine constructor function.
 *
 * @param component The class constructor
 */
export declare function makeAlpineConstructor<T extends AlpineComponent>(component: Impl.KnownClassConstructor<T>): Impl.AlpineComponentConstructor;
