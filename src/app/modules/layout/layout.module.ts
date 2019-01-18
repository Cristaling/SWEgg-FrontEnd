import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {NavComponent} from '../nav/nav.component';
import {TopnavComponent} from '../components/topnav/topnav.component';
import {SidebarComponent} from '../components/sidebar/sidebar.component';
import {SharedModule} from '../../shared/shared.module';
import {UserProfileService} from '../user-profile/user-profile.service';
import {NotificationsComponent} from '../components/notifications/notifications.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule,
        TranslateModule
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent, NotificationsComponent],
    providers: [UserProfileService]
})
export class LayoutModule {
}
