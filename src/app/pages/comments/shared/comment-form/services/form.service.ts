import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CommentFormKeys } from '../enums';
import { ICommentFormValue } from '../interfaces';

@Injectable()
export class FormService {
  get form(): FormGroup {
    return this._form;
  }

  get invalid(): boolean {
    return !this.value.text;
  }

  get value(): ICommentFormValue {
    return this.form.value;
  }

  private _form: FormGroup;

  constructor(private fb: FormBuilder) {}

  buildForm(): void {
    this._form = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return this.fb.group({
      [CommentFormKeys.text]: [''],
    });
  }
}
