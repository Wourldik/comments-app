import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { SearchComponentComponent } from './search-component.component';

@NgModule({
  declarations: [SearchComponentComponent],
  imports: [SharedModule],
  exports: [SearchComponentComponent],
})
export class SearchComponentModule {}
