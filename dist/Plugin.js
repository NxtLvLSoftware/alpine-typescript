var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ComponentStore } from './Store';
export var AlpineComponents;
(function (AlpineComponents) {
    /**
     * Default bootstrap options.
     *
     * Assumes production environment.
     *
     * @public
     */
    AlpineComponents.defaultOptions = {
        components: {},
        bootstrapAlpine: false,
        startAlpine: true,
        logErrors: false
    };
    /**
     * Bootstrap the components package.
     *
     * @public
     *
     * @param options Provided options (defaults applied to missing values {@link defaultOptions}.)
     * @param alpine The Alpine instance to use (defaults to window.Alpine or creates Alpine when
     * the bootstrapAlpine option is set)
     */
    function bootstrap(options, alpine) {
        if (options === void 0) { options = AlpineComponents.defaultOptions; }
        if (alpine === void 0) { alpine = window.Alpine; }
        var opts = __assign(__assign({}, AlpineComponents.defaultOptions), options);
        if (opts.bootstrapAlpine && alpine !== undefined) {
            if (opts.logErrors) {
                console.error('Cannot bootstrap Alpine when window.Alpine is already defined.');
            }
            return;
        }
        Promise.resolve(opts.bootstrapAlpine ?
            import('alpinejs').then(function (imp) { return imp.default; }) : alpine).then(function (alpine) {
            if (opts.bootstrapAlpine) {
                window.Alpine = alpine;
            }
            window.AlpineComponents = new ComponentStore(alpine, opts.components, opts.logErrors);
            if (opts.startAlpine) {
                alpine.start();
            }
        });
    }
    AlpineComponents.bootstrap = bootstrap;
})(AlpineComponents || (AlpineComponents = {}));
/**
 * Export a function to be used with `Alpine.plugin()`.
 *
 * @public
 *
 * Calls {@link AlpineComponents.bootstrap} with sensible options.
 *
 * @param alpine
 */
export function componentsPlugin(alpine) {
    AlpineComponents.bootstrap({
        bootstrapAlpine: false,
        startAlpine: false
    }, alpine);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFFTixjQUFjLEVBQ2QsTUFBTSxTQUFTLENBQUM7QUFFakIsTUFBTSxLQUFXLGdCQUFnQixDQXFGaEM7QUFyRkQsV0FBaUIsZ0JBQWdCO0lBNEJoQzs7Ozs7O09BTUc7SUFDVSwrQkFBYyxHQUFZO1FBQ3RDLFVBQVUsRUFBRSxFQUFFO1FBRWQsZUFBZSxFQUFFLEtBQUs7UUFDdEIsV0FBVyxFQUFFLElBQUk7UUFFakIsU0FBUyxFQUFFLEtBQUs7S0FDaEIsQ0FBQztJQUVGOzs7Ozs7OztPQVFHO0lBQ0gsU0FBZ0IsU0FBUyxDQUN4QixPQUEwQyxFQUMxQyxNQUFxQztRQURyQyx3QkFBQSxFQUFBLFVBQTRCLCtCQUFjO1FBQzFDLHVCQUFBLEVBQUEsU0FBd0IsTUFBTSxDQUFDLE1BQU07UUFFckMsSUFBTSxJQUFJLHlCQUNOLGlCQUFBLGNBQWMsR0FDZCxPQUFPLENBQ1YsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbEQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztZQUNqRixDQUFDO1lBQ0QsT0FBTztRQUNSLENBQUM7UUFFRCxPQUFPLENBQUMsT0FBTyxDQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsR0FBRyxDQUFDLE9BQU8sRUFBWCxDQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUN2RCxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQXFCO1lBQzVCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsTUFBTSxHQUFpQyxNQUFNLENBQUM7WUFDdEQsQ0FBQztZQUVELE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdEYsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBOUJlLDBCQUFTLFlBOEJ4QixDQUFBO0FBRUYsQ0FBQyxFQXJGZ0IsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQXFGaEM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFzQjtJQUN0RCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7UUFDMUIsZUFBZSxFQUFFLEtBQUs7UUFDdEIsV0FBVyxFQUFFLEtBQUs7S0FDbEIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNaLENBQUMifQ==