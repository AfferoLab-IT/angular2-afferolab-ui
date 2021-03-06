"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ToastMessageComponent = (function () {
    function ToastMessageComponent() {
    }
    ToastMessageComponent.prototype.ngOnChanges = function () {
        if (this.message) {
            Materialize.toast(this.message, 10000);
        }
    };
    __decorate([
        core_1.Input('message')
    ], ToastMessageComponent.prototype, "message");
    ToastMessageComponent = __decorate([
        core_1.Component({
            selector: 'toast-message',
            template: ''
        })
    ], ToastMessageComponent);
    return ToastMessageComponent;
}());
exports.ToastMessageComponent = ToastMessageComponent;
//# sourceMappingURL=toast-message.component.js.map