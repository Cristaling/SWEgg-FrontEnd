import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule, MatSnackBarModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {NavComponent} from '../nav/nav.component';
import {TopnavComponent} from '../components/topnav/topnav.component';
import {SidebarComponent} from '../components/sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule,
        MatSnackBarModule,
        TranslateModule
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent]
})
export class LayoutModule {
}
