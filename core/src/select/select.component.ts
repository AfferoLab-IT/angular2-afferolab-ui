import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewChecked } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'select-box',
  template: `<span [formGroup]="formGroup">
                <select id="{{ id }}" [formControlName]="getName()" name="{{name}}" class="browser-default" [(ngModel)]="modelValue" (ngModelChange)="change($event)">
                    <option *ngIf="!onlyActive" [value]="''">Selecione</option>
                    <option *ngFor="let option of options" [value]="option[key]">{{ option[optionValue.toString()] }}</option>
                </select>
            </span>`
})
export class SelectComponent implements OnChanges, OnInit, AfterViewChecked {

  public id: string = _.uniqueId();

  @Input('modelValue')
  modelValue: string;

  @Input('options')
  options: Array<any>;

  @Input('optionValue')
  optionValue: string;

  @Input('key')
  key: any;

  @Input('onlyActive')
  onlyActive: boolean;

  @Input('disabledSelect')
  disabledSelect: boolean;

  @Input('showDefaultOption')
  showDefaultOption: boolean;

  @Input('formGroup')
  formGroup: FormGroup;

  @Input('name')
  name: any;

  @Input('required')
  required: boolean = false;

  @Output('onChange')
  onChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  modelValueChange: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  change(newValue) {
    this.modelValue = newValue;
    this.modelValueChange.emit(newValue);
    this.onChange.emit(newValue);
  }

  ngAfterViewChecked(): void {
    if (this.formGroup.enabled) {
      if (isNullOrUndefined(this.name)) {
        this.checkSelectIsDisabled('');
      } else {
        this.checkSelectIsDisabled(this.name);
      }
    }
  }

  ngOnInit() {
    let control = new FormControl();

    if (!this.formGroup) {
      this.formGroup = this.formBuilder.group({});
      this.formGroup.addControl('', control);
      this.checkSelectIsDisabled('');

    } else if (this.name) {
      this.formGroup.addControl(this.name, control);
      this.setValidators();
      this.checkSelectIsDisabled(this.name);
    }
  }

  getName() {
    return this.name || '';
  }

  checkSelectIsDisabled(controlName) {
    if (!isNullOrUndefined(this.formGroup.controls[controlName])) {
      if (this.disabledSelect) {
        this.formGroup.controls[controlName].disable();
      } else {
        this.formGroup.controls[controlName].enable();
      }
    }
  }

  setValidators() {
    if (this.required) {
      this.formGroup.controls[this.name].setValidators(Validators.required);
    }
  }

  ngOnChanges(changes: any): void {

    setTimeout(() => {
      if (!isNullOrUndefined(this.modelValue)) {
        $('#' + this.id).val(this.modelValue);
      } else {
        if (this.onlyActive) {
          $('#' + this.id).find('option:first').attr('selected','selected');
          this.change($('#' + this.id).val());
        } else {
          $('#' + this.id).val('');
          this.change('');
        }
      }
    }, 0);
  }
}
