var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { AlpineComponent } from "./Component";
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
var ComponentStore = (function () {
    function ComponentStore(alpine, components, logErrors) {
        var _this = this;
        if (components === void 0) { components = {}; }
        if (logErrors === void 0) { logErrors = false; }
        this.alpine = alpine;
        this.logErrors = logErrors;
        this.initialized = false;
        this.components = {};
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
        this.alpine.Components = this;
        this.alpine.component = this.component;
        document.dispatchEvent(new CustomEvent('alpine-components:init'));
        Object.entries(this.components)
            .forEach(function (_a) {
            var name = _a[0];
            return _this.registerConstructorAsAlpineData(name);
        });
        this.initialized = true;
    };
    ComponentStore.prototype.component = function (name) {
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
    ComponentStore.prototype.register = function (nameOrComponentClass, constructorOrComponentName) {
        if (constructorOrComponentName === void 0) { constructorOrComponentName = ''; }
        var component;
        if (typeof nameOrComponentClass === 'string') {
            if (typeof constructorOrComponentName === 'string') {
                this.logRegisterFailure(RegisterComponentFailure.GenericMustHaveFunctionAsSecond);
                return;
            }
            component = ComponentStore.getObjectData(nameOrComponentClass, constructorOrComponentName);
        }
        else if (typeof nameOrComponentClass === 'function') {
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
    ComponentStore.prototype.registerConstructorAsAlpineData = function (name) {
        this.alpine.data(name, this.component(name));
    };
    ComponentStore.getObjectData = function (name, component) {
        return {
            name: name,
            constructor: ((component.prototype instanceof AlpineComponent) ?
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
    return __spreadArray(__spreadArray([], methodNames, true), Object.getOwnPropertyNames(instance), true).reduce(function (obj, name) {
        obj[name] = instance[name];
        return obj;
    }, {});
}
export function makeAlpineConstructor(component) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return transformToAlpineData(new (component.bind.apply(component, __spreadArray([void 0], args, false)))());
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUMsZUFBZSxFQUFrQyxNQUFNLGFBQWEsQ0FBQztBQUs3RSxJQUFNLGFBQWEsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDdEcsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU07SUFDcEcsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUs7SUFDcEcsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUcsV0FBVyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUTtJQUNwRyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTztJQUNuRyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFjbEIsSUFBSyx3QkFLSjtBQUxELFdBQUssd0JBQXdCO0lBQzVCLDZIQUErQixDQUFBO0lBQy9CLHFKQUEyQyxDQUFBO0lBQzNDLHVHQUFvQixDQUFBO0lB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