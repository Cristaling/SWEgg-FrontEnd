import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppJobComponent} from '../app-job.component';
import {MatCardModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {SharedModule} from '../../../shared.module';

@NgModule({
  imports: [
      CommonModule,
      SharedModule,

  ],
  declarations: [AppJobComponent],
    exports: [AppJobComponent]
})
export class AppJobModule { }
