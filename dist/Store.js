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
 *
 * @internal
 */
var ReservedNames = ['abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case',
    'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else',
    'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto',
    'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
    'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch',
    'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
    'with', 'yield'];
/**
 * Internal component registration failure reasons.
 *
 * @internal
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUEsT0FBTyxFQUFDLGVBQWUsRUFBa0MsTUFBTSxhQUFhLENBQUM7QUFFN0U7Ozs7R0FJRztBQUNILElBQU0sYUFBYSxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTTtJQUN0RyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTTtJQUNwRyxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSztJQUNwRyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRyxXQUFXLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRO0lBQ3BHLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPO0lBQ25HLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQXFCbEI7Ozs7R0FJRztBQUNILElBQUssd0JBS0o7QUFMRCxXQUFLLHdCQUF3QjtJQUM1Qiw2SEFBK0IsQ0FBQTtJQUMv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