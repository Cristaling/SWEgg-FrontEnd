import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonJobSummary} from '../../../../shared/models/JsonJobSummary';
import {JsonUserData} from '../../../../shared/models/JsonUserData';
import {Router} from '@angular/router';
import {AppJobsService} from '../../../app-jobs/app-jobs.service';
import {AuthService} from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-invitation-tab',
  templateUrl: './invitation-tab.component.html',
  styleUrls: ['./invitation-tab.component.scss']
})
export class InvitationTabComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed
    finishedInvitedJobs = false;
    emptyInvitedJobs = false;
    invitedJobs: JsonJobSummary[] = [];
    user: JsonUserData;
    constructor(
        private router: Router,
        private jobsService: AppJobsService,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        if (this.finishedInvitedJobs) {
            return;
        }
        this.getInvitationsJobs();

    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    getInvitationsJobs() {
        this.jobsService.getInvitedJobs().subscribe(jobsSummaries => {
            if (this.invitedJobs.length === 0 ) {
                this.finishedInvitedJobs = true;
            }
            this.invitedJobs = jobsSummaries;
            if (this.invitedJobs.length === 0) {
                this.emptyInvitedJobs = true;
            }
        });
    }





}
