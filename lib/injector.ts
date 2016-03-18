import Context from "./context";
import {IContext} from "./context";

export interface IServiceConstructor {
  new(): any;
  service_name: string;
}

export default class Injector {
  constructor() {
    this.Service = function (target: IServiceConstructor) {
      this.getContext().register(target.service_name, ()=>new target());

      return target;
    };

    this.Inject = function(runtime_id: string) {
      return (target: any, key: string) => {
        Object.defineProperty(target, key, {
          get: () => {
            return this.getContext().resolve(runtime_id);
          },
          set: () => {
            throw new Error(`Cannot set injected field "${key}"`)
          }
        });
      }
    };

  }
  /**
   * registers a service
   * @param target
   * @constructor
     */
  public Service: (target: IServiceConstructor) => any;

  /**
   * injects dependency with given runtime id to the decorated field on first get
   *
   * @param runtime_id
   * @returns {function(any, string)}
   * @constructor
     */
  public Inject: (runtime_id: string)=>((target, key)=>void);

  public getContext(): IContext {
    return this.context;
  }

  public createTestContext() {
    this.old_context = this.context;
    this.context = this.context.clone();
  }

  public clearTestContext() {
    this.context = this.old_context;
  }

  private context: IContext = new Context();

  private old_context: IContext;
}


function isString(s): s is string {
  return typeof s === 'string';
}
