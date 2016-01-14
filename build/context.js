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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRleHQudHMiXSwibmFtZXMiOlsiQ29udGV4dCIsIkNvbnRleHQuY29uc3RydWN0b3IiLCJDb250ZXh0LnJlZ2lzdGVyIiwiQ29udGV4dC5yZXNvbHZlIiwiQ29udGV4dC5jbGVhciIsImlzQ3JlYXRvciJdLCJtYXBwaW5ncyI6IkFBSUE7SUFBQUE7UUF1Q1VDLFFBQUdBLEdBRVBBLEVBQUVBLENBQUNBO0lBQ1RBLENBQUNBO0lBekNDRDs7Ozs7OztTQU9LQTtJQUNMQSwwQkFBUUEsR0FBUkEsVUFBWUEsVUFBa0JBLEVBQUVBLFFBQWdDQSxFQUFFQSxLQUFzQkE7UUFBdEJFLHFCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUN0RkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0E7WUFDckJBLFFBQVFBLEVBQUVBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLFFBQVFBO1lBQy9DQSxPQUFPQSxFQUFFQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxRQUFRQSxHQUFHQSxJQUFJQTtTQUMvQ0EsQ0FBQ0E7SUFDSkEsQ0FBQ0E7SUFFREY7OztPQUdHQTtJQUNIQSx5QkFBT0EsR0FBUEEsVUFBV0EsVUFBa0JBO1FBQzNCRyxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUNoQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0JBQW9CQSxVQUFVQSxlQUFZQSxDQUFDQSxDQUFDQTtRQUM5REEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBQy9CQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7UUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRURIOztPQUVHQTtJQUNIQSx1QkFBS0EsR0FBTEE7UUFDRUksSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDaEJBLENBQUNBO0lBS0hKLGNBQUNBO0FBQURBLENBMUNBLEFBMENDQSxJQUFBO0FBMUNEO3lCQTBDQyxDQUFBO0FBRUQsbUJBQW1CLEdBQVE7SUFDekJLLE1BQU1BLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLFVBQVVBLENBQUNBO0FBQ25DQSxDQUFDQSIsImZpbGUiOiJjb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJbnN0YW5jZUNyZWF0b3I8VD4ge1xuICAoKTogVDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dCB7XG4gIC8qKlxuICAgKiBTYXZlcyBpbnN0YW5jZSB3aXRoIGdpdmVuIGlkIGluIGNvbnRleHQuIElmIHNlY29uZCBhcmd1bWVudCBpcyBJbnN0YW5jZUNyZWF0b3IsIGFjdHVhbCBpbnN0YW5jZSB3b3VsZCBiZVxuICAgKiBpbnN0YW50aWF0ZWQgb24gZmlyc3QgcmVzb2x2ZS5cbiAgICpcbiAgICogQHBhcmFtIHJ1bnRpbWVfaWRcbiAgICogQHBhcmFtIGluc3RhbmNlXG4gICAqIEBwYXJhbSBmb3JjZVxuICAgICAqL1xuICByZWdpc3RlcjxUPihydW50aW1lX2lkOiBzdHJpbmcsIGluc3RhbmNlOiBUIHwgSW5zdGFuY2VDcmVhdG9yPFQ+LCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5tYXBbcnVudGltZV9pZF0gPSB7XG4gICAgICBpbnN0YW5jZTogaXNDcmVhdG9yKGluc3RhbmNlKSA/IG51bGwgOiBpbnN0YW5jZSxcbiAgICAgIGNyZWF0b3I6IGlzQ3JlYXRvcihpbnN0YW5jZSkgPyBpbnN0YW5jZSA6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcHJldmlvdXNseSByZWdpc3RlcmVkIGluc3RhbmNlIGZvciBnaXZlbiBrZXkuIElmIGluc3RhbmNlIHdhcyBuZXZlciBjcmVhdGVkLCB0aHJvd3MgZXJyb3IuXG4gICAqIEBwYXJhbSBydW50aW1lX2lkXG4gICAqL1xuICByZXNvbHZlPFQ+KHJ1bnRpbWVfaWQ6IHN0cmluZyk6IFQge1xuICAgIHZhciBkYXRhID0gdGhpcy5tYXBbcnVudGltZV9pZF07XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEluc3RhbmNlIHdpdGggaWQgJHtydW50aW1lX2lkfSBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuY3JlYXRvcikge1xuICAgICAgZGF0YS5pbnN0YW5jZSA9IGRhdGEuY3JlYXRvcigpO1xuICAgICAgZGF0YS5jcmVhdG9yID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgcHJldmlvdXNseSByZWdpc3RlcmVkIGluc3RhbmNlcyBmcm9tIGNvbnRleHRcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMubWFwID0ge307XG4gIH1cblxuICBwcml2YXRlIG1hcCA6IHtcbiAgICBba2V5OiBzdHJpbmddOiBSdW50aW1lRGF0YTxhbnk+O1xuICB9ID0ge307XG59XG5cbmZ1bmN0aW9uIGlzQ3JlYXRvcihvYmo6IGFueSkgOiBvYmogaXMgSW5zdGFuY2VDcmVhdG9yPGFueT4ge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuaW50ZXJmYWNlIFJ1bnRpbWVEYXRhPFQ+IHtcbiAgaW5zdGFuY2U6IFQ7XG4gIGNyZWF0b3I6IEluc3RhbmNlQ3JlYXRvcjxUPjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
