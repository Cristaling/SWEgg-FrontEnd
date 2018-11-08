import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import {JsonUserData} from '../../../shared/models/JsonUserData';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {UserProfileService} from '../../user-profile/user-profile.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    showMenu: string = '';
    currentUser: JsonUserData;
    profilePicture: string;

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService,
    ) {
    }

    ngOnInit() {
        this.profilePicture = this.authService.getProfilePicture();
        this.currentUser = this.authService.getCurrentUser();
        this.notificationService.userDataChangedEvent.subscribe(data => {
            this.currentUser = data;
        });
        this.notificationService.updateProfileImageEvent.subscribe(data => {
            this.profilePicture = this.authService.getProfilePicture();
        });
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
