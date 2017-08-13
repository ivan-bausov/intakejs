import Context from "./context";
import {IContext} from "./context";

export interface IServiceConstructor extends IConstructor{
  service_name: string | number;
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

    this.Injectable = (runtime_id: string | number) => {
      return (target: IConstructor) => {
        self.getContext().register(runtime_id, ()=>new target());
      }
    };

    this.Inject = (runtime_id: string | number) => {
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

    this.ConstructorInject = (...runtime_ids: (string | number)[]) => {
      return (target: Function)=>{
        // save a reference to the original constructor
        var original = target;

        // a utility function to generate instances of a class
        function construct(constructor: Function, args: any) {
          var c : any = function () {
            return constructor.apply(this, args);
          };
          c.prototype = constructor.prototype;
          return new c();
        }

        // the new constructor behaviour
        var f : any = function (...args: any[]) {

          let injected_deps: any[] = [];
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
  public Injectable: (runtime_id: string | number) => (target: IConstructor)=>any;

  /**
   * injects dependency with given runtime id to the decorated field on first get
   *
   * @param runtime_id - runtime id or array of runtime ids
   * @returns {function(any, string)}
   * @constructor
     */
  public Inject: (runtime_id: string | number)=>((target: any, key: string)=>void);

  /**
   * injects dependency with given runtime ids to the decorated class'es constructor
   */
  public ConstructorInject: (...runtime_id: (string | number) [])=>(target: Function)=>any;

  public getContext(): IContext {
    return this.context;
  }

  public mock(runtime_id: string | number, mock: any) {
    this.createTestContext();
    this.getContext().register(runtime_id, mock, true);
  }

  public clearMocks() {
    this.clearTestContext();
  }

  public createTestContext() {
    if (this.is_test_context) {
      return;
    }
    this.old_context = this.context;
    this.context = this.context.clone();
    this.is_test_context = true;
  }

  public clearTestContext() {
    this.context = this.old_context;
    this.old_context = null;
    this.is_test_context = false;
  }

  private is_test_context: boolean = false;

  private context: IContext = new Context();

  private old_context: IContext;
}
