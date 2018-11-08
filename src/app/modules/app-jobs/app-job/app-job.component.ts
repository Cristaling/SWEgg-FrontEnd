import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {JsonJobSummary} from '../../../shared/models/JsonJobSummary';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-app-job',
    templateUrl: './app-job.component.html',
    styleUrls: ['./app-job.component.scss']
})
export class AppJobComponent implements OnInit {

    @ViewChild('jobModal') jobModal;
    @Input() job: JsonJobSummary;

    selectedJob: JsonJobSummary;

    constructor(private dialogBox: MatDialog) {
    }

    ngOnInit() {
    }

    displayDescription(description: string) {
        if (description.length > 120) {
            return description.slice(0, 120) + '...';
        }
    }

    onJobClick(job: JsonJobSummary) {
        this.dialogBox.open(this.jobModal, {
            width: '400px'
        });
        this.selectedJob = job;
    }

    closeDialog() {
        this.dialogBox.closeAll();
    }
}
