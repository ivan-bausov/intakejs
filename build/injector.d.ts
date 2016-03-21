import { IContext } from "./context";
export interface IServiceConstructor extends IConstructor {
    service_name: string;
}
export interface IConstructor {
    new (): any;
}
export default class Injector {
    constructor();
    /**
     * registers a service
     * @param target
     * @constructor
       */
    Service: (target: IServiceConstructor) => any;
    Injectable: (runtime_id: string) => (target: IConstructor) => any;
    /**
     * injects dependency with given runtime id to the decorated field on first get
     *
     * @param runtime_id
     * @returns {function(any, string)}
     * @constructor
       */
    Inject: (runtime_id: string) => ((target, key) => void);
    getContext(): IContext;
    createTestContext(): void;
    clearTestContext(): void;
    private context;
    private old_context;
}
