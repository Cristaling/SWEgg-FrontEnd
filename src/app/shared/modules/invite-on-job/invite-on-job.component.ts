import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {JsonJobSummary} from '../../models/JsonJobSummary';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';
import {JsonUserData} from '../../models/JsonUserData';
import {AuthService} from '../../../core/authentication/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {forEach} from '../../../../../node_modules/@angular/router/src/utils/collection';
import {NotificationsService} from '../../services/notifications.service';

@Component({
    selector: 'app-invite-on-job',
    templateUrl: './invite-on-job.component.html',
    styleUrls: ['./invite-on-job.component.scss']
})
export class InviteOnJobComponent implements OnInit, OnDestroy {
    @ViewChild('InviteModal') inviteModal;
    allJobs: JsonJobSummary[] = [];
    user: JsonUserData;
    @Input() selectedUser;
    @Output() close = new EventEmitter<boolean>();
    private navigateToOtherComponent: Subject<any> = new Subject();
    dialogRef;
    selectedJobs=[];

    constructor(private router: Router,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private jobsService: AppJobsService,
                private dialogBox: MatDialog,
                private notificationService: NotificationsService
    ) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        this.getJobs();
    }

    getJobs() {
        this.jobsService.getOpenJobsForOwnerHttp(this.user.email).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(jobsSummaries => {
            this.allJobs = jobsSummaries;
            this.dialogRef = this.dialogBox.open(this.inviteModal);
        });
    }
    closeDialog() {
        this.close.emit(true);
    }

    ngOnDestroy(): void {
        this.dialogRef.close();
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
    inviteToJob(){
        let index = 0;
        const listSize=this.selectedJobs.length;
        for (const job of this.selectedJobs){
            this.jobsService.inviteToJob(job.uuid, this.selectedUser).pipe(takeUntil(this.navigateToOtherComponent))
                .subscribe(_ => {
                    index++;
                    if(index === listSize){
                        this.notificationService.showPopupMessage('User invited successfull','OK');
                        this.closeDialog();
                    }
                }, err => this.notificationService.showPopupMessage('User already invited!', 'OK'));
        }
    }


}
