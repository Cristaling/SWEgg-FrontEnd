import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {AppJobsRoutingModule} from './app-jobs-routing.module';
import {AppJobsComponent} from './app-jobs.component';
import {SharedModule} from '../../shared/shared.module';
import { JobCreateComponent } from './job-create/job-create.component';
import {AppJobsService} from './app-jobs.service';
import {AppJobModule} from '../../shared/modules/app-job/app-job/app-job.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppJobsRoutingModule,
        MatCheckboxModule,
        AppJobModule
    ],
    declarations: [JobCreateComponent, AppJobsComponent],
    providers: [AppJobsService]
})
export class AppJobsModule {
}
