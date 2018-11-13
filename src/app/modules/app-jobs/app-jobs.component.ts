import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ProfileService} from '../../shared/services/profile.service';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {AppJobsService} from './app-jobs.service';

@Component({
  selector: 'app-app-jobs',
  templateUrl: './app-jobs.component.html',
  styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    allJobs: JsonJobSummary[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private jobsService : AppJobsService) {
    }

    ngOnInit() {
        this.allJobs = this.jobsService.getJobsHttp();
    }

    onCreateJob() {
        this.router.navigate(['create'], {relativeTo: this.activatedRoute});
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

}
