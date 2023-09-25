/**
 * Export functions and types.
 */
export { type AlpineBindingContext, type AlpineComponentConstructor, type AlpineData, type AlpineDataContext, type KnownConstructor, type KnownClassConstructor, type KnownGenericConstructor, AlpineComponent } from './Component';
export { type ComponentList, ComponentStore, transformToAlpineData, makeAlpineConstructor } from './Store';
export * as Globals from './Global';
export { AlpineComponents, componentsPlugin } from './Plugin';
/**
 * Alpine plugin as default export.
 */
import { componentsPlugin } from './Plugin';
export default componentsPlugin;
