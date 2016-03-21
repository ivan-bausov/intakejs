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

  it('@Injectable decorator works', ()=>{
    @injector.Injectable('injectable_productor')
    class Productor {
      method() {
        return 'foo';
      }
    }

    class Consumer {
      public getFoo() {
        return this.foo.method();
      }
      @injector.Inject('injectable_productor')
      private foo: Productor;
    }

    expect(new Consumer().getFoo()).toBe('foo');
  });

  it('creates and clears separate test context', ()=>{
    class Consumer {
      public getFoo() {
        return this.foo && this.foo.method();
      }
      @injector.Inject('productor')
      private foo: Productor;
    }

    var consumer = new Consumer()

    @injector.Service
    class Productor {
      static service_name = 'productor';
      method() {
        return 'foo';
      }
    }

    injector.createTestContext();

    injector.getContext().register('productor', { method: ()=>'test_foo'}, true);

    expect(consumer.getFoo()).toBe('test_foo');

    injector.clearTestContext();

    expect(consumer.getFoo()).toBe('foo');
  });

});
