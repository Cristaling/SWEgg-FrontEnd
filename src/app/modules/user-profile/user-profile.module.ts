import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserProfileService} from './user-profile.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileHandlerComponent } from './profile-handler/profile-handler.component';
import { EndorsementsComponent } from './endorsements/endorsements.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserProfileRoutingModule
    ],
    declarations: [UserProfileComponent, ProfilePageComponent, ProfileHandlerComponent, EndorsementsComponent],
    providers: [UserProfileService]
})
export class UserProfileModule {
}
