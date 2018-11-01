import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserProfileRoutingModule
    ],
    declarations: [UserProfileComponent]
})
export class UserProfileModule {
}
