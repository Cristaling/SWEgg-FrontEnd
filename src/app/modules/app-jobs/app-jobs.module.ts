import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppJobsRoutingModule} from './app-jobs-routing.module';
import {AppJobsComponent} from './app-jobs.component';
import {SharedModule} from '../../shared/shared.module';
import { AppJobComponent } from './app-job/app-job.component';
import {AppJobsService} from './app-jobs.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppJobsRoutingModule
    ],
    declarations: [AppJobsComponent, AppJobComponent],
    providers: [AppJobsService]
})
export class AppJobsModule {
}
