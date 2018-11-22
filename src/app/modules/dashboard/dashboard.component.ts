import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {ActivatedRoute, Router} from '@angular/router';
import {AppJobsService} from '../app-jobs/app-jobs.service';
import {JsonUserData} from '../../shared/models/JsonUserData';
import {AuthService} from '../../core/authentication/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    allJobs: JsonJobSummary[];

    constructor(
        private router: Router,
        private jobsService: AppJobsService,
        private authService: AuthService,) {
    }

    ngOnInit() {
        const user: JsonUserData = this.authService.getCurrentUser();
        this.jobsService.getUserJobsHttp(user.email).subscribe(jobsSummaries => {
            this.allJobs = jobsSummaries;
        });
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

}
