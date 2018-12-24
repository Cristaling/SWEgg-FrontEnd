import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../core/authentication/auth.service';
import {Observable} from 'rxjs';
import {JsonUserData} from '../../../shared/models/JsonUserData';
import {FormControl} from '@angular/forms';
import {UserProfileService} from '../../user-profile/user-profile.service';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    pushRightClass = 'push-right';

    constructor(public router: Router, private translate: TranslateService, public authService: AuthService, public userProfileService: UserProfileService) {
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
        this.translate.use(language);
    }

    goToUserProfile() {
        this.router.navigate(['/user-profile']);
    }
}
