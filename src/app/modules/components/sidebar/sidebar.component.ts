import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import {JsonUserData} from '../../../shared/models/JsonUserData';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {UserProfileService} from '../../user-profile/user-profile.service';
import {ProfileService} from '../../../shared/services/profile.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    showMenu: string = '';
    currentUser: JsonUserData;

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService,
        private profileService: ProfileService,
    ) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.profileService.getProfilePicture(this.currentUser.email).subscribe(photo => {
        })
        this.notificationService.userDataChangedEvent.subscribe(data => {
            this.currentUser = data;
        });
        this.notificationService.updateProfileImageEvent.subscribe(data => {
        });
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    getProfileImage(email: string) {
        return this.authService.getProfilePicture(email);
    }
}
