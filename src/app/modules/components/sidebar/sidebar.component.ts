import { Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import {JsonUserData} from '../../../shared/models/JsonUserData';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {Lightbox} from 'ngx-lightbox';
import {Router} from '@angular/router';

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
        private lightBox: Lightbox,
        private router: Router
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

    openProfileImage() {
        const album = {
            src: this.authService.getProfilePicture(this.currentUser.email),
            caption: 'Your profile picture',
            thumb: ''
        };
        this.lightBox.open([album], 0);
    }

    goToUserProfile() {
        this.router.navigate(['/user-profile']);
    }

    onLoggedout() {
        this.authService.logout();
        this.router.navigate(['/sessions/login']);
    }
}
