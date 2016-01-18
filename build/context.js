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
    return Context;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Context;
function isCreator(obj) {
    return typeof obj === 'function';
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRleHQudHMiXSwibmFtZXMiOlsiQ29udGV4dCIsIkNvbnRleHQuY29uc3RydWN0b3IiLCJDb250ZXh0LnJlZ2lzdGVyIiwiQ29udGV4dC5yZXNvbHZlIiwiQ29udGV4dC5jbGVhciIsImlzQ3JlYXRvciJdLCJtYXBwaW5ncyI6IkFBSUE7SUFBQUE7UUEwQ1VDLFFBQUdBLEdBRVBBLEVBQUVBLENBQUNBO0lBQ1RBLENBQUNBO0lBNUNDRDs7Ozs7OztTQU9LQTtJQUNMQSwwQkFBUUEsR0FBUkEsVUFBWUEsVUFBa0JBLEVBQUVBLFFBQWdDQSxFQUFFQSxLQUFzQkE7UUFBdEJFLHFCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUN0RkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLHdCQUFxQkEsVUFBVUEsNkJBQXlCQSxDQUFDQSxDQUFDQTtRQUM1RUEsQ0FBQ0E7UUFDREEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0E7WUFDckJBLFFBQVFBLEVBQUVBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLFFBQVFBO1lBQy9DQSxPQUFPQSxFQUFFQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxRQUFRQSxHQUFHQSxJQUFJQTtTQUMvQ0EsQ0FBQ0E7SUFDSkEsQ0FBQ0E7SUFFREY7OztPQUdHQTtJQUNIQSx5QkFBT0EsR0FBUEEsVUFBV0EsVUFBa0JBO1FBQzNCRyxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUNoQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0JBQW9CQSxVQUFVQSxlQUFZQSxDQUFDQSxDQUFDQTtRQUM5REEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBQy9CQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7UUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRURIOztPQUVHQTtJQUNIQSx1QkFBS0EsR0FBTEE7UUFDRUksSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDaEJBLENBQUNBO0lBS0hKLGNBQUNBO0FBQURBLENBN0NBLEFBNkNDQSxJQUFBO0FBN0NEO3lCQTZDQyxDQUFBO0FBRUQsbUJBQW1CLEdBQVE7SUFDekJLLE1BQU1BLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLFVBQVVBLENBQUNBO0FBQ25DQSxDQUFDQSIsImZpbGUiOiJjb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJbnN0YW5jZUNyZWF0b3I8VD4ge1xuICAoKTogVDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dCB7XG4gIC8qKlxuICAgKiBTYXZlcyBpbnN0YW5jZSB3aXRoIGdpdmVuIGlkIGluIGNvbnRleHQuIElmIHNlY29uZCBhcmd1bWVudCBpcyBJbnN0YW5jZUNyZWF0b3IsIGFjdHVhbCBpbnN0YW5jZSB3b3VsZCBiZVxuICAgKiBpbnN0YW50aWF0ZWQgb24gZmlyc3QgcmVzb2x2ZS5cbiAgICpcbiAgICogQHBhcmFtIHJ1bnRpbWVfaWRcbiAgICogQHBhcmFtIGluc3RhbmNlXG4gICAqIEBwYXJhbSBmb3JjZVxuICAgICAqL1xuICByZWdpc3RlcjxUPihydW50aW1lX2lkOiBzdHJpbmcsIGluc3RhbmNlOiBUIHwgSW5zdGFuY2VDcmVhdG9yPFQ+LCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMubWFwW3J1bnRpbWVfaWRdICYmICFmb3JjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnN0YW5jZSB3aXRoIGlkIFwiJHtydW50aW1lX2lkfVwiIGlzIGFscmVhZHkgcmVnaXN0ZXJlZGApO1xuICAgIH1cbiAgICB0aGlzLm1hcFtydW50aW1lX2lkXSA9IHtcbiAgICAgIGluc3RhbmNlOiBpc0NyZWF0b3IoaW5zdGFuY2UpID8gbnVsbCA6IGluc3RhbmNlLFxuICAgICAgY3JlYXRvcjogaXNDcmVhdG9yKGluc3RhbmNlKSA/IGluc3RhbmNlIDogbnVsbFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgaW5zdGFuY2UgZm9yIGdpdmVuIGtleS4gSWYgaW5zdGFuY2Ugd2FzIG5ldmVyIGNyZWF0ZWQsIHRocm93cyBlcnJvci5cbiAgICogQHBhcmFtIHJ1bnRpbWVfaWRcbiAgICovXG4gIHJlc29sdmU8VD4ocnVudGltZV9pZDogc3RyaW5nKTogVCB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLm1hcFtydW50aW1lX2lkXTtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW5zdGFuY2Ugd2l0aCBpZCAke3J1bnRpbWVfaWR9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICBpZiAoZGF0YS5jcmVhdG9yKSB7XG4gICAgICBkYXRhLmluc3RhbmNlID0gZGF0YS5jcmVhdG9yKCk7XG4gICAgICBkYXRhLmNyZWF0b3IgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YS5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgaW5zdGFuY2VzIGZyb20gY29udGV4dFxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5tYXAgPSB7fTtcbiAgfVxuXG4gIHByaXZhdGUgbWFwIDoge1xuICAgIFtrZXk6IHN0cmluZ106IFJ1bnRpbWVEYXRhPGFueT47XG4gIH0gPSB7fTtcbn1cblxuZnVuY3Rpb24gaXNDcmVhdG9yKG9iajogYW55KSA6IG9iaiBpcyBJbnN0YW5jZUNyZWF0b3I8YW55PiB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5pbnRlcmZhY2UgUnVudGltZURhdGE8VD4ge1xuICBpbnN0YW5jZTogVDtcbiAgY3JlYXRvcjogSW5zdGFuY2VDcmVhdG9yPFQ+O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
