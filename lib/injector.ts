import Context from "./context";
import {IContext} from "./context";

export interface IServiceConstructor extends IConstructor{
  service_name: string;
}

export interface IConstructor {
  new(): any;
}

export default class Injector {
  constructor() {
    let self = this;

    this.Service = (target: IServiceConstructor) => {
      self.getContext().register(target.service_name, ()=>new target());

      return target;
    };

    this.Injectable = (runtime_id: string) => {
      return (target: IConstructor) => {
        self.getContext().register(runtime_id, ()=>new target());
      }
    };

    this.Inject = (runtime_id: string) => {
      return (target: any, key: string) => {
        Object.defineProperty(target, key, {
          get: () => {
            return self.getContext().resolve(runtime_id);
          },
          set: () => {
            throw new Error(`Cannot set injected field "${key}"`)
          }
        });
      }
    };

    this.ConstructorInject = (...runtime_ids: string[]) => {
      return (target: Function)=>{
        // save a reference to the original constructor
        var original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
          var c : any = function () {
            return constructor.apply(this, args);
          };
          c.prototype = constructor.prototype;
          return new c();
        }

        // the new constructor behaviour
        var f : any = function (...args) {

          let injected_deps = [];
          let i = 0;
          for (let id of runtime_ids) {
            if (typeof args[i] === 'undefined') {
              injected_deps.push(self.getContext().resolve(id));
            } else {
              injected_deps.push(args[i]);
            }
            i++;
          }
          return construct(original, injected_deps);
        };

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
      }
    }

  }
  /**
   * registers a service
   * @param target
   * @constructor
     */
  public Service: (target: IServiceConstructor) => any;

  /**
   * registers instance of a class with given runtime id
   * @param runtime_id
   * @returns {function(any)}
   */
  public Injectable: (runtime_id: string) => (target: IConstructor)=>any;

  /**
   * injects dependency with given runtime id to the decorated field on first get
   *
   * @param runtime_id - runtime id or array of runtime ids
   * @returns {function(any, string)}
   * @constructor
     */
  public Inject: (runtime_id: string)=>((target, key)=>void);

  /**
   * injects dependency with given runtime ids to the decorated class'es constructor
   */
  public ConstructorInject: (...runtime_id: string[])=>(target)=>any;

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
