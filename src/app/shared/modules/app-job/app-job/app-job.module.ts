import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppJobComponent} from '../app-job.component';
import {MatCardModule, MatCheckboxModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {SharedModule} from '../../../shared.module';
import {JobCreateComponent} from '../../../../modules/app-jobs/job-create/job-create.component';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
      CommonModule,
      SharedModule,
      MatCheckboxModule

  ],
  declarations: [AppJobComponent],
    exports: [AppJobComponent],
    entryComponents: [JobCreateComponent, ConfirmDialogComponent]
})
export class AppJobModule { }
