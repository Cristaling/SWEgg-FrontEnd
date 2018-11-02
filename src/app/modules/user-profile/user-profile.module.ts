import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserProfileService} from './user-profile.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserProfileRoutingModule
    ],
    declarations: [UserProfileComponent],
    providers: [UserProfileService]
})
export class UserProfileModule {
}
