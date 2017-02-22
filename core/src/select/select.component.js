"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var underscore_1 = require('underscore');
var forms_1 = require('@angular/forms');
var SelectComponent = (function () {
    function SelectComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.id = underscore_1._.uniqueId();
        this.disabledSelect = false;
        this.required = false;
        this.onChange = new core_1.EventEmitter();
        this.modelValueChange = new core_1.EventEmitter();
    }
    SelectComponent.prototype.change = function (newValue) {
        this.modelValue = newValue;
        this.modelValueChange.emit(newValue);
        this.onChange.emit(newValue);
    };
    SelectComponent.prototype.ngAfterContentInit = function () {
        var control = new forms_1.FormControl();
        if (!this.formGroup) {
            this.formGroup = this.formBuilder.group({});
            this.formGroup.addControl('', control);
            this.checkSelectIsDisabled('');
        }
        else if (this.name) {
            this.formGroup.addControl(this.name, control);
            this.setValidators();
            this.checkSelectIsDisabled(this.name);
        }
    };
    SelectComponent.prototype.getName = function () {
        return this.name || '';
    };
    SelectComponent.prototype.checkSelectIsDisabled = function (controlName) {
        if (this.disabledSelect) {
            this.formGroup.controls[controlName].disable();
        }
        else {
            this.formGroup.controls[controlName].enable();
        }
    };
    SelectComponent.prototype.setValidators = function () {
        if (this.required) {
            this.formGroup.controls[this.name].setValidators(forms_1.Validators.required);
        }
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.options && changes.options.currentValue) {
            setTimeout(function () {
                if (_this.modelValue) {
                    $('#' + _this.id).val(_this.modelValue).attr('selected', 'selected');
                }
                else {
                    $('#' + _this.id + ' option:first').attr('selected', 'selected');
                    _this.change($('#' + _this.id + ' option:first').val());
                }
            }, 0);
        }
    };
    __decorate([
        core_1.Input('modelValue')
    ], SelectComponent.prototype, "modelValue");
    __decorate([
        core_1.Input('options')
    ], SelectComponent.prototype, "options");
    __decorate([
        core_1.Input('optionValue')
    ], SelectComponent.prototype, "optionValue");
    __decorate([
        core_1.Input('key')
    ], SelectComponent.prototype, "key");
    __decorate([
        core_1.Input('disabledSelect')
    ], SelectComponent.prototype, "disabledSelect");
    __decorate([
        core_1.Input('showDefaultOption')
    ], SelectComponent.prototype, "showDefaultOption");
    __decorate([
        core_1.Input('formGroup')
    ], SelectComponent.prototype, "formGroup");
    __decorate([
        core_1.Input('name')
    ], SelectComponent.prototype, "name");
    __decorate([
        core_1.Input('required')
    ], SelectComponent.prototype, "required");
    __decorate([
        core_1.Output('onChange')
    ], SelectComponent.prototype, "onChange");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "modelValueChange");
    SelectComponent = __decorate([
        core_1.Component({
            selector: 'select-box',
            template: "<span [formGroup]=\"formGroup\">\n                <select id=\"{{ id }}\" [formControlName]=\"getName()\" name=\"{{name}}\" class=\"browser-default\" [(ngModel)]=\"modelValue\" (ngModelChange)=\"change($event)\">\n                    <option [value]=\"''\">Selecione</option>\n                    <option *ngFor=\"let option of options\" [value]=\"option[key]\">{{ option[optionValue.toString()] }}</option>\n                </select>\n            </span>"
        })
    ], SelectComponent);
    return SelectComponent;
}());
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map