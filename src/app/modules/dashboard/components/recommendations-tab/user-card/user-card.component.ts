import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AppJobsService} from '../../../../app-jobs/app-jobs.service';
import {ProfileService} from '../../../../../shared/services/profile.service';
import {AuthService} from '../../../../../core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from '../../../../../shared/services/notifications.service';
import {JsonUserData} from '../../../../../shared/models/JsonUserData';
import {JsonJobSummary} from '../../../../../shared/models/JsonJobSummary';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
    @Input() user: JsonUserData;
  constructor(private dialogBox: MatDialog,
              private jobService: AppJobsService,
              private profileService: ProfileService,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

    goToProfile(email: string) {

        // this.closeDialog();
    }

    onUserClick(email: string) {
        this.router.navigate([`/user-profile/${email}`]);
        this.dialogBox.closeAll();
    }
    getProfilePicture(email: string) {
        return this.authService.getProfilePicture(email);
    }

}
