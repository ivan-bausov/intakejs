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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFPSCxlQUFDO0FBQUQsQ0FqSUEsQUFpSUMsSUFBQTtBQWpJRDs2QkFpSUMsQ0FBQTtBQUdELGtCQUFrQixDQUFNO0lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUM7QUFDL0IsQ0FBQyIsImZpbGUiOiJpbmplY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb250ZXh0IGZyb20gXCIuL2NvbnRleHRcIjtcbmltcG9ydCB7SUNvbnRleHR9IGZyb20gXCIuL2NvbnRleHRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2VydmljZUNvbnN0cnVjdG9yIGV4dGVuZHMgSUNvbnN0cnVjdG9ye1xuICBzZXJ2aWNlX25hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29uc3RydWN0b3Ige1xuICBuZXcoKTogYW55O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuU2VydmljZSA9ICh0YXJnZXQ6IElTZXJ2aWNlQ29uc3RydWN0b3IpID0+IHtcbiAgICAgIHNlbGYuZ2V0Q29udGV4dCgpLnJlZ2lzdGVyKHRhcmdldC5zZXJ2aWNlX25hbWUsICgpPT5uZXcgdGFyZ2V0KCkpO1xuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG5cbiAgICB0aGlzLkluamVjdGFibGUgPSAocnVudGltZV9pZDogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gKHRhcmdldDogSUNvbnN0cnVjdG9yKSA9PiB7XG4gICAgICAgIHNlbGYuZ2V0Q29udGV4dCgpLnJlZ2lzdGVyKHJ1bnRpbWVfaWQsICgpPT5uZXcgdGFyZ2V0KCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLkluamVjdCA9IChydW50aW1lX2lkOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiAodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xuICAgICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0Q29udGV4dCgpLnJlc29sdmUocnVudGltZV9pZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHNldCBpbmplY3RlZCBmaWVsZCBcIiR7a2V5fVwiYClcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLkNvbnN0cnVjdG9ySW5qZWN0ID0gKC4uLnJ1bnRpbWVfaWRzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgcmV0dXJuICh0YXJnZXQ6IEZ1bmN0aW9uKT0+e1xuICAgICAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBjb25zdHJ1Y3RvclxuICAgICAgICB2YXIgb3JpZ2luYWwgPSB0YXJnZXQ7XG5cbiAgICAgICAgLy8gYSB1dGlsaXR5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGluc3RhbmNlcyBvZiBhIGNsYXNzXG4gICAgICAgIGZ1bmN0aW9uIGNvbnN0cnVjdChjb25zdHJ1Y3RvcjogRnVuY3Rpb24sIGFyZ3M6IGFueSkge1xuICAgICAgICAgIHZhciBjIDogYW55ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgYy5wcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgICAgcmV0dXJuIG5ldyBjKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgbmV3IGNvbnN0cnVjdG9yIGJlaGF2aW91clxuICAgICAgICB2YXIgZiA6IGFueSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuXG4gICAgICAgICAgbGV0IGluamVjdGVkX2RlcHM6IGFueVtdID0gW107XG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGZvciAobGV0IGlkIG9mIHJ1bnRpbWVfaWRzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbaV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGluamVjdGVkX2RlcHMucHVzaChzZWxmLmdldENvbnRleHQoKS5yZXNvbHZlKGlkKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpbmplY3RlZF9kZXBzLnB1c2goYXJnc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Qob3JpZ2luYWwsIGluamVjdGVkX2RlcHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNvcHkgcHJvdG90eXBlIHNvIGludGFuY2VvZiBvcGVyYXRvciBzdGlsbCB3b3Jrc1xuICAgICAgICBmLnByb3RvdHlwZSA9IG9yaWdpbmFsLnByb3RvdHlwZTtcblxuICAgICAgICAvLyByZXR1cm4gbmV3IGNvbnN0cnVjdG9yICh3aWxsIG92ZXJyaWRlIG9yaWdpbmFsKVxuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuICAvKipcbiAgICogcmVnaXN0ZXJzIGEgc2VydmljZVxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICBwdWJsaWMgU2VydmljZTogKHRhcmdldDogSVNlcnZpY2VDb25zdHJ1Y3RvcikgPT4gYW55O1xuXG4gIC8qKlxuICAgKiByZWdpc3RlcnMgaW5zdGFuY2Ugb2YgYSBjbGFzcyB3aXRoIGdpdmVuIHJ1bnRpbWUgaWRcbiAgICogQHBhcmFtIHJ1bnRpbWVfaWRcbiAgICogQHJldHVybnMge2Z1bmN0aW9uKGFueSl9XG4gICAqL1xuICBwdWJsaWMgSW5qZWN0YWJsZTogKHJ1bnRpbWVfaWQ6IHN0cmluZykgPT4gKHRhcmdldDogSUNvbnN0cnVjdG9yKT0+YW55O1xuXG4gIC8qKlxuICAgKiBpbmplY3RzIGRlcGVuZGVuY3kgd2l0aCBnaXZlbiBydW50aW1lIGlkIHRvIHRoZSBkZWNvcmF0ZWQgZmllbGQgb24gZmlyc3QgZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBydW50aW1lX2lkIC0gcnVudGltZSBpZCBvciBhcnJheSBvZiBydW50aW1lIGlkc1xuICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24oYW55LCBzdHJpbmcpfVxuICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgcHVibGljIEluamVjdDogKHJ1bnRpbWVfaWQ6IHN0cmluZyk9PigodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKT0+dm9pZCk7XG5cbiAgLyoqXG4gICAqIGluamVjdHMgZGVwZW5kZW5jeSB3aXRoIGdpdmVuIHJ1bnRpbWUgaWRzIHRvIHRoZSBkZWNvcmF0ZWQgY2xhc3MnZXMgY29uc3RydWN0b3JcbiAgICovXG4gIHB1YmxpYyBDb25zdHJ1Y3RvckluamVjdDogKC4uLnJ1bnRpbWVfaWQ6IHN0cmluZ1tdKT0+KHRhcmdldDogRnVuY3Rpb24pPT5hbnk7XG5cbiAgcHVibGljIGdldENvbnRleHQoKTogSUNvbnRleHQge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICBwdWJsaWMgbW9jayhydW50aW1lX2lkOiBzdHJpbmcsIG1vY2s6IGFueSkge1xuICAgIHRoaXMuY3JlYXRlVGVzdENvbnRleHQoKTtcbiAgICB0aGlzLmdldENvbnRleHQoKS5yZWdpc3RlcihydW50aW1lX2lkLCBtb2NrLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhck1vY2tzKCkge1xuICAgIHRoaXMuY2xlYXJUZXN0Q29udGV4dCgpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZVRlc3RDb250ZXh0KCkge1xuICAgIGlmICh0aGlzLmlzX3Rlc3RfY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9sZF9jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY29udGV4dC5jbG9uZSgpO1xuICAgIHRoaXMuaXNfdGVzdF9jb250ZXh0ID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclRlc3RDb250ZXh0KCkge1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMub2xkX2NvbnRleHQ7XG4gICAgdGhpcy5vbGRfY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5pc190ZXN0X2NvbnRleHQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNfdGVzdF9jb250ZXh0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjb250ZXh0OiBJQ29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbiAgcHJpdmF0ZSBvbGRfY29udGV4dDogSUNvbnRleHQ7XG59XG5cblxuZnVuY3Rpb24gaXNTdHJpbmcoczogYW55KTogcyBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnO1xufVxuIl19
