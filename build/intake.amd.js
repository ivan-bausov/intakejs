define('context',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Context = (function () {
        function Context() {
            this.map = {};
        }
        /**
         * Saves instance with given id in context. If second argument is InstanceCreator, actual instance would be
         * instantiated on first resolve.
         *
         * @param runtime_id
         * @param instance
         * @param force
           */
        Context.prototype.register = function (runtime_id, instance, force) {
            if (force === void 0) { force = false; }
            if (isNumber(runtime_id)) {
                runtime_id = runtime_id.toString();
            }
            if (this.map[runtime_id] && !force) {
                throw new Error("Instance with id \"" + runtime_id + "\" is already registered");
            }
            this.map[runtime_id] = {
                instance: isCreator(instance) ? null : instance,
                creator: isCreator(instance) ? instance : null
            };
        };
        /**
         * Returns previously registered instance for given key. If instance was never created, throws error.
         * @param runtime_id
         */
        Context.prototype.resolve = function (runtime_id) {
            if (isNumber(runtime_id)) {
                runtime_id = runtime_id.toString();
            }
            var data = this.map[runtime_id];
            if (!data) {
                throw new Error("Instance with id " + runtime_id + " not found");
            }
            if (data.creator) {
                data.instance = data.creator();
                data.creator = null;
            }
            return data.instance;
        };
        /**
         * Removes all previously registered instances from context
         */
        Context.prototype.clear = function () {
            this.map = {};
        };
        /**
         * Copies all state of current context to newly created one
         * @returns {IContext}
           */
        Context.prototype.clone = function () {
            var ctx = new Context();
            for (var name_1 in this.map) {
                if (this.map.hasOwnProperty(name_1)) {
                    ctx.map[name_1] = this.map[name_1];
                }
            }
            return ctx;
        };
        return Context;
    }());
    exports["default"] = Context;
    function isCreator(obj) {
        return typeof obj === 'function';
    }
    function isNumber(s) {
        return typeof s === 'number';
    }
});

define('injector',["require", "exports", "./context"], function (require, exports, context_1) {
    "use strict";
    exports.__esModule = true;
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
});

define('intake',["require", "exports", "./injector"], function (require, exports, injector_1) {
    "use strict";
    exports.__esModule = true;
    var _injector = new injector_1["default"]();
    exports.Service = _injector.Service;
    exports.Injectable = _injector.Injectable;
    exports.Inject = _injector.Inject;
    exports.ConstructorInject = _injector.ConstructorInject;
    exports.injector = _injector;
    exports.context = _injector.getContext();
});

