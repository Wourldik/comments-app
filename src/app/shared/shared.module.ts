import { NgModule } from '@angular/core';

import { common } from './common';
import { material } from './material';

const modules = [common, material];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class SharedModule {}
