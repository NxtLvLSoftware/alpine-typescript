/**
 * Type definition for known class constructors.
 *
 * @public
 */
export type KnownClassConstructor<T extends AlpineComponent> = new (...args: any[]) => T;
/**
 * Type definition for known generic constructors.
 *
 * @public
 */
export type KnownGenericConstructor<T> = (...args: any[]) => T;
/**
 * Type definition for supported constructor functions.
 *
 * @public
 */
export type KnownConstructor<T> = KnownGenericConstructor<T>|
	// @ts-expect-error TS2344
	KnownClassConstructor<T>;

/**
 * Type definition for alpine component constructors.
 *
 * @public
 */
export type AlpineComponentConstructor = (...args: any[]) => any;

/**
 * Copied from @types/alpinejs because it isn't exported.
 *
 * {@link https://www.npmjs.com/package/@types/alpinejs}
 *
 * @public
 */
export declare interface AlpineDataContext {
	/**
	 * Will be executed before Alpine initializes teh rest of the component.
	 */
	init?(): void;
	[stateKey: string]: any;
}

/**
 * Copied from @types/alpinejs because it isn't exported.
 *
 * {@link https://www.npmjs.com/package/@types/alpinejs}
 *
 * @public
 */
export declare type AlpineData = AlpineDataContext | string | number | boolean;

/**
 * Type used to define properties that will exist on an x-bind object at runtime.
 *
 * @template T The component type
 * @template Keys The properties to expose to the context (defaults to everything
 * accessible with `keyof`)
 * @template HiddenKeys Define accessible properties (protected/private) that are
 * not included by `keyof`
 */
export type AlpineBindingContext<
	T extends AlpineComponent,
	Keys extends keyof T = keyof T,
	HiddenKeys extends string = ''
> = Record<string, any> | (Pick<T, Keys> & {
	[K in HiddenKeys]: string | number | boolean;
});

/**
 * Light-weight interface for class based components.
 *
 * Provides property declarations for Alpine magics that will exist when
 * used as an Alpine component.
 *
 * Property declarations copied from @types/alpinejs.
 *
 * {@link https://www.npmjs.com/package/@types/alpinejs}
 *
 * @public
 */
export abstract class AlpineComponent implements AlpineDataContext {

	/**
	 * Access to current Alpine data.
	 */
	declare $data: this;

	/**
	 * Retrieve the current DOM node.
	 */
	declare $el: HTMLElement;

	/**
	 * Retrieve DOM elements marked with x-ref inside the component.
	 */
	declare $refs: Record<string, HTMLElement>;

	/**
	 * Access registered global Alpine stores.
	 */
	declare $store: AlpineData;

	/**
	 * Dispatch browser events.
	 *
	 * @param event the event name
	 * @param data an event-dependent value associated with the event, the value is then available to the handler using the CustomEvent.detail property
	 */
	declare $dispatch: (event: string, data?: any) => void;

	/**
	 * Generate an element's ID and ensure that it won't conflict with other IDs of the same name on the same page.
	 *
	 * @param name the name of the id
	 * @param key suffix on the end of the generated ID, usually helpful for the purpose of identifying id in a loop
	 */
	declare $id: (name: string, key?: number | string) => string;

	/**
	 * Execute a given expression AFTER Alpine has made its reactive DOM updates.
	 *
	 * @param callback a callback that will be fired after Alpine finishes updating the DOM
	 */
	declare $nextTick: (callback?: () => void) => Promise<void>;

	/**
	 * Fire the given callback when the value in the property is changed.
	 *
	 * @param property the component property
	 * @param callback a callback that will fire when a given property is changed
	 */
	declare $watch: <K extends keyof this | string, V extends (K extends keyof this ? this[K] : any)>(
		property: K,
		callback: (newValue: V, oldValue: V) => void,
	) => void;

	/**
	 * Declare an object as an x-bind property for this component.
	 *
	 * Use this method to define properties for use with x-bind:
	 * ```typescript
	 *   protected myBinding = this.binding({
	 *     ["@click.prevent"]() { console.log("click prevented!") }
	 *   });
	 * ```
	 *
	 * @protected
	 *
	 * @template HiddenKeys Define accessible properties (protected/private)
	 * that are not included by `keyof`
	 *
	 * @param obj The object for use with x-bind
	 *
	 * @return The same object passed to {@link obj}
	 */
	protected binding<HiddenKeys extends string = ''>(obj: AlpineBindingContext<this, keyof this, HiddenKeys>) {
		return obj;
	}

}
