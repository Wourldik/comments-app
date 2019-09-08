import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Comments } from './models';
import { CommentsService } from './services';
import { ICommentFormValue } from './shared/comment-form/interfaces';

@Component({
  selector: 'cm-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  @Input()
  comments?: Comments;

  constructor(private commentsService: CommentsService) {}

  onRemove(id: number): void {
    this.commentsService.removed.next(id);
  }

  onSubmit(formValue: ICommentFormValue, id: number): void {
    this.commentsService.added.next({ text: formValue.text, id });
  }
}
