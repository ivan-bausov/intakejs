"use strict";
exports.__esModule = true;
var context_1 = require("./context");
var Injector = (function () {
    function Injector() {
        this.is_test_context = false;
        this.context = new context_1["default"]();
        var self = this;
        this.Service = function (target) {
            self.getContext().register(target.service_name, function () { return new target(); });
            return target;
        };
        this.Injectable = function (runtime_id) {
            return function (target) {
                self.getContext().register(runtime_id, function () { return new target(); });
            };
        };
        this.Inject = function (runtime_id) {
            return function (target, key) {
                Object.defineProperty(target, key, {
                    get: function () {
                        return self.getContext().resolve(runtime_id);
                    },
                    set: function () {
                        throw new Error("Cannot set injected field \"" + key + "\"");
                    }
                });
            };
        };
        this.ConstructorInject = function () {
            var runtime_ids = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                runtime_ids[_i] = arguments[_i];
            }
            return function (target) {
                // save a reference to the original constructor
                var original = target;
                // a utility function to generate instances of a class
                function construct(constructor, args) {
                    var c = function () {
                        return constructor.apply(this, args);
                    };
                    c.prototype = constructor.prototype;
                    return new c();
                }
                // the new constructor behaviour
                var f = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var injected_deps = [];
                    var i = 0;
                    for (var _a = 0, runtime_ids_1 = runtime_ids; _a < runtime_ids_1.length; _a++) {
                        var id = runtime_ids_1[_a];
                        if (typeof args[i] === 'undefined') {
                            injected_deps.push(self.getContext().resolve(id));
                        }
                        else {
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
            };
        };
    }
    Injector.prototype.getContext = function () {
        return this.context;
    };
    Injector.prototype.mock = function (runtime_id, mock) {
        this.createTestContext();
        this.getContext().register(runtime_id, mock, true);
    };
    Injector.prototype.clearMocks = function () {
        this.clearTestContext();
    };
    Injector.prototype.createTestContext = function () {
        if (this.is_test_context) {
            return;
        }
        this.old_context = this.context;
        this.context = this.context.clone();
        this.is_test_context = true;
    };
    Injector.prototype.clearTestContext = function () {
        this.context = this.old_context;
        this.old_context = null;
        this.is_test_context = false;
    };
    return Injector;
}());
exports["default"] = Injector;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUM7SUFDL0IsQ0FBQztJQU9ILGVBQUM7QUFBRCxDQWpJQSxBQWlJQyxJQUFBIiwiZmlsZSI6ImluamVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vY29udGV4dFwiO1xuaW1wb3J0IHtJQ29udGV4dH0gZnJvbSBcIi4vY29udGV4dFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZXJ2aWNlQ29uc3RydWN0b3IgZXh0ZW5kcyBJQ29uc3RydWN0b3J7XG4gIHNlcnZpY2VfbmFtZTogc3RyaW5nIHwgbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25zdHJ1Y3RvciB7XG4gIG5ldygpOiBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5TZXJ2aWNlID0gKHRhcmdldDogSVNlcnZpY2VDb25zdHJ1Y3RvcikgPT4ge1xuICAgICAgc2VsZi5nZXRDb250ZXh0KCkucmVnaXN0ZXIodGFyZ2V0LnNlcnZpY2VfbmFtZSwgKCk9Pm5ldyB0YXJnZXQoKSk7XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcblxuICAgIHRoaXMuSW5qZWN0YWJsZSA9IChydW50aW1lX2lkOiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiAodGFyZ2V0OiBJQ29uc3RydWN0b3IpID0+IHtcbiAgICAgICAgc2VsZi5nZXRDb250ZXh0KCkucmVnaXN0ZXIocnVudGltZV9pZCwgKCk9Pm5ldyB0YXJnZXQoKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuSW5qZWN0ID0gKHJ1bnRpbWVfaWQ6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuICh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5nZXRDb250ZXh0KCkucmVzb2x2ZShydW50aW1lX2lkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2V0IGluamVjdGVkIGZpZWxkIFwiJHtrZXl9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuQ29uc3RydWN0b3JJbmplY3QgPSAoLi4ucnVudGltZV9pZHM6IChzdHJpbmcgfCBudW1iZXIpW10pID0+IHtcbiAgICAgIHJldHVybiAodGFyZ2V0OiBGdW5jdGlvbik9PntcbiAgICAgICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgY29uc3RydWN0b3JcbiAgICAgICAgdmFyIG9yaWdpbmFsID0gdGFyZ2V0O1xuXG4gICAgICAgIC8vIGEgdXRpbGl0eSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBpbnN0YW5jZXMgb2YgYSBjbGFzc1xuICAgICAgICBmdW5jdGlvbiBjb25zdHJ1Y3QoY29uc3RydWN0b3I6IEZ1bmN0aW9uLCBhcmdzOiBhbnkpIHtcbiAgICAgICAgICB2YXIgYyA6IGFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGMucHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgICAgIHJldHVybiBuZXcgYygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIG5ldyBjb25zdHJ1Y3RvciBiZWhhdmlvdXJcbiAgICAgICAgdmFyIGYgOiBhbnkgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcblxuICAgICAgICAgIGxldCBpbmplY3RlZF9kZXBzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBmb3IgKGxldCBpZCBvZiBydW50aW1lX2lkcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzW2ldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBpbmplY3RlZF9kZXBzLnB1c2goc2VsZi5nZXRDb250ZXh0KCkucmVzb2x2ZShpZCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaW5qZWN0ZWRfZGVwcy5wdXNoKGFyZ3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY29uc3RydWN0KG9yaWdpbmFsLCBpbmplY3RlZF9kZXBzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBjb3B5IHByb3RvdHlwZSBzbyBpbnRhbmNlb2Ygb3BlcmF0b3Igc3RpbGwgd29ya3NcbiAgICAgICAgZi5wcm90b3R5cGUgPSBvcmlnaW5hbC5wcm90b3R5cGU7XG5cbiAgICAgICAgLy8gcmV0dXJuIG5ldyBjb25zdHJ1Y3RvciAod2lsbCBvdmVycmlkZSBvcmlnaW5hbClcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbiAgLyoqXG4gICAqIHJlZ2lzdGVycyBhIHNlcnZpY2VcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgcHVibGljIFNlcnZpY2U6ICh0YXJnZXQ6IElTZXJ2aWNlQ29uc3RydWN0b3IpID0+IGFueTtcblxuICAvKipcbiAgICogcmVnaXN0ZXJzIGluc3RhbmNlIG9mIGEgY2xhc3Mgd2l0aCBnaXZlbiBydW50aW1lIGlkXG4gICAqIEBwYXJhbSBydW50aW1lX2lkXG4gICAqIEByZXR1cm5zIHtmdW5jdGlvbihhbnkpfVxuICAgKi9cbiAgcHVibGljIEluamVjdGFibGU6IChydW50aW1lX2lkOiBzdHJpbmcgfCBudW1iZXIpID0+ICh0YXJnZXQ6IElDb25zdHJ1Y3Rvcik9PmFueTtcblxuICAvKipcbiAgICogaW5qZWN0cyBkZXBlbmRlbmN5IHdpdGggZ2l2ZW4gcnVudGltZSBpZCB0byB0aGUgZGVjb3JhdGVkIGZpZWxkIG9uIGZpcnN0IGdldFxuICAgKlxuICAgKiBAcGFyYW0gcnVudGltZV9pZCAtIHJ1bnRpbWUgaWQgb3IgYXJyYXkgb2YgcnVudGltZSBpZHNcbiAgICogQHJldHVybnMge2Z1bmN0aW9uKGFueSwgc3RyaW5nKX1cbiAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gIHB1YmxpYyBJbmplY3Q6IChydW50aW1lX2lkOiBzdHJpbmcgfCBudW1iZXIpPT4oKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyk9PnZvaWQpO1xuXG4gIC8qKlxuICAgKiBpbmplY3RzIGRlcGVuZGVuY3kgd2l0aCBnaXZlbiBydW50aW1lIGlkcyB0byB0aGUgZGVjb3JhdGVkIGNsYXNzJ2VzIGNvbnN0cnVjdG9yXG4gICAqL1xuICBwdWJsaWMgQ29uc3RydWN0b3JJbmplY3Q6ICguLi5ydW50aW1lX2lkOiAoc3RyaW5nIHwgbnVtYmVyKSBbXSk9Pih0YXJnZXQ6IEZ1bmN0aW9uKT0+YW55O1xuXG4gIHB1YmxpYyBnZXRDb250ZXh0KCk6IElDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xuICB9XG5cbiAgcHVibGljIG1vY2socnVudGltZV9pZDogc3RyaW5nIHwgbnVtYmVyLCBtb2NrOiBhbnkpIHtcbiAgICB0aGlzLmNyZWF0ZVRlc3RDb250ZXh0KCk7XG4gICAgdGhpcy5nZXRDb250ZXh0KCkucmVnaXN0ZXIocnVudGltZV9pZCwgbW9jaywgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJNb2NrcygpIHtcbiAgICB0aGlzLmNsZWFyVGVzdENvbnRleHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVUZXN0Q29udGV4dCgpIHtcbiAgICBpZiAodGhpcy5pc190ZXN0X2NvbnRleHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vbGRfY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHQuY2xvbmUoKTtcbiAgICB0aGlzLmlzX3Rlc3RfY29udGV4dCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJUZXN0Q29udGV4dCgpIHtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLm9sZF9jb250ZXh0O1xuICAgIHRoaXMub2xkX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuaXNfdGVzdF9jb250ZXh0ID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzX3Rlc3RfY29udGV4dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgY29udGV4dDogSUNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4gIHByaXZhdGUgb2xkX2NvbnRleHQ6IElDb250ZXh0O1xufVxuIl19
