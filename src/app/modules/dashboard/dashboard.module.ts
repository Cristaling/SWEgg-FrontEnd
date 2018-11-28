import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {AppJobsService} from '../app-jobs/app-jobs.service';
import {AppJobsModule} from '../app-jobs/app-jobs.module';
import {AppJobModule} from '../../shared/modules/app-job/app-job/app-job.module';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        FlexLayoutModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        AppJobModule
    ],
    declarations: [DashboardComponent],
    providers: [AppJobsService]
})
export class DashboardModule {
}
