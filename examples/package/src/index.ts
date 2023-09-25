/**
 * Export functions and types.
 */

export {AlertComponent} from './components/AlertComponent';
export {ToggleComponent} from './components/ToggleComponent';

export {
	MyComponents,
	myPlugin
} from './Plugin';


/**
 * Alpine plugin as default export.
 */
import {myPlugin} from './Plugin';
export default myPlugin;
