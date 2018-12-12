import { Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import {JsonUserData} from '../../../shared/models/JsonUserData';
import {NotificationsService} from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    showMenu = '';
    currentUser: JsonUserData;
    profileImage;

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService,
    ) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.profileImage = this.authService.getProfilePicture(this.currentUser.email);
        this.notificationService.userDataChangedEvent.subscribe(data => {
            this.currentUser = data;
        });
        this.notificationService.updateProfileImageEvent.subscribe(data => {
           this.profileImage = `data:image/jpeg;base64,${data}`;
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
