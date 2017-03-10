import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'toast-message',
  template: ''
})
export class ToastMessageComponent implements OnChanges {

  @Input('message')
  message: string;

  @Input('defaultToastMessage')
  defaultToastMessage: boolean = true;

  ngOnChanges(): void {
    if (this.message && this.defaultToastMessage) {
      Materialize.toast(this.message, 10000);
    }
  }

  showThisMessageInToast(message: string): void {
    Materialize.toast(message, 10000);
  }
}