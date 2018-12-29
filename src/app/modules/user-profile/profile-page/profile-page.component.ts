import { FlexLayoutModule } from '@angular/flex-layout';
import { JsonUserData } from './../../../shared/models/JsonUserData';
import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import {AuthService} from '../../../core/authentication/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import {takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {InvitePeopleJobComponent} from '../../../shared/modules/invite-people-job/invite-people-job.component';
import {InviteOnJobComponent} from '../../../shared/modules/invite-on-job/invite-on-job.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed

    @ViewChild('recommendUser') recommendUser;
    @Input() userEmail: string;
    user: JsonUserData;
    profilePicture: any;
    dialogRefInvite: any;


    constructor(private authService: AuthService,
        private profileService: ProfileService,
                private activatedRoute: ActivatedRoute,
                private dialogBox: MatDialog
                ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(param => {
            this.userEmail = param.email;
            if (this.userEmail) {
                this.loadUserData();
            }
        });
    }

    loadUserData() {
        this.profilePicture = this.getProfilePicture(this.userEmail);
        this.profileService.getProfile(this.userEmail)
        .pipe(takeUntil(this.navigateToOtherComponent))
        .subscribe((userResponse: JsonUserData) => {
            this.user = userResponse;
        }, (error) => {
        });
    }

    getProfilePicture(email: string) {
        return this.authService.getProfilePicture(email);
    }

    openRecommendDialog() {
        const dialogOptions: MatDialogConfig = {
            height: '70%'
        };
        this.dialogBox.open(this.recommendUser, dialogOptions);
    }

    ngOnDestroy(): void {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    openInviteToJobDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialogRefInvite = this.dialogBox.open(InviteOnJobComponent, dialogConfig);
    }
}
