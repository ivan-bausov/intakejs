/// <reference path="./all.d.ts" />
import {IServiceConstructor, default as Injector}  from "./injector";

const injector = new Injector();

export {IServiceConstructor} from "./injector";
import {IContext} from "./context";
export {IContext} from "./context";

export const Service = injector.Service;
export const Inject = injector.Inject;
export const context: IContext = injector.getContext();
