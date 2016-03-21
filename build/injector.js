var context_1 = require("./context");
var Injector = (function () {
    function Injector() {
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
                    for (var _a = 0; _a < runtime_ids.length; _a++) {
                        var id = runtime_ids[_a];
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
    Injector.prototype.createTestContext = function () {
        this.old_context = this.context;
        this.context = this.context.clone();
    };
    Injector.prototype.clearTestContext = function () {
        this.context = this.old_context;
    };
    return Injector;
})();
exports.__esModule = true;
exports["default"] = Injector;
function isString(s) {
    return typeof s === 'string';
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluamVjdG9yLnRzIl0sIm5hbWVzIjpbIkluamVjdG9yIiwiSW5qZWN0b3IuY29uc3RydWN0b3IiLCJJbmplY3Rvci5jb25zdHJ1Y3Rvci5jb25zdHJ1Y3QiLCJJbmplY3Rvci5nZXRDb250ZXh0IiwiSW5qZWN0b3IuY3JlYXRlVGVzdENvbnRleHQiLCJJbmplY3Rvci5jbGVhclRlc3RDb250ZXh0IiwiaXNTdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBLHdCQUFvQixXQUFXLENBQUMsQ0FBQTtBQVdoQztJQUNFQTtRQTRHUUMsWUFBT0EsR0FBYUEsSUFBSUEsb0JBQU9BLEVBQUVBLENBQUNBO1FBM0d4Q0EsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFaEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLFVBQUNBLE1BQTJCQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBSUEsT0FBQUEsSUFBSUEsTUFBTUEsRUFBRUEsRUFBWkEsQ0FBWUEsQ0FBQ0EsQ0FBQ0E7WUFFbEVBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO1FBQ2hCQSxDQUFDQSxDQUFDQTtRQUVGQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxVQUFDQSxVQUFrQkE7WUFDbkNBLE1BQU1BLENBQUNBLFVBQUNBLE1BQW9CQTtnQkFDMUJBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLEVBQUVBLGNBQUlBLE9BQUFBLElBQUlBLE1BQU1BLEVBQUVBLEVBQVpBLENBQVlBLENBQUNBLENBQUNBO1lBQzNEQSxDQUFDQSxDQUFBQTtRQUNIQSxDQUFDQSxDQUFDQTtRQUVGQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxVQUFDQSxVQUFrQkE7WUFDL0JBLE1BQU1BLENBQUNBLFVBQUNBLE1BQVdBLEVBQUVBLEdBQVdBO2dCQUM5QkEsTUFBTUEsQ0FBQ0EsY0FBY0Es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LEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO0lBQ2xDQSxDQUFDQTtJQUtITCxlQUFDQTtBQUFEQSxDQWhIQSxBQWdIQ0EsSUFBQTtBQWhIRDs2QkFnSEMsQ0FBQTtBQUdELGtCQUFrQixDQUFDO0lBQ2pCTSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxRQUFRQSxDQUFDQTtBQUMvQkEsQ0FBQ0EiLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9jb250ZXh0XCI7XG5pbXBvcnQge0lDb250ZXh0fSBmcm9tIFwiLi9jb250ZXh0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlcnZpY2VDb25zdHJ1Y3RvciBleHRlbmRzIElDb25zdHJ1Y3RvcntcbiAgc2VydmljZV9uYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnN0cnVjdG9yIHtcbiAgbmV3KCk6IGFueTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLlNlcnZpY2UgPSAodGFyZ2V0OiBJU2VydmljZUNvbnN0cnVjdG9yKSA9PiB7XG4gICAgICBzZWxmLmdldENvbnRleHQoKS5yZWdpc3Rlcih0YXJnZXQuc2VydmljZV9uYW1lLCAoKT0+bmV3IHRhcmdldCgpKTtcblxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xuXG4gICAgdGhpcy5JbmplY3RhYmxlID0gKHJ1bnRpbWVfaWQ6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuICh0YXJnZXQ6IElDb25zdHJ1Y3RvcikgPT4ge1xuICAgICAgICBzZWxmLmdldENvbnRleHQoKS5yZWdpc3RlcihydW50aW1lX2lkLCAoKT0+bmV3IHRhcmdldCgpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5JbmplY3QgPSAocnVudGltZV9pZDogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gKHRhcmdldDogYW55LCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmdldENvbnRleHQoKS5yZXNvbHZlKHJ1bnRpbWVfaWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiAoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBzZXQgaW5qZWN0ZWQgZmllbGQgXCIke2tleX1cImApXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5Db25zdHJ1Y3RvckluamVjdCA9ICguLi5ydW50aW1lX2lkczogc3RyaW5nW10pID0+IHtcbiAgICAgIHJldHVybiAodGFyZ2V0OiBGdW5jdGlvbik9PntcbiAgICAgICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgY29uc3RydWN0b3JcbiAgICAgICAgdmFyIG9yaWdpbmFsID0gdGFyZ2V0O1xuXG4gICAgICAgIC8vIGEgdXRpbGl0eSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBpbnN0YW5jZXMgb2YgYSBjbGFzc1xuICAgICAgICBmdW5jdGlvbiBjb25zdHJ1Y3QoY29uc3RydWN0b3IsIGFyZ3MpIHtcbiAgICAgICAgICB2YXIgYyA6IGFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGMucHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgICAgIHJldHVybiBuZXcgYygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIG5ldyBjb25zdHJ1Y3RvciBiZWhhdmlvdXJcbiAgICAgICAgdmFyIGYgOiBhbnkgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXG4gICAgICAgICAgbGV0IGluamVjdGVkX2RlcHMgPSBbXTtcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgZm9yIChsZXQgaWQgb2YgcnVudGltZV9pZHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1tpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgaW5qZWN0ZWRfZGVwcy5wdXNoKHNlbGYuZ2V0Q29udGV4dCgpLnJlc29sdmUoaWQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGluamVjdGVkX2RlcHMucHVzaChhcmdzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdChvcmlnaW5hbCwgaW5qZWN0ZWRfZGVwcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY29weSBwcm90b3R5cGUgc28gaW50YW5jZW9mIG9wZXJhdG9yIHN0aWxsIHdvcmtzXG4gICAgICAgIGYucHJvdG90eXBlID0gb3JpZ2luYWwucHJvdG90eXBlO1xuXG4gICAgICAgIC8vIHJldHVybiBuZXcgY29uc3RydWN0b3IgKHdpbGwgb3ZlcnJpZGUgb3JpZ2luYWwpXG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfVxuICAgIH1cblxuICB9XG4gIC8qKlxuICAgKiByZWdpc3RlcnMgYSBzZXJ2aWNlXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gIHB1YmxpYyBTZXJ2aWNlOiAodGFyZ2V0OiBJU2VydmljZUNvbnN0cnVjdG9yKSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIHJlZ2lzdGVycyBpbnN0YW5jZSBvZiBhIGNsYXNzIHdpdGggZ2l2ZW4gcnVudGltZSBpZFxuICAgKiBAcGFyYW0gcnVudGltZV9pZFxuICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24oYW55KX1cbiAgICovXG4gIHB1YmxpYyBJbmplY3RhYmxlOiAocnVudGltZV9pZDogc3RyaW5nKSA9PiAodGFyZ2V0OiBJQ29uc3RydWN0b3IpPT5hbnk7XG5cbiAgLyoqXG4gICAqIGluamVjdHMgZGVwZW5kZW5jeSB3aXRoIGdpdmVuIHJ1bnRpbWUgaWQgdG8gdGhlIGRlY29yYXRlZCBmaWVsZCBvbiBmaXJzdCBnZXRcbiAgICpcbiAgICogQHBhcmFtIHJ1bnRpbWVfaWQgLSBydW50aW1lIGlkIG9yIGFycmF5IG9mIHJ1bnRpbWUgaWRzXG4gICAqIEByZXR1cm5zIHtmdW5jdGlvbihhbnksIHN0cmluZyl9XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICBwdWJsaWMgSW5qZWN0OiAocnVudGltZV9pZDogc3RyaW5nKT0+KCh0YXJnZXQsIGtleSk9PnZvaWQpO1xuXG4gIC8qKlxuICAgKiBpbmplY3RzIGRlcGVuZGVuY3kgd2l0aCBnaXZlbiBydW50aW1lIGlkcyB0byB0aGUgZGVjb3JhdGVkIGNsYXNzJ2VzIGNvbnN0cnVjdG9yXG4gICAqL1xuICBwdWJsaWMgQ29uc3RydWN0b3JJbmplY3Q6ICguLi5ydW50aW1lX2lkOiBzdHJpbmdbXSk9Pih0YXJnZXQpPT5hbnk7XG5cbiAgcHVibGljIGdldENvbnRleHQoKTogSUNvbnRleHQge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlVGVzdENvbnRleHQoKSB7XG4gICAgdGhpcy5vbGRfY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHQuY2xvbmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclRlc3RDb250ZXh0KCkge1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMub2xkX2NvbnRleHQ7XG4gIH1cblxuICBwcml2YXRlIGNvbnRleHQ6IElDb250ZXh0ID0gbmV3IENvbnRleHQoKTtcblxuICBwcml2YXRlIG9sZF9jb250ZXh0OiBJQ29udGV4dDtcbn1cblxuXG5mdW5jdGlvbiBpc1N0cmluZyhzKTogcyBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
