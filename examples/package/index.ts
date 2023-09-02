/**
 * Export functions and types.
 */

export { AlertComponent } from './src/components/AlertComponent';
export { ToggleComponent } from './src/components/ToggleComponent';

export {
	MyComponents,
	myPlugin
} from './src/Plugin';


/**
 * Alpine plugin as default export.
 */
import { myPlugin } from './src/Plugin';
export default myPlugin;
