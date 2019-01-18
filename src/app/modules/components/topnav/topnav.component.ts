import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/authentication/auth.service';
import { Observable } from 'rxjs';
import { JsonUserData } from '../../../shared/models/JsonUserData';
import { FormControl } from '@angular/forms';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { JsonUser } from '../../../shared/models/JsonUser';
import { urls } from '../../../shared/config/urls';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(100%, 0, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ]
})
export class TopnavComponent implements OnInit {
    menuNotificationsState: string = 'out';

    pushRightClass = 'push-right';
    currentUser: JsonUser;

    constructor(public router: Router,
        private translate: TranslateService,
        public authService: AuthService,
        public userProfileService: UserProfileService,
        public notificationService: NotificationsService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
        // this.filteredUsers = this.searchedUserCtrl.valueChanges
        //     .pipe(
        //         startWith(''),
        //         map(userName => userName ? this._filterSearchedUsers(userName) : this.usersForSearch.slice())
        //     );
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        this.authService.logout();
        this.router.navigate(['/sessions/login']);
    }

    changeLang(language: string) {
        console.log(language);
        this.translate.use(language);
    }

    goToUserProfile() {
        this.router.navigate(['/user-profile']);
    }

    getProfilePicture(email) {
        return `${urls.profilePictureUrl}?email=${email}&token=${this.authService.getToken()}`;
    }
    toggleMenuNotifications() {
        // 1-line if statement that toggles the value:
        this.menuNotificationsState = this.menuNotificationsState === 'out' ? 'in' : 'out';
    }
}
