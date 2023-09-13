/**
 * Type definition for known class constructors.
 */
export type KnownClassConstructor<T extends AlpineComponent> = new (...args: any[]) => T;
/**
 * Type definition for known generic constructors.
 */
export type KnownGenericConstructor<T> = (...args: any[]) => T;
/**
 * Type definition for supported constructor functions.
 */
export type KnownConstructor<T> = KnownGenericConstructor<T>|
	// @ts-expect-error TS2344
	KnownClassConstructor<T>;

/**
 * Type definition for alpine component constructors.
 */
export type AlpineComponentConstructor = (...args: any[]) => any;

/**
 * Copied from @types/alpinejs because it isn't exported.
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
 */
export declare type AlpineData = AlpineDataContext | string | number | boolean;

/**
 * Light-weight interface for class based components.
 *
 * Provides property declarations for Alpine magics that will exist when
 * used as an Alpine component.
 *
 * Property declarations copied from @types/alpinejs.
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

}
