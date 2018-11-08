import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {AppJobsRoutingModule} from './app-jobs-routing.module';
import {AppJobsComponent} from './app-jobs.component';
import {SharedModule} from '../../shared/shared.module';
import { JobCreateComponent } from './job-create/job-create.component';
import {JobCreateService} from './job-create/job-create.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppJobsRoutingModule,
        MatCheckboxModule
    ],
    declarations: [AppJobsComponent, JobCreateComponent],
    providers: [JobCreateService]
})
export class AppJobsModule {
}
