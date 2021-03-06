import Context from "../lib/context";

describe('Context', ()=>{
  var context: Context;

  const ID = 'some_id';
  const INSTANCE = {};

  beforeEach(()=>{
    context = new Context();
  });
  it('resolves previously registered instance', ()=>{
    context.register(ID, INSTANCE);
    expect(context.resolve(ID)).toBe(INSTANCE);
  });
  it('resolves registered instance via creator', ()=>{
    var called = false;
    context.register(ID, ()=>{
      called = true;
      return INSTANCE;
    });
    expect(called).toBe(false);
    expect(context.resolve(ID)).toBe(INSTANCE);
    expect(called).toBe(true);
  });
  it('calls creator once', ()=>{
    var called = 0;
    context.register(ID, ()=>{
      called++;
      return INSTANCE;
    });
    expect(context.resolve(ID)).toBe(INSTANCE);
    expect(context.resolve(ID)).toBe(INSTANCE);
    expect(called).toBe(1);
  });
  it('clear', ()=>{
    context.register(ID, INSTANCE);
    context.clear();
    expect(()=>{context.resolve(ID)}).toThrow();
  });
  it('throws error, if registered twice', ()=>{
    context.register(ID, INSTANCE);
    expect(()=>{context.register(ID, INSTANCE)}).toThrow();
  });
  it('clone', ()=>{
    context.register(ID, INSTANCE);
    var new_one = context.clone();
    expect(new_one.resolve(ID)).toBe(INSTANCE);
  });
});
