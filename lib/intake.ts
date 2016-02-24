/// <reference path="./all.d.ts" />
import {IServiceConstructor, default as Injector}  from "./injector";

var _injector = new Injector();

export {IServiceConstructor} from "./injector";
import {IContext} from "./context";
export {IContext} from "./context";

export const Service = _injector.Service;
export const Inject = _injector.Inject;
export const injector = _injector;
export const context: IContext = _injector.getContext();
