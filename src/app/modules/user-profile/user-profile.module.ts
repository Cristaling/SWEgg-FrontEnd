import { EndorsementsService } from './endorsements/endorsements.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserProfileService} from './user-profile.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileHandlerComponent } from './profile-handler/profile-handler.component';
import { EndorsementsComponent } from './endorsements/endorsements.component';
import { ProfileEditPageComponent } from './profile-edit-page/profile-edit-page.component';
import { PasswordEditPageComponent } from './password-edit-page/password-edit-page.component';
import { EndorsementComponent } from './endorsements/endorsement/endorsement.component';
import {JobCreateComponent} from '../app-jobs/job-create/job-create.component';
import {InvitePeopleJobComponent} from '../../shared/modules/invite-people-job/invite-people-job.component';
import {InviteOnJobComponent} from '../../shared/modules/invite-on-job/invite-on-job.component';
import {AppJobsService} from '../app-jobs/app-jobs.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserProfileRoutingModule
    ],
    declarations: [UserProfileComponent,
        ProfilePageComponent,
        ProfileHandlerComponent,
        EndorsementsComponent,
        ProfileEditPageComponent,
        PasswordEditPageComponent,
        EndorsementComponent],
    providers: [UserProfileService, EndorsementsService, AppJobsService]

})
export class UserProfileModule {
}
