import {Component, OnInit} from '@angular/core';
import {JsonJobSummary} from '../../models/JsonJobSummary';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';
import {JsonUserData} from '../../models/JsonUserData';
import {AuthService} from '../../../core/authentication/auth.service';

@Component({
    selector: 'app-invite-on-job',
    templateUrl: './invite-on-job.component.html',
    styleUrls: ['./invite-on-job.component.scss']
})
export class InviteOnJobComponent implements OnInit {
    allJobs: JsonJobSummary[] = [];
    user: JsonUserData;

    constructor(private router: Router,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private jobsService: AppJobsService,
                private dialogRef: MatDialogRef<InviteOnJobComponent>,
    ) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        this.getJobs();
    }

    getJobs() {
        this.jobsService.getOpenJobsForOwnerHttp(this.user.email).subscribe(jobsSummaries => {
            this.allJobs = jobsSummaries;
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }

}
