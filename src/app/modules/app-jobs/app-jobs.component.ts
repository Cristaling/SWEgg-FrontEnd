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

    currentPage = 0;
    countPage = 8;
    allJobs: JsonJobSummary[] = [];

    finished = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private jobsService : AppJobsService) {
    }

    ngOnInit() {
        this.getJobs();
    }

    onCreateJob() {
        this.router.navigate(['create'], {relativeTo: this.activatedRoute});
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    getJobs() {
        if (this.finished) {
            return;
        }
        this.jobsService.getJobsHttp(this.currentPage, this.countPage).subscribe(jobsSummaries => {
            if (jobsSummaries.length === 0 || jobsSummaries.length < this.countPage) {
                this.finished = true;
            }
            this.allJobs.push.apply(this.allJobs, jobsSummaries);
            this.currentPage += 1;
        });
    }

    onScroll() {
       this.getJobs();
    }
}
