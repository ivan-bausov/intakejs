
define('context',["require", "exports"], function (require, exports) {
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
    })();
    exports.__esModule = true;
    exports["default"] = Context;
    function isCreator(obj) {
        return typeof obj === 'function';
    }
});

define('injector',["require", "exports", "./context"], function (require, exports, context_1) {
    var Injector = (function () {
        function Injector() {
            var _this = this;
            this.context = new context_1["default"]();
            this.Service = (function (target) {
                _this.getContext().register(target.service_name, function () { return new target(); });
                return target;
            }).bind(this);
            this.Inject = (function (runtime_id) {
                return function (target, key) {
                    Object.defineProperty(target, key, {
                        get: function () {
                            return _this.getContext().resolve(runtime_id);
                        },
                        set: function () {
                            throw new Error("Cannot set injected field \"" + key + "\"");
                        }
                    });
                };
            }).bind(this);
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
});

define('intake',["require", "exports", "./injector"], function (require, exports, injector_1) {
    var _injector = new injector_1["default"]();
    exports.Service = _injector.Service;
    exports.Inject = _injector.Inject;
    exports.injector = _injector;
    exports.context = _injector.getContext();
});
