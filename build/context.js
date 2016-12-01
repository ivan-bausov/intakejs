"use strict";
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
}());
exports.__esModule = true;
exports["default"] = Context;
function isCreator(obj) {
    return typeof obj === 'function';
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFXQTtJQUFBO1FBd0RVLFFBQUcsR0FFUCxFQUFFLENBQUM7SUFDVCxDQUFDO0lBMURDOzs7Ozs7O1NBT0s7SUFDTCwwQkFBUSxHQUFSLFVBQVksVUFBa0IsRUFBRSxRQUFnQyxFQUFFLEtBQXNCO1FBQXRCLHFCQUFzQixHQUF0QixhQUFzQjtRQUN0RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUFxQixVQUFVLDZCQUF5QixDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFDckIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEdBQUcsUUFBUTtZQUMvQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsR0FBRyxJQUFJO1NBQy9DLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gseUJBQU8sR0FBUCxVQUFXLFVBQWtCO1FBQzNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBb0IsVUFBVSxlQUFZLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztTQUdLO0lBQ0wsdUJBQUssR0FBTDtRQUNFLElBQUksR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUtILGNBQUM7QUFBRCxDQTNEQSxBQTJEQyxJQUFBO0FBM0REOzRCQTJEQyxDQUFBO0FBRUQsbUJBQW1CLEdBQVE7SUFDekIsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLFVBQVUsQ0FBQztBQUNuQyxDQUFDIiwiZmlsZSI6ImNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlQ3JlYXRvcjxUPiB7XG4gICgpOiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb250ZXh0IHtcbiAgcmVnaXN0ZXI8VD4ocnVudGltZV9pZDogc3RyaW5nLCBpbnN0YW5jZTogVCB8IEluc3RhbmNlQ3JlYXRvcjxUPiwgZm9yY2U/OiBib29sZWFuKTtcbiAgcmVzb2x2ZTxUPihydW50aW1lX2lkOiBzdHJpbmcpOiBUO1xuICBjbG9uZSgpOiBJQ29udGV4dDtcbiAgY2xlYXIoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dCBpbXBsZW1lbnRzIElDb250ZXh0IHtcbiAgLyoqXG4gICAqIFNhdmVzIGluc3RhbmNlIHdpdGggZ2l2ZW4gaWQgaW4gY29udGV4dC4gSWYgc2Vjb25kIGFyZ3VtZW50IGlzIEluc3RhbmNlQ3JlYXRvciwgYWN0dWFsIGluc3RhbmNlIHdvdWxkIGJlXG4gICAqIGluc3RhbnRpYXRlZCBvbiBmaXJzdCByZXNvbHZlLlxuICAgKlxuICAgKiBAcGFyYW0gcnVudGltZV9pZFxuICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICogQHBhcmFtIGZvcmNlXG4gICAgICovXG4gIHJlZ2lzdGVyPFQ+KHJ1bnRpbWVfaWQ6IHN0cmluZywgaW5zdGFuY2U6IFQgfCBJbnN0YW5jZUNyZWF0b3I8VD4sIGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5tYXBbcnVudGltZV9pZF0gJiYgIWZvcmNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEluc3RhbmNlIHdpdGggaWQgXCIke3J1bnRpbWVfaWR9XCIgaXMgYWxyZWFkeSByZWdpc3RlcmVkYCk7XG4gICAgfVxuICAgIHRoaXMubWFwW3J1bnRpbWVfaWRdID0ge1xuICAgICAgaW5zdGFuY2U6IGlzQ3JlYXRvcihpbnN0YW5jZSkgPyBudWxsIDogaW5zdGFuY2UsXG4gICAgICBjcmVhdG9yOiBpc0NyZWF0b3IoaW5zdGFuY2UpID8gaW5zdGFuY2UgOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBpbnN0YW5jZSBmb3IgZ2l2ZW4ga2V5LiBJZiBpbnN0YW5jZSB3YXMgbmV2ZXIgY3JlYXRlZCwgdGhyb3dzIGVycm9yLlxuICAgKiBAcGFyYW0gcnVudGltZV9pZFxuICAgKi9cbiAgcmVzb2x2ZTxUPihydW50aW1lX2lkOiBzdHJpbmcpOiBUIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMubWFwW3J1bnRpbWVfaWRdO1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnN0YW5jZSB3aXRoIGlkICR7cnVudGltZV9pZH0gbm90IGZvdW5kYCk7XG4gICAgfVxuICAgIGlmIChkYXRhLmNyZWF0b3IpIHtcbiAgICAgIGRhdGEuaW5zdGFuY2UgPSBkYXRhLmNyZWF0b3IoKTtcbiAgICAgIGRhdGEuY3JlYXRvciA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBkYXRhLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBpbnN0YW5jZXMgZnJvbSBjb250ZXh0XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICB0aGlzLm1hcCA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvcGllcyBhbGwgc3RhdGUgb2YgY3VycmVudCBjb250ZXh0IHRvIG5ld2x5IGNyZWF0ZWQgb25lXG4gICAqIEByZXR1cm5zIHtJQ29udGV4dH1cbiAgICAgKi9cbiAgY2xvbmUoKTogSUNvbnRleHQge1xuICAgIHZhciBjdHggPSBuZXcgQ29udGV4dCgpO1xuICAgIGZvciAobGV0IG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjdHgubWFwW25hbWVdID0gdGhpcy5tYXBbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdHg7XG4gIH1cblxuICBwcml2YXRlIG1hcCA6IHtcbiAgICBba2V5OiBzdHJpbmddOiBSdW50aW1lRGF0YTxhbnk+O1xuICB9ID0ge307XG59XG5cbmZ1bmN0aW9uIGlzQ3JlYXRvcihvYmo6IGFueSkgOiBvYmogaXMgSW5zdGFuY2VDcmVhdG9yPGFueT4ge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuaW50ZXJmYWNlIFJ1bnRpbWVEYXRhPFQ+IHtcbiAgaW5zdGFuY2U6IFQ7XG4gIGNyZWF0b3I6IEluc3RhbmNlQ3JlYXRvcjxUPjtcbn1cbiJdfQ==
