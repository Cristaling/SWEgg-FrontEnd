import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {JobType} from '../../../shared/models/JobType';
import {AppJobsService} from '../app-jobs.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {InvitePeopleJobComponent} from '../../../shared/modules/invite-people-job/invite-people-job.component';
import {JsonJobSummary} from '../../../shared/models/JsonJobSummary';

@Component({
    selector: 'app-job-create',
    templateUrl: './job-create.component.html',
    styleUrls: ['./job-create.component.scss']
})
export class JobCreateComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed
    jobCreateForm: FormGroup;
    jobTypeSelected: JobType;
    dialogRefInvite: any;
    jobTypes: JobType[];
    selectedAbilities: string[] = [];
    invitedUsers = [];
    showInviteModal = false;
    job: JsonJobSummary;

    constructor(
        private router: Router,
        private appJobsService: AppJobsService,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationsService,
        private dialogInvite: MatDialog,
        private dialogRef: MatDialogRef<JobCreateComponent>,
        @Inject(MAT_DIALOG_DATA) job
    ) {
        this.job = job;
    }

    ngOnInit() {
        this.initForms();
    }

    initForms(): any {
        this.jobCreateForm = new FormGroup({
            jobTypeSelected: new FormControl(''),
            jobTitle: new FormControl(this.job != null ? this.job.title : '', Validators.required),
            jobDescription: new FormControl(this.job != null ? this.job.description : '', Validators.required),
            isPrivate: new FormControl(''),
        });
        this.appJobsService.getJobTypesHttp().pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.jobTypes = response;
            this.jobTypeSelected = this.jobTypes[0];
            return response.data;
        });
    }


    backToJobs() {
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    onJobCreate() {
        const values = this.jobCreateForm.value;
        const jobStatus = values.isPrivate ? 'INVITED' : 'OPEN';
        if (this.job == null) { // create job
            this.appJobsService.createJobHttp(this.jobTypeSelected.value.toLocaleUpperCase(),
                jobStatus,
                values.jobTitle,
                values.jobDescription,
                this.selectedAbilities)
                .pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
                console.log(response);
                if (jobStatus === 'INVITED') {
                    // this.notificationService.showPopupMessage('Not implemented!', 'OK');
                    for (const user of this.invitedUsers) {
                        this.appJobsService.inviteToJob(response, user.email).subscribe(response2 => {
                        });
                    }
                } else {
                    this.notificationService.showPopupMessage('Your job was saved successfully !', 'OK');
                    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
                }
                this.dialogRef.close();
            }, (error) => {
                if (error.status === 401) {
                    this.notificationService.showPopupMessage('An error occurred !', 'OK');
                }
                if (error.status === 400) {
                    this.notificationService.showPopupMessage('You have an existent job published !', 'OK');
                    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
                }
            });
        } else {
            this.appJobsService.editJob(this.job.uuid, values.jobTitle, values.jobDescription)
                .subscribe(jobResponse => {
                    this.notificationService.showPopupMessage('Job edited successfully !', 'OK');
                    this.dialogRef.close();
                }, error => {
                    this.notificationService.showPopupMessage('An error occured !', 'OK');
                    this.dialogRef.close();
                });
        }
    }


    invitePeople() {
        this.showInviteModal = true;
    }

    closeInviteDialog() {
        this.showInviteModal = false;
        console.log(this.invitedUsers);
    }
}
