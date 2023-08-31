import type * as Impl from "./Component"
import type * as Globals from './Global'

import {AlpineComponent} from "./Component";

export type ComponentList = {
	[name: string]: Impl.Constructor
};

export type ComponentClassList = {
	[name: string]: Impl.Constructor
}|Impl.ComponentType<Impl.AlpineComponent>[];

type ComponentConstructorData<T> = { name: string, constructor: Impl.Constructor<T> };

enum RegisterComponentFailure {
	GenericMustHaveFunctionAsSecond,
	NameMustBeProvidedForComponentWithNoDefault,
	UnknownArgumentTypes
}

export class ComponentStore {
	private initialized: boolean = false;

	private components: ComponentList = {};

	constructor(
		private alpine: Globals.Alpine,
		components: ComponentClassList = [],
		private logErrors: boolean = false
	) {
		if (Array.isArray(components)) {
			components.forEach((component) => {
				this.register(component);
			});
		} else {
			Object.entries(components).forEach(([name, component]) => {
				this.register(name, component);
			});
		}

		window.addEventListener('alpine:init', () => {
			this.init();
		});
	}

	private init(): void {
		if (this.initialized) {
			return;
		}

		this.alpine.Components = this;
		this.alpine.component = this.component;

		document.dispatchEvent(new CustomEvent('alpine-components:init'));

		Object.entries(this.components)
			.forEach(([name, component]) =>
				this.registerConstructorAsAlpineData(name, component));

		this.initialized = true;
	}

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
	component(name: string): Impl.Constructor {
		// @ts-ignore
		return this.components[name];
	}

	registerAll(components: ComponentList): void {
		Object.entries(components)
			.forEach(([name, component]) =>
				this.register(name, component));
	}

	/**
	 * Register a generic object (alpine data) as a component.
	 *
	 * @param name The name of the component (registered to alpine for use with x-data.)
	 * @param component The function that returns component data.
	 */
	register(name: string, component: Impl.Constructor): void;

	/**
	 * Register a class inheriting from {@link Impl.AlpineComponent} as a component.
	 *
	 * @param component The name/symbol of the class to register as a component.
	 * @param name The name of the component (registered to alpine for use with x-data.)
	 */
	register<T extends Impl.AlpineComponent>(component: Impl.ComponentType<T>, name?: string): void;

	register<T>(
		nameOrComponentClass: string|Impl.Constructor<T>|Impl.ComponentType<T>,
		constructorOrComponentName: string|Impl.Constructor<T> = ''
	): void {
		let component: ComponentConstructorData<T>;

		if (typeof nameOrComponentClass === 'string') { // register generic object (normal alpine data)
			if (typeof constructorOrComponentName === 'string') {
				this.logRegisterFailure(RegisterComponentFailure.GenericMustHaveFunctionAsSecond);
				return;
			}
			component = ComponentStore.getObjectData(nameOrComponentClass, constructorOrComponentName);
		} else if (typeof nameOrComponentClass === 'function') { // register class as component
			component = ComponentStore.getClassData(<Impl.ComponentType<Impl.AlpineComponent>>nameOrComponentClass, <string>constructorOrComponentName);
			if (component.name === "") {
				this.logRegisterFailure(RegisterComponentFailure.NameMustBeProvidedForComponentWithNoDefault);
			}
		} else {
			this.logRegisterFailure(RegisterComponentFailure.UnknownArgumentTypes);
			return;
		}

		this.components[component.name] = component.constructor;

		if (this.initialized) {
			this.registerConstructorAsAlpineData(component.name, component.constructor);
		}
	}

	private registerConstructorAsAlpineData<T>(name: string, constructor: Impl.Constructor<T>): void {
		this.alpine.data(name, constructor);
	}

	private static getObjectData<T extends object>(
		name: string,
		component: Impl.Constructor<T>
	): ComponentConstructorData<T> {
		return {
			name: name,
			constructor: (component.prototype instanceof AlpineComponent) ?
				// @ts-ignore
				makeAlpineConstructor<T>(component) : component
		};
	}

	private static getClassData<T extends Impl.AlpineComponent>(
		component: Impl.ComponentType<T>,
		name?: string
	): ComponentConstructorData<T> {
		const resolvedName: string = (name !== undefined ? name :
			(component.defaultName !== undefined ? component.defaultName : component.prototype.name));

		return {
			name: resolvedName,
			constructor: makeAlpineConstructor<T>(component)
		};
	}

	private logRegisterFailure(reason: RegisterComponentFailure): void {
		if (!this.logErrors) {
			return;
		}

		switch (reason) {
			case RegisterComponentFailure.GenericMustHaveFunctionAsSecond:
				console.error(`Second argument must be a constructor function for component.`);
				break;
			case RegisterComponentFailure.NameMustBeProvidedForComponentWithNoDefault:
				// should be impossible because we fall back to prototype name
				console.error(`Component name must be provided when class doesn't specify a default.`);
				break;
			case RegisterComponentFailure.UnknownArgumentTypes:
				console.error(`Cannot register component with provided argument types. Check Typescript definitions for usage.`);
				break;
		}
	}

}

export function transformToAlpineData<T extends AlpineComponent>(instance: T): object {
	return [
		...Object.getOwnPropertyNames(Object.getPrototypeOf(instance)), // methods
		...Object.getOwnPropertyNames(instance) // properties
	].reduce((obj, name) => {
		// @ts-ignore
		obj[name] = instance[name];

		return obj;
	}, {});
}

export function makeAlpineConstructor<T extends AlpineComponent>(component: Impl.KnownConstructor<T>): Impl.Constructor<T> {
	return (...args: any[]) => transformToAlpineData(new component(...args));
}
