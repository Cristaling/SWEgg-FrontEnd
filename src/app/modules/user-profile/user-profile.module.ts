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
        PasswordEditPageComponent],
    providers: [UserProfileService, EndorsementsService]
})
export class UserProfileModule {
}
