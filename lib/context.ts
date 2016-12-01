export interface InstanceCreator<T> {
  (): T;
}

export interface IContext {
  register<T>(runtime_id: string, instance: T | InstanceCreator<T>, force?: boolean): void;
  resolve<T>(runtime_id: string): T;
  clone(): IContext;
  clear(): void;
}

export default class Context implements IContext {
  /**
   * Saves instance with given id in context. If second argument is InstanceCreator, actual instance would be
   * instantiated on first resolve.
   *
   * @param runtime_id
   * @param instance
   * @param force
     */
  register<T>(runtime_id: string, instance: T | InstanceCreator<T>, force: boolean = false) {
    if (this.map[runtime_id] && !force) {
      throw new Error(`Instance with id "${runtime_id}" is already registered`);
    }
    this.map[runtime_id] = {
      instance: isCreator(instance) ? null : instance,
      creator: isCreator(instance) ? instance : null
    };
  }

  /**
   * Returns previously registered instance for given key. If instance was never created, throws error.
   * @param runtime_id
   */
  resolve<T>(runtime_id: string): T {
    var data = this.map[runtime_id];
    if (!data) {
      throw new Error(`Instance with id ${runtime_id} not found`);
    }
    if (data.creator) {
      data.instance = data.creator();
      data.creator = null;
    }
    return data.instance;
  }

  /**
   * Removes all previously registered instances from context
   */
  clear() {
    this.map = {};
  }

  /**
   * Copies all state of current context to newly created one
   * @returns {IContext}
     */
  clone(): IContext {
    var ctx = new Context();
    for (let name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        ctx.map[name] = this.map[name];
      }
    }
    return ctx;
  }

  private map : {
    [key: string]: RuntimeData<any>;
  } = {};
}

function isCreator(obj: any) : obj is InstanceCreator<any> {
  return typeof obj === 'function';
}

interface RuntimeData<T> {
  instance: T;
  creator: InstanceCreator<T>;
}
