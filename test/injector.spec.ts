/// <reference path="../lib//all.d.ts" />

import Injector from "../lib/injector";

describe('Injector', ()=>{
  let injector: Injector;

  beforeEach(()=>{
    injector = new Injector();
  });

  it('injects service as dependency', ()=>{
    @injector.Service
    class Productor {
      static service_name = 'productor';
      method() {
        return 'foo';
      }
    }

    class Consumer {
      public getFoo() {
        return this.foo.method();
      }
      @injector.Inject('productor')
      private foo: Productor;
    }

    expect(new Consumer().getFoo()).toBe('foo');
  });

  it('init after injected', ()=>{
    class Consumer {
      public getFoo() {
        return this.foo && this.foo.method();
      }
      @injector.Inject('productor')
      private foo: Productor;
    }

    var consumer = new Consumer()
    expect(() => consumer.getFoo()).toThrow();

    @injector.Service
    class Productor {
      static service_name = 'productor';
      method() {
        return 'foo';
      }
    }

    expect(consumer.getFoo()).toBe('foo');
  });

});
