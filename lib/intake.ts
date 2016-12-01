import {IServiceConstructor, IConstructor, default as Injector}  from "./injector";

var _injector = new Injector();

export {IServiceConstructor} from "./injector";
export {IConstructor} from "./injector";
import {IContext} from "./context";
export {IContext} from "./context";

export const Service = _injector.Service;
export const Injectable = _injector.Injectable;
export const Inject = _injector.Inject;
export const ConstructorInject = _injector.ConstructorInject;

export const injector = _injector;
export const context: IContext = _injector.getContext();
