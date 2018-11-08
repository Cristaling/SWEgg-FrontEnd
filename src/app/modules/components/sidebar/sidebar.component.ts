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
    profilePicture: any;
    private readonly imageType: string = 'data:image/png;base64,';

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService,
        private profileService: UserProfileService
    ) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.notificationService.userDataChangedEvent.subscribe(data => {
            this.currentUser = data;
        });
        this.profileService.getProfilePicture(this.currentUser.email).subscribe(response => {
            if (response == null) {
                this.profilePicture = '../../../../assets/images/user-default-image.jpeg';
            } else {
                console.log('sdsds');
                this.profilePicture = this.imageType + response;
            }
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
