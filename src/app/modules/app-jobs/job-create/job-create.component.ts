import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {JobType} from '../../../shared/models/JobType';
import {AppJobsService} from '../app-jobs.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {InvitePeopleJobComponent} from '../../../shared/modules/invite-people-job/invite-people-job.component';

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

    constructor(
        private router: Router,
        private appJobsService: AppJobsService,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationsService,
        private dialogInvite: MatDialog,
        private dialogRef: MatDialogRef<JobCreateComponent>
    ) {
    }

    ngOnInit() {
        this.initForms();
    }

    initForms(): any {
        this.jobCreateForm = new FormGroup({
            jobTypeSelected: new FormControl(''),
            jobTitle: new FormControl('', Validators.required),
            jobDescription: new FormControl('', Validators.required),
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
    }


    invitePeople() {
        this.showInviteModal = true;
    }

    closeInviteDialog() {
        this.showInviteModal = false;
        console.log(this.invitedUsers);
    }
}
