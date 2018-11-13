import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {AppJobsRoutingModule} from './app-jobs-routing.module';
import {AppJobsComponent} from './app-jobs.component';
import {SharedModule} from '../../shared/shared.module';
import { JobCreateComponent } from './job-create/job-create.component';
import { AppJobComponent } from './app-job/app-job.component';
import {AppJobsService} from './app-jobs.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppJobsRoutingModule,
        MatCheckboxModule
    ],
    declarations: [AppJobsComponent, JobCreateComponent, AppJobComponent],
    providers: [AppJobsService]
})
export class AppJobsModule {
}
