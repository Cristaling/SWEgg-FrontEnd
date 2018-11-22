import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {JsonJobSummary} from '../../models/JsonJobSummary';
import {MatDialog} from '@angular/material';
import {JsonJob} from '../../models/JsonJob';
import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';

@Component({
    selector: 'app-app-job',
    templateUrl: './app-job.component.html',
    styleUrls: ['./app-job.component.scss']
})
export class AppJobComponent implements OnInit {

    @ViewChild('jobModal') jobModal;
    @Input() job: JsonJobSummary;

    // selectedJob: JsonJob;
    selectedJob: JsonJobSummary;

    constructor(private dialogBox: MatDialog,
                private jobService: AppJobsService) {
    }

    ngOnInit() {
    }

    displayDescription(description: string) {
        if (description.length > 120) {
            return description.slice(0, 120) + '...';
        }
        return description;
    }

    displayTitle(title: string) {
        if (title.length > 50) {
            return title.slice(0, 50) + '...';
        }
        return title;
    }

    onJobClick(job: JsonJob) {
        // this.jobService.getJobHttp(job).subscribe((jobResponse: JsonJob) => {
        //     this.selectedJob = jobResponse;
        // });
        this.selectedJob = job;
        this.dialogBox.open(this.jobModal, {
            width: '400px'
        });
    }

    closeDialog() {
        this.dialogBox.closeAll();
    }
}
