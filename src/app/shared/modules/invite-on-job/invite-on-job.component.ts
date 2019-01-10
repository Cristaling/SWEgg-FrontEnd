import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {JsonJobSummary} from '../../models/JsonJobSummary';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';
import {JsonUserData} from '../../models/JsonUserData';
import {AuthService} from '../../../core/authentication/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-invite-on-job',
    templateUrl: './invite-on-job.component.html',
    styleUrls: ['./invite-on-job.component.scss']
})
export class InviteOnJobComponent implements OnInit, OnDestroy {
    @ViewChild('inviteModal') inviteModal;
    allJobs: JsonJobSummary[] = [];
    user: JsonUserData;
    @Input() selectedUser;
    @Output() close = new EventEmitter<boolean>();
    private navigateToOtherComponent: Subject<any> = new Subject();

    constructor(private router: Router,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private jobsService: AppJobsService,
                private dialogBox: MatDialog
    ) {
    }

    ngOnInit() {
        this.dialogBox.open(this.inviteModal);
        this.user = this.authService.getCurrentUser();
        this.getJobs();
    }

    getJobs() {
        this.jobsService.getOpenJobsForOwnerHttp(this.user.email).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(jobsSummaries => {
            this.allJobs = jobsSummaries;
        });
    }
    closeDialog() {
        this.close.emit(true);
    }

    ngOnDestroy(): void {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.closed;
    }

}
