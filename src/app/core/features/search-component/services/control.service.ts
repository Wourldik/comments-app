import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ControlService {
  get control(): FormControl {
    return this._control;
  }

  private _control: FormControl;

  private defaultValue = '';

  buildControl(control?: FormControl): void {
    if (control instanceof FormControl) {
      this._control = control;
    } else {
      this._control = new FormControl(this.defaultValue);
    }
  }
}
