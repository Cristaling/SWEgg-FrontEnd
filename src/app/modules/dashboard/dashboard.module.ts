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
import { JobsTabComponent } from './components/jobs-tab/jobs-tab.component';
import { RecommendationsTabComponent } from './components/recommendations-tab/recommendations-tab.component';
import { InvitationTabComponent } from './components/invitation-tab/invitation-tab.component';
import {InvitePeopleJobComponent} from '../../shared/modules/invite-people-job/invite-people-job.component';
import {UserCardComponent} from './components/recommendations-tab/user-card/user-card.component';

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
        AppJobModule,
    ],
    declarations: [DashboardComponent,
        JobsTabComponent,
        RecommendationsTabComponent,
        InvitationTabComponent,
        UserCardComponent
        ],
    providers: [AppJobsService],
    entryComponents: [InvitePeopleJobComponent]
})
export class DashboardModule {
}
