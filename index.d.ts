/**
 * Export functions and types.
 */
export { type KnownClassConstructor, type KnownConstructor, type AlpineComponentConstructor, type AlpineDataContext, type AlpineData, AlpineComponent } from './src/Component';
export { type ComponentList, ComponentStore, transformToAlpineData, makeAlpineConstructor } from './src/Store';
export * as Globals from './src/Global';
export { AlpineComponents, componentsPlugin } from './src/Plugin';
/**
 * Alpine plugin as default export.
 */
import { componentsPlugin } from './src/Plugin';
export default componentsPlugin;
