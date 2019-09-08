import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CommentsComponent } from './comments.component';
import { shared } from './shared';

@NgModule({
  declarations: [CommentsComponent],
  imports: [SharedModule, shared],
  exports: [CommentsComponent],
})
export class CommentsModule {}
