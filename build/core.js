/// <reference path="./all.d.ts" />
var MyLibrary = (function () {
    function MyLibrary(config) {
        if (config === void 0) { config = {
            name: 'Bob'
        }; }
        this.config = config;
        this.computedName = this.config.name + ' Moran';
    }
    Object.defineProperty(MyLibrary.prototype, "name", {
        get: function () {
            return this.computedName;
        },
        enumerable: true,
        configurable: true
    });
    return MyLibrary;
})();
exports.MyLibrary = MyLibrary;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOlsiTXlMaWJyYXJ5IiwiTXlMaWJyYXJ5LmNvbnN0cnVjdG9yIiwiTXlMaWJyYXJ5Lm5hbWUiXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQU1uQztJQUdFQSxtQkFDVUEsTUFFUEE7UUFGREMsc0JBRUNBLEdBRkRBO1lBQ0VBLElBQUlBLEVBQUVBLEtBQUtBO1NBQ1pBO1FBRk9BLFdBQU1BLEdBQU5BLE1BQU1BLENBRWJBO1FBRURBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBO0lBQ2xEQSxDQUFDQTtJQUVERCxzQkFBSUEsMkJBQUlBO2FBQVJBO1lBQ0VFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BQUFGO0lBQ0hBLGdCQUFDQTtBQUFEQSxDQWRBLEFBY0NBLElBQUE7QUFkWSxpQkFBUyxZQWNyQixDQUFBIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9hbGwuZC50c1wiIC8+XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU15TGlicmFyeUNvbmZpZ3VyYXRpb24ge1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBNeUxpYnJhcnkge1xuICBwcml2YXRlIGNvbXB1dGVkTmFtZTogc3RyaW5nO1xuICBcbiAgY29uc3RydWN0b3IgKFxuICAgIHByaXZhdGUgY29uZmlnOiBJTXlMaWJyYXJ5Q29uZmlndXJhdGlvbiA9IHtcbiAgICAgIG5hbWU6ICdCb2InXG4gICAgfVxuICApIHtcbiAgICB0aGlzLmNvbXB1dGVkTmFtZSA9IHRoaXMuY29uZmlnLm5hbWUgKyAnIE1vcmFuJzsgICAgICBcbiAgfVxuICBcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb21wdXRlZE5hbWU7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
