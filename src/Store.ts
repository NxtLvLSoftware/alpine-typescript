import type Alpine from 'alpinejs';
import type * as Impl from './Component';
import type * as Globals from './Global';

import {AlpineComponent, type AlpineComponentConstructor} from './Component';

/**
 * @see https://www.w3schools.com/js/js_reserved.asp
 *
 * @internal
 */
const ReservedNames = ['abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case',
	'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else',
	'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto',
	'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
	'null', 'package', 'private',  'protected', 'public', 'return', 'short', 'static', 'super', 'switch',
	'this',	'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
	'with', 'yield'];

/**
 * Type definition for list of named component constructors.
 *
 * @public
 */
export type ComponentList = {
	[name: string]: Impl.KnownConstructor<any>
};

/**
 * Internal type for component registration.
 *
 * @internal
 */
type ComponentConstructorData = {
	name: string,
	constructor: Impl.AlpineComponentConstructor
};

/**
 * Internal component registration failure reasons.
 *
 * @internal
 */
enum RegisterComponentFailure {
	GenericMustHaveFunctionAsSecond,
	NameMustBeProvidedForComponentWithNoDefault,
	UnknownArgumentTypes,
	ReservedName
}

export class ComponentStore {
	private initialized: boolean = false;

	private alpine: Globals.AlpineWithComponents;

	private components: Record<string, AlpineComponentConstructor> = {};

	constructor(
		alpinejs: typeof Alpine,
		components: ComponentList = {},
		private readonly logErrors: boolean = false
	) {
		this.alpine = <Globals.AlpineWithComponents>alpinejs;
		this.alpine.Components = this;
		this.alpine.component = this.component;

		Object.entries(components).forEach(([name, component]): void => {
			this.register(name, component);
		});

		window.addEventListener('alpine:init', (): void => {
			this.init();
		});
	}

	private init(): void {
		if (this.initialized) {
			return;
		}

		document.dispatchEvent(new CustomEvent('alpine-components:init'));

		Object.entries(this.components)
			.forEach(([name]) =>
				this.registerConstructorAsAlpineData(name));

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
	component(name: string): Impl.AlpineComponentConstructor {
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
	register<T>(name: string, component: Impl.KnownConstructor<T>): void;

	/**
	 * Register a class inheriting from {@link Impl.AlpineComponent} as a component.
	 *
	 * @param component The name/symbol of the class to register as a component.
	 * @param name The name of the component (registered to alpine for use with x-data.)
	 */
	register<T extends Impl.AlpineComponent>(component: Impl.KnownClassConstructor<T>, name?: string): void;

	register<T>(
		// @ts-expect-error TS3244
		nameOrComponentClass: string|Impl.KnownConstructor<T>|Impl.KnownClassConstructor<T>,
		constructorOrComponentName: Impl.KnownConstructor<T>|string = ''
	): void {
		let component: ComponentConstructorData;

		if (typeof nameOrComponentClass === 'string') { // register generic object (normal alpine data)
			if (typeof constructorOrComponentName === 'string') {
				this.logRegisterFailure(RegisterComponentFailure.GenericMustHaveFunctionAsSecond);
				return;
			}
			component = ComponentStore.getObjectData<T>(nameOrComponentClass, constructorOrComponentName);
		} else if (typeof nameOrComponentClass === 'function') { // register class as component
			component = ComponentStore.getClassData(<Impl.KnownClassConstructor<Impl.AlpineComponent>>nameOrComponentClass, <string>constructorOrComponentName);
			if (component.name === "") {
				this.logRegisterFailure(RegisterComponentFailure.NameMustBeProvidedForComponentWithNoDefault);
			}
		} else {
			this.logRegisterFailure(RegisterComponentFailure.UnknownArgumentTypes);
			return;
		}

		if (ReservedNames.includes(component.name)) {
			this.logRegisterFailure(RegisterComponentFailure.ReservedName);
		}

		this.components[component.name] = component.constructor;

		if (this.initialized) {
			this.registerConstructorAsAlpineData(component.name);
		}
	}

	/**
	 * Register a component to Alpine through Alpine.data().
	 *
	 * @param name The name of the component (must already be registered to the store.)
	 */
	private registerConstructorAsAlpineData(name: string): void {
		this.alpine.data(name, this.component(name));
	}

	private static getObjectData<T>(
		name: string,
		component: Impl.KnownConstructor<T>
	): ComponentConstructorData {
		return {
			name: name,
			constructor: <AlpineComponentConstructor>((component.prototype instanceof AlpineComponent) ?
				// @ts-ignore
				makeAlpineConstructor<T>(component) : component)
		};
	}

	private static getClassData<T extends Impl.AlpineComponent>(
		component: Impl.KnownClassConstructor<T>,
		name?: string
	): ComponentConstructorData {
		const resolvedName: string = (name !== undefined ? name : component.prototype.name);

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
			case RegisterComponentFailure.ReservedName:
				console.error(`Cannot register component with name matching a reserved keyword.`);
				break;
		}
	}

}

/**
 * Copy prototype functions and object properties to an empty object.
 *
 * @param instance The object to copy functions and properties from
 */
export function transformToAlpineData<T extends AlpineComponent>(instance: T): object {
	let methodNames: string[] = [];
	for (
		let prototype = Object.getPrototypeOf(instance);
		prototype.constructor.name !== 'Object';
		prototype = Object.getPrototypeOf(prototype)
	) {
		Object.getOwnPropertyNames(prototype).forEach((name: string): void => {
			if (methodNames.includes(name)) {
				return;
			}
			methodNames.push(name);
		});
	}

	return [
		...methodNames, // methods
		...Object.getOwnPropertyNames(instance) // properties
	].reduce((obj: {}, name: string) => {
		// @ts-ignore
		obj[name] = instance[name];

		return obj;
	}, {});
}

/**
 * Transform a class constructor into an alpine constructor function.
 *
 * @param component The class constructor
 */
export function makeAlpineConstructor<T extends AlpineComponent>(component: Impl.KnownClassConstructor<T>): Impl.AlpineComponentConstructor {
	return (...args: any[]) => transformToAlpineData(new component(...args));
}
