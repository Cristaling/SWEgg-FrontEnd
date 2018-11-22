import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {AppJobsRoutingModule} from './app-jobs-routing.module';
import {AppJobsComponent} from './app-jobs.component';
import {SharedModule} from '../../shared/shared.module';
import {JobCreateComponent} from './job-create/job-create.component';
import {JobCreateService} from './job-create/job-create.service';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppJobsRoutingModule,
        MatCheckboxModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
    ],
    declarations: [
        AppJobsComponent,
        JobCreateComponent
    ],
    providers: [JobCreateService],
    entryComponents: [JobCreateComponent]
})
export class AppJobsModule {
}
