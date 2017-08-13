import { IContext } from "./context";
export interface IServiceConstructor extends IConstructor {
    service_name: string | number;
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
    /**
     * registers instance of a class with given runtime id
     * @param runtime_id
     * @returns {function(any)}
     */
    Injectable: (runtime_id: string | number) => (target: IConstructor) => any;
    /**
     * injects dependency with given runtime id to the decorated field on first get
     *
     * @param runtime_id - runtime id or array of runtime ids
     * @returns {function(any, string)}
     * @constructor
       */
    Inject: (runtime_id: string | number) => ((target: any, key: string) => void);
    /**
     * injects dependency with given runtime ids to the decorated class'es constructor
     */
    ConstructorInject: (...runtime_id: (string | number)[]) => (target: Function) => any;
    getContext(): IContext;
    mock(runtime_id: string | number, mock: any): void;
    clearMocks(): void;
    createTestContext(): void;
    clearTestContext(): void;
    private is_test_context;
    private context;
    private old_context;
}
