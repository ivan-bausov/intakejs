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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBYUE7SUFBQTtRQWdFVSxRQUFHLEdBRVAsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQWxFQzs7Ozs7OztTQU9LO0lBQ0wsMEJBQVEsR0FBUixVQUFZLFVBQW9CLEVBQUUsUUFBK0IsRUFBRSxLQUFxQjtRQUFyQixzQkFBQSxFQUFBLGFBQXFCO1FBQ3BGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBcUIsVUFBVSw2QkFBeUIsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVE7WUFDL0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSTtTQUMvQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILHlCQUFPLEdBQVAsVUFBVyxVQUFvQjtRQUM3QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBb0IsVUFBVSxlQUFZLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztTQUdLO0lBQ0wsdUJBQUssR0FBTDtRQUNFLElBQUksR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUtILGNBQUM7QUFBRCxDQW5FQSxBQW1FQyxJQUFBOztBQUVELG1CQUFtQixHQUFRO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxVQUFVLENBQUM7QUFDbkMsQ0FBQztBQU9ELGtCQUFrQixDQUFLO0lBQ25CLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUM7QUFDakMsQ0FBQyIsImZpbGUiOiJjb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJbnN0YW5jZUNyZWF0b3I8VD4ge1xuICAoKTogVDtcbn1cblxuZXhwb3J0IHR5cGUgUnVudGltZUlkID0gc3RyaW5nIHwgbnVtYmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb250ZXh0IHtcbiAgcmVnaXN0ZXI8VD4ocnVudGltZV9pZDpSdW50aW1lSWQsIGluc3RhbmNlOlQgfCBJbnN0YW5jZUNyZWF0b3I8VD4sIGZvcmNlPzpib29sZWFuKTp2b2lkO1xuICByZXNvbHZlPFQ+KHJ1bnRpbWVfaWQ6UnVudGltZUlkKTpUO1xuICBjbG9uZSgpOiBJQ29udGV4dDtcbiAgY2xlYXIoKTogdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dCBpbXBsZW1lbnRzIElDb250ZXh0IHtcbiAgLyoqXG4gICAqIFNhdmVzIGluc3RhbmNlIHdpdGggZ2l2ZW4gaWQgaW4gY29udGV4dC4gSWYgc2Vjb25kIGFyZ3VtZW50IGlzIEluc3RhbmNlQ3JlYXRvciwgYWN0dWFsIGluc3RhbmNlIHdvdWxkIGJlXG4gICAqIGluc3RhbnRpYXRlZCBvbiBmaXJzdCByZXNvbHZlLlxuICAgKlxuICAgKiBAcGFyYW0gcnVudGltZV9pZFxuICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICogQHBhcmFtIGZvcmNlXG4gICAgICovXG4gIHJlZ2lzdGVyPFQ+KHJ1bnRpbWVfaWQ6UnVudGltZUlkLCBpbnN0YW5jZTpUIHwgSW5zdGFuY2VDcmVhdG9yPFQ+LCBmb3JjZTpib29sZWFuID0gZmFsc2UpIHtcbiAgICAgIGlmIChpc051bWJlcihydW50aW1lX2lkKSkge1xuICAgICAgICBydW50aW1lX2lkID0gcnVudGltZV9pZC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hcFtydW50aW1lX2lkXSAmJiAhZm9yY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW5zdGFuY2Ugd2l0aCBpZCBcIiR7cnVudGltZV9pZH1cIiBpcyBhbHJlYWR5IHJlZ2lzdGVyZWRgKTtcbiAgICB9XG4gICAgdGhpcy5tYXBbcnVudGltZV9pZF0gPSB7XG4gICAgICBpbnN0YW5jZTogaXNDcmVhdG9yKGluc3RhbmNlKSA/IG51bGwgOiBpbnN0YW5jZSxcbiAgICAgIGNyZWF0b3I6IGlzQ3JlYXRvcihpbnN0YW5jZSkgPyBpbnN0YW5jZSA6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcHJldmlvdXNseSByZWdpc3RlcmVkIGluc3RhbmNlIGZvciBnaXZlbiBrZXkuIElmIGluc3RhbmNlIHdhcyBuZXZlciBjcmVhdGVkLCB0aHJvd3MgZXJyb3IuXG4gICAqIEBwYXJhbSBydW50aW1lX2lkXG4gICAqL1xuICByZXNvbHZlPFQ+KHJ1bnRpbWVfaWQ6UnVudGltZUlkKTpUIHtcbiAgICBpZiAoaXNOdW1iZXIocnVudGltZV9pZCkpIHtcbiAgICAgICAgcnVudGltZV9pZCA9IHJ1bnRpbWVfaWQudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IHRoaXMubWFwW3J1bnRpbWVfaWRdO1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnN0YW5jZSB3aXRoIGlkICR7cnVudGltZV9pZH0gbm90IGZvdW5kYCk7XG4gICAgfVxuICAgIGlmIChkYXRhLmNyZWF0b3IpIHtcbiAgICAgIGRhdGEuaW5zdGFuY2UgPSBkYXRhLmNyZWF0b3IoKTtcbiAgICAgIGRhdGEuY3JlYXRvciA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBkYXRhLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBpbnN0YW5jZXMgZnJvbSBjb250ZXh0XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICB0aGlzLm1hcCA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvcGllcyBhbGwgc3RhdGUgb2YgY3VycmVudCBjb250ZXh0IHRvIG5ld2x5IGNyZWF0ZWQgb25lXG4gICAqIEByZXR1cm5zIHtJQ29udGV4dH1cbiAgICAgKi9cbiAgY2xvbmUoKTogSUNvbnRleHQge1xuICAgIHZhciBjdHggPSBuZXcgQ29udGV4dCgpO1xuICAgIGZvciAobGV0IG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjdHgubWFwW25hbWVdID0gdGhpcy5tYXBbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdHg7XG4gIH1cblxuICBwcml2YXRlIG1hcCA6IHtcbiAgICBba2V5OiBzdHJpbmddOiBSdW50aW1lRGF0YTxhbnk+O1xuICB9ID0ge307XG59XG5cbmZ1bmN0aW9uIGlzQ3JlYXRvcihvYmo6IGFueSkgOiBvYmogaXMgSW5zdGFuY2VDcmVhdG9yPGFueT4ge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuaW50ZXJmYWNlIFJ1bnRpbWVEYXRhPFQ+IHtcbiAgaW5zdGFuY2U6IFQ7XG4gIGNyZWF0b3I6IEluc3RhbmNlQ3JlYXRvcjxUPjtcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoczphbnkpOnMgaXMgc3RyaW5nIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdudW1iZXInO1xufVxuIl19
