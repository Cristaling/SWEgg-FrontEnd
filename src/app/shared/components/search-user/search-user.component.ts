import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserProfileService} from '../../../modules/user-profile/user-profile.service';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {JsonUserData} from '../../models/JsonUserData';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/authentication/auth.service';
import {takeUntil} from 'rxjs/operators';
import {NotificationsService} from '../../services/notifications.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-search-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed

    private waitSearchTitle;
    searchedUserCtrl = new FormControl();
    filteredUsers: Observable<JsonUserData[]>;
    @Input() userToRecommend: JsonUserData;
    recommandationReceivers: JsonUserData[] = [];
    receiversEmail: Set<string> = new Set<string>();

    constructor(private userProfileService: UserProfileService,
                private router: Router,
                public authService: AuthService,
                private notificationService: NotificationsService,
                private dialogBox: MatDialog) {
    }

    ngOnInit() {
    }


    searchForUsers() {
        clearTimeout(this.waitSearchTitle);
        this.waitSearchTitle = setTimeout(() => {
            const value: string = this.searchedUserCtrl.value;
            if (value.trim() === '') {
                return;
            }
            this.userProfileService.searchForUser(value).subscribe(users => {
                if (this.userToRecommend != null) {
                    users = users.filter(user => {
                        return user.email !== this.userToRecommend.email && !this.receiversEmail.has(user.email);
                    });
                }
                this.filteredUsers = users;
            });
        }, 500);

    }

    goToProfile(email: string) {
        this.router.navigate([`/user-profile/${email}`]);
        this.notificationService.viewUserProfile.next();

    }

    handleClickUser(user) {
        if (this.userToRecommend === null) {
            this.goToProfile(user.email);
        } else {
            this.recommandationReceivers.push(user);
            this.receiversEmail.add(user.email);
        }
    }

    discardUser(position) {
        this.recommandationReceivers.splice(position, 1);
    }

    sendRecommandation() {
        this.userProfileService.sendRecommandation(this.userToRecommend.email, Array.from(this.receiversEmail)).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(
            response => {
                this.notificationService.showPopupMessage('Recommandations sent successfully !', 'OK');
                this.dialogBox.closeAll();
            }, error => {
                this.notificationService.showPopupMessage('An error occured !', 'OK');
                this.dialogBox.closeAll();
            }
        );
    }

    ngOnDestroy(): void {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
