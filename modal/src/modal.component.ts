import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'modal',
  template: `
              <div id="{{ id }}" ngClass="{{ class }}" class="modal modal-fixed-footer">
                <div class="modal-content left-align">
                    <h4>{{ title || 'Modal' }}</h4>
                    <ng-content></ng-content>
                </div>
                <div class="modal-footer" >
                    <ng-content select="[footer]"></ng-content>
                    <button *ngIf="showDenyButton()" [disabled]="hasDisableDenyButton()" (click)= "deny()" ngClass="{{ disableDenyButton ? 'btn-flat-disabled' : 'waves-red' }}" class=" modal-action modal-close waves-effect waves-red btn-flat">{{ denyLabel }}</button>
                    <button *ngIf="showConfirmButton()" (click)= "confirm()" [disabled]="disableConfirm" ngClass="{{ disableConfirm ? 'btn-flat-disabled' : 'waves-green' }}" class="modal-action waves-effect btn-flat">{{ confirmLabel }} </button>
                </div>
              </div>`,
  styleUrls: ['./css/modal.css']
})

export class ModalComponent {
  @Input('id')
  id: string;

  @Input('data')
  data: any;

  @Input('class')
  class: string;

  @Input('title')
  title: string;

  @Input('noCloseOnConfirm')
  noCloseOnConfirm: boolean;

  @Input('disableDenyButton')
  disableDenyButton: boolean = false;

  @Input('confirmLabel')
  confirmLabel: string;

  @Input('denyLabel')
  denyLabel: string;

  @Input('modalClose')
  modalClose: boolean;

  @Input('disableConfirm')
  disableConfirm: boolean;

  @Output('onConfirm')
  onConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output('onDeny')
  onDeny: EventEmitter<any> = new EventEmitter<any>();

  confirm(): void {
    if (isNullOrUndefined(this.noCloseOnConfirm) || !this.noCloseOnConfirm) {
      $('#'+this.id).closeModal();
    }
    this.onConfirm.emit(this.data);
  }

  deny(): void {
    this.onDeny.emit(this.data);
  }

  showDenyButton(): boolean {
    return !isNullOrUndefined(this.denyLabel);
  }

  showConfirmButton(): boolean {
    return !isNullOrUndefined(this.confirmLabel);
  }

  modalClose(): string {
    return this.modalClose ? 'modal-close' : '';
  }

  hasDisableDenyButton() {
    return this.disableDenyButton;
  }
}