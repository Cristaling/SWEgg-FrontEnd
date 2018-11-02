import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppJobsRoutingModule} from './app-jobs-routing.module';
import {AppJobsComponent} from './app-jobs.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppJobsRoutingModule
    ],
    declarations: [AppJobsComponent]
})
export class AppJobsModule {
}
