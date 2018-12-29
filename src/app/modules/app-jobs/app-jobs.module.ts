import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {AppJobsRoutingModule} from './app-jobs-routing.module';
import {AppJobsComponent} from './app-jobs.component';
import {SharedModule} from '../../shared/shared.module';
import {JobCreateComponent} from './job-create/job-create.component';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {AppJobsService} from './app-jobs.service';
import {AppJobModule} from '../../shared/modules/app-job/app-job/app-job.module';
import {InvitePeopleJobComponent} from '../../shared/modules/invite-people-job/invite-people-job.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppJobsRoutingModule,
        MatCheckboxModule,
        AppJobModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
    ],
    declarations: [
        AppJobsComponent,
        JobCreateComponent
    ],
    providers: [
        AppJobsService
    ],
    entryComponents: [JobCreateComponent, InvitePeopleJobComponent],
})
export class AppJobsModule {
}
