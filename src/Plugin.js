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
import Alpine from 'alpinejs';
import { ComponentStore } from './Store';
export var AlpineComponents;
(function (AlpineComponents) {
    AlpineComponents.defaultOptions = {
        components: {},
        bootstrapAlpine: false,
        startAlpine: true,
        logErrors: false
    };
    function bootstrap(options, alpine) {
        if (options === void 0) { options = AlpineComponents.defaultOptions; }
        if (alpine === void 0) { alpine = window.Alpine; }
        var opts = __assign(__assign({}, AlpineComponents.defaultOptions), options);
        if (opts.bootstrapAlpine) {
            window.Alpine = Alpine;
            alpine = window.Alpine;
        }
        window.AlpineComponents = new ComponentStore(alpine, opts.components, opts.logErrors);
        if (opts.startAlpine) {
            alpine.start();
        }
    }
    AlpineComponents.bootstrap = bootstrap;
})(AlpineComponents || (AlpineComponents = {}));
export function componentsPlugin(alpine) {
    AlpineComponents.bootstrap({
        startAlpine: false
    }, alpine);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBRTlCLE9BQU8sRUFFTixjQUFjLEVBQ2QsTUFBTSxTQUFTLENBQUM7QUFFakIsTUFBTSxLQUFXLGdCQUFnQixDQXdDaEM7QUF4Q0QsV0FBaUIsZ0JBQWdCO0lBV25CLCtCQUFjLEdBQVk7UUFDdEMsVUFBVSxFQUFFLEVBQUU7UUFFZCxlQUFlLEVBQUUsS0FBSztRQUN0QixXQUFXLEVBQUUsSUFBSTtRQUVqQixTQUFTLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBRUYsU0FBZ0IsU0FBUyxDQUN4QixPQUEwQyxFQUMxQyxNQUFzQztRQUR0Qyx3QkFBQSxFQUFBLFVBQTRCLCtCQUFjO1FBQzFDLHVCQUFBLEVBQUEsU0FBeUIsTUFBTSxDQUFDLE1BQU07UUFFdEMsSUFBTSxJQUFJLHlCQUNOLGlCQUFBLGNBQWMsR0FDZCxPQUFPLENBQ1YsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixNQUFNLENBQUMsTUFBTSxHQUFpQyxNQUFNLENBQUM7WUFDckQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDdkI7UUFFRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXRGLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZjtJQUNGLENBQUM7SUFsQmUsMEJBQVMsWUFrQnhCLENBQUE7QUFFRixDQUFDLEVBeENnQixnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBd0NoQztBQU9ELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFzQjtJQUN0RCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7UUFDMUIsV0FBVyxFQUFFLEtBQUs7S0FDbEIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNaLENBQUMifQ==