export type KnownClassConstructor<T extends AlpineComponent> = new (...args: any[]) => T;
export type KnownGenericConstructor<T> = (...args: any[]) => T;
export type KnownConstructor<T> = KnownGenericConstructor<T> | KnownClassConstructor<T>;
export type AlpineComponentConstructor = (...args: any[]) => any;
export declare interface AlpineDataContext {
    init?(): void;
    [stateKey: string]: any;
}
export declare type AlpineData = AlpineDataContext | string | number | boolean;
export declare abstract class AlpineComponent<T = object> implements AlpineDataContext {
    $data: T;
    $el: HTMLElement;
    $refs: Record<string, HTMLElement>;
    $store: AlpineData;
    $dispatch: (event: string, data?: any) => void;
    $id: (name: string, key?: number | string) => string;
    $nextTick: (callback?: () => void) => Promise<void>;
    $watch: <K extends keyof T | string, V extends (K extends keyof T ? T[K] : any)>(property: K, callback: (newValue: V, oldValue: V) => void) => void;
}
