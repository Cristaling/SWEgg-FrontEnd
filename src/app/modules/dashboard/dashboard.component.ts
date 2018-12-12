import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {ActivatedRoute, Router} from '@angular/router';
import {AppJobsService} from '../app-jobs/app-jobs.service';
import {JsonUserData} from '../../shared/models/JsonUserData';
import {AuthService} from '../../core/authentication/auth.service';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed
    finishedAllJobs = false;
    emptyRelevantJobs = false;
    emptyAllJobs = false;
    allJobs: JsonJobSummary[] = [];
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
        this.getAllJobs();

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

}
