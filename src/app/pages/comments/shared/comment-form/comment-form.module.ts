import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { CommentFormComponent } from './comment-form.component';

@NgModule({
  declarations: [CommentFormComponent],
  imports: [SharedModule],
  exports: [CommentFormComponent],
})
export class CommentFormModule {}
