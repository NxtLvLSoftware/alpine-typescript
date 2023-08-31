/**
 * Export functions and types.
 */

export {
	type KnownConstructor,
	type Constructor,
	type AlpineDataContext,
	type AlpineData,
	AlpineComponent
} from './src/Component'

export {
	type ComponentList,
	type ComponentClassList,
	ComponentStore,
	transformToAlpineData,
	makeAlpineConstructor
} from './src/Store'

export * as Globals from './src/Global';

export {
	AlpineComponents,
	componentsPlugin
} from './src/Plugin';


/**
 * Alpine plugin as default export.
 */
import { componentsPlugin } from './src/Plugin';
export default componentsPlugin;
