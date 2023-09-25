/**
 * Export functions and types.
 */

export {
	type KnownClassConstructor,
	type KnownConstructor,
	type AlpineComponentConstructor,
	type AlpineDataContext,
	AlpineComponent
} from './Component';

export {
	type ComponentList,
	ComponentStore,
	transformToAlpineData,
	makeAlpineConstructor
} from './Store';

export * as Globals from './Global';

export {
	AlpineComponents,
	componentsPlugin
} from './Plugin';


/**
 * Alpine plugin as default export.
 */
import {componentsPlugin} from './Plugin';
export default componentsPlugin;
