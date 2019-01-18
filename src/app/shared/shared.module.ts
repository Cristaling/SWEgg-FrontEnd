import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule, MatDatepickerModule, MatDialogModule,
    MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule, MatToolbarModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule, MatExpansionModule, MatBadgeModule, MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { AbilitySelectorComponent } from './components/ability-selector/ability-selector.component';
import { AbilitySelectorService } from './services/ability-selector.service';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angular-6-social-login';
import { SearchUserComponent } from './components/search-user/search-user.component';
import {LightboxModule} from 'ngx-lightbox';
import { InviteOnJobComponent } from './modules/invite-on-job/invite-on-job.component';
import { UserCardComponent } from '../modules/dashboard/components/recommendations-tab/user-card/user-card.component';
import {InvitePeopleJobComponent} from './modules/invite-people-job/invite-people-job.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatDividerModule,
        MatCardModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FlexLayoutModule,
        MatDialogModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatBadgeModule,
        MatChipsModule,
        SocialLoginModule,
        // AppJobModule,
        MatSelectModule,
        LightboxModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatDividerModule,
        MatCardModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FlexLayoutModule,
        AbilitySelectorComponent,
        SearchUserComponent,
        MatDialogModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatBadgeModule,
        SocialLoginModule,
        MatChipsModule,
        MatSelectModule,
        LightboxModule,
        InvitePeopleJobComponent,
        InviteOnJobComponent,
        TranslateModule
    ],
    declarations: [AbilitySelectorComponent, SearchUserComponent, InvitePeopleJobComponent, InviteOnJobComponent], entryComponents:[InviteOnJobComponent],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        },
        AbilitySelectorService, MatNativeDateModule],

})
export class SharedModule {

}

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            // {
            //   id: FacebookLoginProvider.PROVIDER_ID,
            //   provider: new FacebookLoginProvider('Your-Facebook-app-id')
            // },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('571895084013-hcqh7qd55ueagegmd13efpin3tq6hcim.apps.googleusercontent.com')
            },
            // {
            //   id: LinkedinLoginProvider.PROVIDER_ID,
            //   provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
            // },
        ]);
    return config;
}
