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
 * Export a function to be used with alpine.plugin().
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUVOLGNBQWMsRUFDZCxNQUFNLFNBQVMsQ0FBQztBQUVqQixNQUFNLEtBQVcsZ0JBQWdCLENBK0VoQztBQS9FRCxXQUFpQixnQkFBZ0I7SUEwQmhDOzs7O09BSUc7SUFDVSwrQkFBYyxHQUFZO1FBQ3RDLFVBQVUsRUFBRSxFQUFFO1FBRWQsZUFBZSxFQUFFLEtBQUs7UUFDdEIsV0FBVyxFQUFFLElBQUk7UUFFakIsU0FBUyxFQUFFLEtBQUs7S0FDaEIsQ0FBQztJQUVGOzs7Ozs7T0FNRztJQUNILFNBQWdCLFNBQVMsQ0FDeEIsT0FBMEMsRUFDMUMsTUFBcUM7UUFEckMsd0JBQUEsRUFBQSxVQUE0QiwrQkFBYztRQUMxQyx1QkFBQSxFQUFBLFNBQXdCLE1BQU0sQ0FBQyxNQUFNO1FBRXJDLElBQU0sSUFBSSx5QkFDTixpQkFBQSxjQUFjLEdBQ2QsT0FBTyxDQUNWLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUNqRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQzthQUNoRjtZQUNELE9BQU87U0FDUDtRQUVELE9BQU8sQ0FBQyxPQUFPLENBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsT0FBTyxFQUFYLENBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQ3ZELENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBcUI7WUFDNUIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN6QixNQUFNLENBQUMsTUFBTSxHQUFpQyxNQUFNLENBQUM7YUFDckQ7WUFFRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXRGLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Y7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUE5QmUsMEJBQVMsWUE4QnhCLENBQUE7QUFFRixDQUFDLEVBL0VnQixnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBK0VoQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFzQjtJQUN0RCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7UUFDMUIsZUFBZSxFQUFFLEtBQUs7UUFDdEIsV0FBVyxFQUFFLEtBQUs7S0FDbEIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNaLENBQUMifQ==
