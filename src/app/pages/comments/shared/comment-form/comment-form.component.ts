import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommentFormKeys } from './enums';
import { ICommentFormValue } from './interfaces';
import { FormService } from './services';

@Component({
  selector: 'cm-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  viewProviders: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit {
  get form(): FormGroup {
    return this.formService.form;
  }

  get invalid(): boolean {
    return this.formService.invalid;
  }

  readonly formKeys = CommentFormKeys;

  @Output()
  readonly submitted = new EventEmitter<ICommentFormValue>();

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formService.buildForm();
  }

  onSubmit(): void {
    if (this.invalid) {
      return;
    }

    this.submitted.emit(this.form.value);
  }
}
