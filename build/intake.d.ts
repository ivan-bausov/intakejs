/// <reference path="../lib/all.d.ts" />
import { IServiceConstructor, default as Injector } from "./injector";
export { IServiceConstructor } from "./injector";
import { IContext } from "./context";
export { IContext } from "./context";
export declare const Service: (target: IServiceConstructor) => any;
export declare const Inject: (runtime_id: string) => (target: any, key: any) => void;
export declare const injector: Injector;
export declare const context: IContext;
