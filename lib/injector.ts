import Context from "./context";

export interface IServiceConstructor {
  new(): any;
  service_name: string;
}

export default class Injector {
  constructor() {
    this.Service = ((target: IServiceConstructor) => {
      this.context.register(target.service_name, ()=>new target());

      return target;
    }).bind(this);

    this.Inject = ((runtime_id: string) => {
      return (target: any, key: string) => {
        Object.defineProperty(target, key, {
          get: () => {
            return this.context.resolve(runtime_id);
          },
          set: () => {
            throw new Error(`Cannot set injected field "${key}"`)
          }
        });
      }
    }).bind(this);

  }
  /**
   * registers a service
   * @param target
   * @constructor
     */
  public Service: (target: IServiceConstructor) => IServiceConstructor;

  /**
   * injects dependency with given runtime id to the decorated field on first get
   *
   * @param runtime_id
   * @returns {function(any, string)}
   * @constructor
     */
  public Inject: (runtime_id: string)=>((target, key)=>void);

  private context: Context = new Context();
}


function isString(s): s is string {
  return typeof s === 'string';
}
