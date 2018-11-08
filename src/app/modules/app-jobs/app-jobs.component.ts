import {Component, OnInit} from '@angular/core';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {AppJobsService} from './app-jobs.service';

@Component({
    selector: 'app-app-jobs',
    templateUrl: './app-jobs.component.html',
    styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit {

    allJobs: JsonJobSummary[];

    constructor(private jobsService : AppJobsService) {
    }

    ngOnInit() {
        this.allJobs = this.jobsService.getJobsHttp();
    }

}
