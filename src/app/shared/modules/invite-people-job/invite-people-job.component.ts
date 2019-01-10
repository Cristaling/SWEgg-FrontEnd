import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {JsonUserData} from '../../models/JsonUserData';
import {UserProfileService} from '../../../modules/user-profile/user-profile.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/authentication/auth.service';
import {NotificationsService} from '../../services/notifications.service';
import {MatDialog} from '@angular/material';
import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';
import {JsonUser} from '../../models/JsonUser';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-invite-people-job',
    templateUrl: './invite-people-job.component.html',
    styleUrls: ['./invite-people-job.component.scss']
})
export class InvitePeopleJobComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed
    @ViewChild('inviteModal') inviteModal;
    @Input() selectedUsers: any[];
    @Input() showInvite;
    @Input() jobUUID;
    @Output() close = new EventEmitter<boolean>();
    currentUser: JsonUser;
    dialogRef;

    filteredUsers: Observable<JsonUserData[]>;
    private waitSearchTitle;
    constructor(private userProfileService: UserProfileService,
                private router: Router,
                public authService: AuthService,
                private notificationService: NotificationsService,
                private dialogBox: MatDialog,
                private jobService: AppJobsService,
                private cdr: ChangeDetectorRef
               ) {
    }
    ngOnDestroy(): void {
        this.dialogRef.close();
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();

        this.userProfileService.searchForUser('').pipe(takeUntil(this.navigateToOtherComponent)).subscribe(users => {
            const index = users.findIndex(user => user.email === this.currentUser.email);
            if (index > -1) {
               users.splice(index, 1);
            }
            this.filteredUsers = users;
            this.dialogRef = this.dialogBox.open(this.inviteModal);
        });
    }


    goToProfile(email: string) {
        this.router.navigate([`/user-profile/${email}`]);
        this.dialogBox.closeAll();
    }
    getProfilePicture(email: string) {
        return this.authService.getProfilePicture(email);
    }
    applyFilter(filterValue: string) {
        clearTimeout(this.waitSearchTitle);
        this.waitSearchTitle = setTimeout(() => {
            this.userProfileService.searchForUser(filterValue).subscribe(users => {
                this.filteredUsers = users;
            });
        }, 500);
    }

    closeDialog() {
        this.close.emit(true);
    }


    onNgModelChange(event) {
        this.selectedUsers.splice(0, this.selectedUsers.length);
        this.selectedUsers.push(...event);
    }

    inviteJob() {
        for (const user of this.selectedUsers) {
            this.jobService.inviteToJob(this.jobUUID, user.email).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            });
        }
        this.closeDialog();

    }

}
