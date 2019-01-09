import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonJobSummary} from '../../../../shared/models/JsonJobSummary';
import {JsonUserData} from '../../../../shared/models/JsonUserData';
import {Router} from '@angular/router';
import {AppJobsService} from '../../../app-jobs/app-jobs.service';
import {AuthService} from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-jobs-tab',
  templateUrl: './jobs-tab.component.html',
  styleUrls: ['./jobs-tab.component.scss']
})
export class JobsTabComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed
    finishedAllJobs = false;
    finishedRelevantJobs = false;
    emptyAllJobs = false;
    emptyRelevantJobs = false;
    allJobs: JsonJobSummary[] = [];
    relevantJobs: JsonJobSummary[] = [];
    user: JsonUserData;
    constructor(
        private router: Router,
        private jobsService: AppJobsService,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        if (this.finishedAllJobs) {
            return;
        }
        if (this.finishedRelevantJobs) {
            return;
        }
        this.getAllJobs();
        // this.getRelevantJobs();

    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    getAllJobs() {
        this.jobsService.getUserJobsHttp(this.user.email).subscribe(jobsSummaries => {
            if (this.allJobs.length === 0 ) {
                this.finishedAllJobs = true;
            }
            this.allJobs = jobsSummaries;
            if (this.allJobs.length === 0) {
                this.emptyAllJobs = true;
            }
        });
    }

    getRelevantJobs() {
        this.jobsService.getRelevantUserJobsHttp().subscribe(jobsSummaries => {
            if (this.relevantJobs.length === 0 ) {
                this.finishedRelevantJobs = true;
            }
            this.relevantJobs = jobsSummaries;
            if (this.relevantJobs.length === 0) {
                this.emptyRelevantJobs = true;
            }
        });
    }
}
