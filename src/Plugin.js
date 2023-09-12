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
import { ComponentStore } from "./Store";
export var AlpineComponents;
(function (AlpineComponents) {
    AlpineComponents.defaultOptions = {
        components: {},
        startAlpine: true,
        logErrors: false
    };
    function bootstrap(options, alpine) {
        if (options === void 0) { options = AlpineComponents.defaultOptions; }
        if (alpine === void 0) { alpine = window.Alpine; }
        var opts = __assign(__assign({}, AlpineComponents.defaultOptions), options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUVOLGNBQWMsRUFDZCxNQUFNLFNBQVMsQ0FBQztBQUVqQixNQUFNLEtBQVcsZ0JBQWdCLENBOEJoQztBQTlCRCxXQUFpQixnQkFBZ0I7SUFRbkIsK0JBQWMsR0FBWTtRQUN0QyxVQUFVLEVBQUUsRUFBRTtRQUNkLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFNBQVMsRUFBRSxLQUFLO0tBQ2hCLENBQUM7SUFFRixTQUFnQixTQUFTLENBQ3hCLE9BQTBDLEVBQzFDLE1BQXNDO1FBRHRDLHdCQUFBLEVBQUEsVUFBNEIsK0JBQWM7UUFDMUMsdUJBQUEsRUFBQSxTQUF5QixNQUFNLENBQUMsTUFBTTtRQUV0QyxJQUFNLElBQUkseUJBQ04saUJBQUEsY0FBYyxHQUNkLE9BQU8sQ0FDVixDQUFDO1FBRUYsTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0RixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Y7SUFDRixDQUFDO0lBZGUsMEJBQVMsWUFjeEIsQ0FBQTtBQUVGLENBQUMsRUE5QmdCLGdCQUFnQixLQUFoQixnQkFBZ0IsUUE4QmhDO0FBT0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQXNCO0lBQ3RELGdCQUFnQixDQUFDLFNBQVMsQ0FBQztRQUMxQixXQUFXLEVBQUUsS0FBSztLQUNsQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ1osQ0FBQyJ9