"use strict";
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
                runtime_ids[_i - 0] = arguments[_i];
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
                        args[_i - 0] = arguments[_i];
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
exports.__esModule = true;
exports["default"] = Injector;
function isString(s) {
    return typeof s === 'string';
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQU9ILGVBQUM7QUFBRCxDQWpJQSxBQWlJQyxJQUFBO0FBaklEOzZCQWlJQyxDQUFBO0FBR0Qsa0JBQWtCLENBQUM7SUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQztBQUMvQixDQUFDIiwiZmlsZSI6ImluamVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRleHQgZnJvbSBcIi4vY29udGV4dFwiO1xuaW1wb3J0IHtJQ29udGV4dH0gZnJvbSBcIi4vY29udGV4dFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZXJ2aWNlQ29uc3RydWN0b3IgZXh0ZW5kcyBJQ29uc3RydWN0b3J7XG4gIHNlcnZpY2VfbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25zdHJ1Y3RvciB7XG4gIG5ldygpOiBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5TZXJ2aWNlID0gKHRhcmdldDogSVNlcnZpY2VDb25zdHJ1Y3RvcikgPT4ge1xuICAgICAgc2VsZi5nZXRDb250ZXh0KCkucmVnaXN0ZXIodGFyZ2V0LnNlcnZpY2VfbmFtZSwgKCk9Pm5ldyB0YXJnZXQoKSk7XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcblxuICAgIHRoaXMuSW5qZWN0YWJsZSA9IChydW50aW1lX2lkOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiAodGFyZ2V0OiBJQ29uc3RydWN0b3IpID0+IHtcbiAgICAgICAgc2VsZi5nZXRDb250ZXh0KCkucmVnaXN0ZXIocnVudGltZV9pZCwgKCk9Pm5ldyB0YXJnZXQoKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuSW5qZWN0ID0gKHJ1bnRpbWVfaWQ6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuICh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5nZXRDb250ZXh0KCkucmVzb2x2ZShydW50aW1lX2lkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2V0IGluamVjdGVkIGZpZWxkIFwiJHtrZXl9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuQ29uc3RydWN0b3JJbmplY3QgPSAoLi4ucnVudGltZV9pZHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICByZXR1cm4gKHRhcmdldDogRnVuY3Rpb24pPT57XG4gICAgICAgIC8vIHNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIGNvbnN0cnVjdG9yXG4gICAgICAgIHZhciBvcmlnaW5hbCA9IHRhcmdldDtcblxuICAgICAgICAvLyBhIHV0aWxpdHkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgaW5zdGFuY2VzIG9mIGEgY2xhc3NcbiAgICAgICAgZnVuY3Rpb24gY29uc3RydWN0KGNvbnN0cnVjdG9yLCBhcmdzKSB7XG4gICAgICAgICAgdmFyIGMgOiBhbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBjLnByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgICByZXR1cm4gbmV3IGMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBuZXcgY29uc3RydWN0b3IgYmVoYXZpb3VyXG4gICAgICAgIHZhciBmIDogYW55ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblxuICAgICAgICAgIGxldCBpbmplY3RlZF9kZXBzID0gW107XG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGZvciAobGV0IGlkIG9mIHJ1bnRpbWVfaWRzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbaV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGluamVjdGVkX2RlcHMucHVzaChzZWxmLmdldENvbnRleHQoKS5yZXNvbHZlKGlkKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpbmplY3RlZF9kZXBzLnB1c2goYXJnc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Qob3JpZ2luYWwsIGluamVjdGVkX2RlcHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNvcHkgcHJvdG90eXBlIHNvIGludGFuY2VvZiBvcGVyYXRvciBzdGlsbCB3b3Jrc1xuICAgICAgICBmLnByb3RvdHlwZSA9IG9yaWdpbmFsLnByb3RvdHlwZTtcblxuICAgICAgICAvLyByZXR1cm4gbmV3IGNvbnN0cnVjdG9yICh3aWxsIG92ZXJyaWRlIG9yaWdpbmFsKVxuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuICAvKipcbiAgICogcmVnaXN0ZXJzIGEgc2VydmljZVxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICBwdWJsaWMgU2VydmljZTogKHRhcmdldDogSVNlcnZpY2VDb25zdHJ1Y3RvcikgPT4gYW55O1xuXG4gIC8qKlxuICAgKiByZWdpc3RlcnMgaW5zdGFuY2Ugb2YgYSBjbGFzcyB3aXRoIGdpdmVuIHJ1bnRpbWUgaWRcbiAgICogQHBhcmFtIHJ1bnRpbWVfaWRcbiAgICogQHJldHVybnMge2Z1bmN0aW9uKGFueSl9XG4gICAqL1xuICBwdWJsaWMgSW5qZWN0YWJsZTogKHJ1bnRpbWVfaWQ6IHN0cmluZykgPT4gKHRhcmdldDogSUNvbnN0cnVjdG9yKT0+YW55O1xuXG4gIC8qKlxuICAgKiBpbmplY3RzIGRlcGVuZGVuY3kgd2l0aCBnaXZlbiBydW50aW1lIGlkIHRvIHRoZSBkZWNvcmF0ZWQgZmllbGQgb24gZmlyc3QgZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBydW50aW1lX2lkIC0gcnVudGltZSBpZCBvciBhcnJheSBvZiBydW50aW1lIGlkc1xuICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24oYW55LCBzdHJpbmcpfVxuICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgcHVibGljIEluamVjdDogKHJ1bnRpbWVfaWQ6IHN0cmluZyk9PigodGFyZ2V0LCBrZXkpPT52b2lkKTtcblxuICAvKipcbiAgICogaW5qZWN0cyBkZXBlbmRlbmN5IHdpdGggZ2l2ZW4gcnVudGltZSBpZHMgdG8gdGhlIGRlY29yYXRlZCBjbGFzcydlcyBjb25zdHJ1Y3RvclxuICAgKi9cbiAgcHVibGljIENvbnN0cnVjdG9ySW5qZWN0OiAoLi4ucnVudGltZV9pZDogc3RyaW5nW10pPT4odGFyZ2V0KT0+YW55O1xuXG4gIHB1YmxpYyBnZXRDb250ZXh0KCk6IElDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xuICB9XG5cbiAgcHVibGljIG1vY2socnVudGltZV9pZDogc3RyaW5nLCBtb2NrOiBhbnkpIHtcbiAgICB0aGlzLmNyZWF0ZVRlc3RDb250ZXh0KCk7XG4gICAgdGhpcy5nZXRDb250ZXh0KCkucmVnaXN0ZXIocnVudGltZV9pZCwgbW9jaywgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJNb2NrcygpIHtcbiAgICB0aGlzLmNsZWFyVGVzdENvbnRleHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVUZXN0Q29udGV4dCgpIHtcbiAgICBpZiAodGhpcy5pc190ZXN0X2NvbnRleHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vbGRfY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHQuY2xvbmUoKTtcbiAgICB0aGlzLmlzX3Rlc3RfY29udGV4dCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJUZXN0Q29udGV4dCgpIHtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLm9sZF9jb250ZXh0O1xuICAgIHRoaXMub2xkX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuaXNfdGVzdF9jb250ZXh0ID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzX3Rlc3RfY29udGV4dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgY29udGV4dDogSUNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4gIHByaXZhdGUgb2xkX2NvbnRleHQ6IElDb250ZXh0O1xufVxuXG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHMpOiBzIGlzIHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZyc7XG59XG4iXX0=
