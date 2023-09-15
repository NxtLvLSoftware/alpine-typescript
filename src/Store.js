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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUMsZUFBZSxFQUFrQyxNQUFNLGFBQWEsQ0FBQztBQUs3RSxJQUFNLGFBQWEsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDdEcsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU07SUFDcEcsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUs7SUFDcEcsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUcsV0FBVyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUTtJQUNwRyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTztJQUNuRyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFpQmxCLElBQUssd0JBS0o7QUFMRCxXQUFLLHdCQUF3QjtJQUM1Qiw2SEFBK0IsQ0FBQTtJQUMvQixxSkFBMkMsQ0FBQTtJQUMzQyx1R0FBb0IsQ0FBQTtJ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
