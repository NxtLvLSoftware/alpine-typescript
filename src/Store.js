var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { AlpineComponent } from './Component';
/**
 * @see https://www.w3schools.com/js/js_reserved.asp
 */
var ReservedNames = ['abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case',
    'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else',
    'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto',
    'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
    'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch',
    'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
    'with', 'yield'];
var RegisterComponentFailure;
(function (RegisterComponentFailure) {
    RegisterComponentFailure[RegisterComponentFailure["GenericMustHaveFunctionAsSecond"] = 0] = "GenericMustHaveFunctionAsSecond";
    RegisterComponentFailure[RegisterComponentFailure["NameMustBeProvidedForComponentWithNoDefault"] = 1] = "NameMustBeProvidedForComponentWithNoDefault";
    RegisterComponentFailure[RegisterComponentFailure["UnknownArgumentTypes"] = 2] = "UnknownArgumentTypes";
    RegisterComponentFailure[RegisterComponentFailure["ReservedName"] = 3] = "ReservedName";
})(RegisterComponentFailure || (RegisterComponentFailure = {}));
var ComponentStore = /** @class */ (function () {
    function ComponentStore(alpinejs, components, logErrors) {
        var _this = this;
        if (components === void 0) { components = {}; }
        if (logErrors === void 0) { logErrors = false; }
        this.logErrors = logErrors;
        this.initialized = false;
        this.components = {};
        this.alpine = alpinejs;
        this.alpine.Components = this;
        this.alpine.component = this.component;
        Object.entries(components).forEach(function (_a) {
            var name = _a[0], component = _a[1];
            _this.register(name, component);
        });
        window.addEventListener('alpine:init', function () {
            _this.init();
        });
    }
    ComponentStore.prototype.init = function () {
        var _this = this;
        if (this.initialized) {
            return;
        }
        document.dispatchEvent(new CustomEvent('alpine-components:init'));
        Object.entries(this.components)
            .forEach(function (_a) {
            var name = _a[0];
            return _this.registerConstructorAsAlpineData(name);
        });
        this.initialized = true;
    };
    /**
     * Retrieve a registered component constructor.
     *
     * @param name The component name
     *
     * @return ComponentConstructor
     *
     * If registered, returns a callable that accepts the component constructor arguments
     * and creates the component object. Returns undefined if not registered.
     */
    ComponentStore.prototype.component = function (name) {
        // @ts-ignore
        return this.components[name];
    };
    ComponentStore.prototype.registerAll = function (components) {
        var _this = this;
        Object.entries(components)
            .forEach(function (_a) {
            var name = _a[0], component = _a[1];
            return _this.register(name, component);
        });
    };
    ComponentStore.prototype.register = function (
    // @ts-expect-error TS3244
    nameOrComponentClass, constructorOrComponentName) {
        if (constructorOrComponentName === void 0) { constructorOrComponentName = ''; }
        var component;
        if (typeof nameOrComponentClass === 'string') { // register generic object (normal alpine data)
            if (typeof constructorOrComponentName === 'string') {
                this.logRegisterFailure(RegisterComponentFailure.GenericMustHaveFunctionAsSecond);
                return;
            }
            component = ComponentStore.getObjectData(nameOrComponentClass, constructorOrComponentName);
        }
        else if (typeof nameOrComponentClass === 'function') { // register class as component
            component = ComponentStore.getClassData(nameOrComponentClass, constructorOrComponentName);
            if (component.name === "") {
                this.logRegisterFailure(RegisterComponentFailure.NameMustBeProvidedForComponentWithNoDefault);
            }
        }
        else {
            this.logRegisterFailure(RegisterComponentFailure.UnknownArgumentTypes);
            return;
        }
        if (ReservedNames.includes(component.name)) {
            this.logRegisterFailure(RegisterComponentFailure.ReservedName);
        }
        this.components[component.name] = component.constructor;
        if (this.initialized) {
            this.registerConstructorAsAlpineData(component.name);
        }
    };
    /**
     * Register a component to Alpine through Alpine.data().
     *
     * @param name The name of the component (must already be registered to the store.)
     */
    ComponentStore.prototype.registerConstructorAsAlpineData = function (name) {
        this.alpine.data(name, this.component(name));
    };
    ComponentStore.getObjectData = function (name, component) {
        return {
            name: name,
            constructor: ((component.prototype instanceof AlpineComponent) ?
                // @ts-ignore
                makeAlpineConstructor(component) : component)
        };
    };
    ComponentStore.getClassData = function (component, name) {
        var resolvedName = (name !== undefined ? name : component.prototype.name);
        return {
            name: resolvedName,
            constructor: makeAlpineConstructor(component)
        };
    };
    ComponentStore.prototype.logRegisterFailure = function (reason) {
        if (!this.logErrors) {
            return;
        }
        switch (reason) {
            case RegisterComponentFailure.GenericMustHaveFunctionAsSecond:
                console.error("Second argument must be a constructor function for component.");
                break;
            case RegisterComponentFailure.NameMustBeProvidedForComponentWithNoDefault:
                // should be impossible because we fall back to prototype name
                console.error("Component name must be provided when class doesn't specify a default.");
                break;
            case RegisterComponentFailure.UnknownArgumentTypes:
                console.error("Cannot register component with provided argument types. Check Typescript definitions for usage.");
                break;
            case RegisterComponentFailure.ReservedName:
                console.error("Cannot register component with name matching a reserved keyword.");
                break;
        }
    };
    return ComponentStore;
}());
export { ComponentStore };
/**
 * Copy prototype functions and object properties to an empty object.
 *
 * @param instance The object to copy functions and properties from
 */
export function transformToAlpineData(instance) {
    var methodNames = [];
    for (var prototype = Object.getPrototypeOf(instance); prototype.constructor.name !== 'Object'; prototype = Object.getPrototypeOf(prototype)) {
        Object.getOwnPropertyNames(prototype).forEach(function (name) {
            if (methodNames.includes(name)) {
                return;
            }
            methodNames.push(name);
        });
    }
    return __spreadArray(__spreadArray([], methodNames, true), Object.getOwnPropertyNames(instance) // properties
    , true).reduce(function (obj, name) {
        // @ts-ignore
        obj[name] = instance[name];
        return obj;
    }, {});
}
/**
 * Transform a class constructor into an alpine constructor function.
 *
 * @param component The class constructor
 */
export function makeAlpineConstructor(component) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return transformToAlpineData(new (component.bind.apply(component, __spreadArray([void 0], args, false)))());
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUMsZUFBZSxFQUFrQyxNQUFNLGFBQWEsQ0FBQztBQUU3RTs7R0FFRztBQUNILElBQU0sYUFBYSxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTTtJQUN0RyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTTtJQUNwRyxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSztJQUNwRyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRyxXQUFXLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRO0lBQ3BHLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPO0lBQ25HLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQWlCbEIsSUFBSyx3QkFLSjtBQUxELFdBQUssd0JBQXdCO0lBQzVCLDZIQUErQixDQUFBO0lBQy9CLHFKQUEyQyxDQUFBO0lBQzNDLHVH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
