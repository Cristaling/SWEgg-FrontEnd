import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JsonJobSummary } from '../../models/JsonJobSummary';
import {MatDialog, MatDialogConfig, MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material';
// import {JsonJob} from '../../models/JsonJob';
// import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';
// import {JsonJob} from '../../../shared/models/JsonJob';
// import {AppJobsService} from '../app-jobs.service';
import { urls } from '../../../shared/config/urls';
import { ProfileService } from '../../../shared/services/profile.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppJobsService } from '../../../modules/app-jobs/app-jobs.service';
import { JsonJob } from '../../models/JsonJob';
import { JsonUser } from '../../models/JsonUser';
import { JsonUserData } from '../../models/JsonUserData';
import { SelectionModel } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { JsonJobApplicationAddRequest } from '../../models/JsonJobApplicationAddRequest';
import { NotificationsService } from '../../services/notifications.service';
import { forEach } from '@angular/router/src/utils/collection';
import {InvitePeopleJobComponent} from '../invite-people-job/invite-people-job.component';
import {JobCreateComponent} from '../../../modules/app-jobs/job-create/job-create.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-app-job',
    templateUrl: './app-job.component.html',
    styleUrls: ['./app-job.component.scss']
})
export class AppJobComponent implements OnInit, AfterViewInit {

    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed

    @ViewChild('jobModal') jobModal;
    @ViewChild('invitePeople') inviteModal;
    @Input() job: JsonJobSummary;
    @Input() visible = true;
    userInviteList: JsonUserData[] = []
    selectedJob: JsonJob;
    applicationsJob: JsonUser[];
    currentUserApplicated = true;
    currentUser: JsonUser;
    invitedUsers = [];
    allAplicants: any[] = [];
    dialogRefInvite: any;
    showDialogInvite: boolean = false;
    dialogRef: any;
    jobStatuses: Array<string>;
    abilities;

    constructor(private dialogBox: MatDialog,
        private jobService: AppJobsService,
        private profileService: ProfileService,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationsService,
        private activatedRoute: ActivatedRoute,
                private dialog: MatDialog
                ) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        if (!this.visible) {
            this.activatedRoute.queryParams.subscribe(params => {
                if (params.job) {
                    this.jobService.getJobHttp(params.job).pipe(takeUntil(this.navigateToOtherComponent))
                        .subscribe((jobResponse: JsonJobSummary) => {
                            this.selectedJob = jobResponse;
                            this.job = jobResponse;
                            this.jobService.getApplicationsForJob(params.job).pipe(
                                takeUntil(this.navigateToOtherComponent)).subscribe((applications: JsonUser[]) => {
                                    this.applicationsJob = applications;
                                    this.verifyCurrentUserApplicated();
                                });
                            const dialog = this.dialogBox.open(this.jobModal, {
                                width: '400px'
                            });
                            dialog.afterClosed().subscribe(_ => this.closeDialog());
                        });
                    this.jobService.getAbilitiesForJob(params.job).pipe(takeUntil(this.navigateToOtherComponent))
                        .subscribe(response => {
                            this.abilities = response.map(ability => ability.name);
                            console.log(this.abilities);
                        });
                }
            });
        }
        this.notificationService.jobStatusesModified.subscribe(response => {
            this.jobStatuses = this.jobService.getJobStatusesField();
        });
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

    onJobClick(job) {
        this.router.navigate(['.'], {relativeTo: this.activatedRoute, queryParams: { job: job.uuid }, queryParamsHandling: 'merge' });
        this.jobService.getAbilitiesForJob(this.job.uuid).pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                this.abilities = response.map(ability => ability.name);
                console.log(this.abilities);
            });
        // this.jobService.getJobHttp(job.uuid).pipe(takeUntil(this.navigateToOtherComponent)).subscribe((jobResponse: JsonJobSummary) => {
        //     this.selectedJob = jobResponse;
        //     this.jobService.getApplicationsForJob(job.uuid).pipe(
        //         takeUntil(this.navigateToOtherComponent)).subscribe((applications: JsonUser[]) => {
        //             this.applicationsJob = applications;
        //             this.verifyCurrentUserApplicated();
        //         });
        //     this.dialogBox.open(this.jobModal, {
        //         width: '400px'
        //     });
        // });
        // this.getAllaplicationsForJob(this.selectedJob.uuid);
        // this.selectedJob = job;

    }

    editJob(job: JsonJobSummary) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = job;

        this.dialogRef = this.dialog.open(JobCreateComponent, dialogConfig);
        this.dialogRef.afterClosed().subscribe(() => {
            this.refreshCurrentJob();
        })
    }

    refreshCurrentJob() {
        this.jobService.getJobHttp(this.selectedJob.uuid).subscribe((jobResponse: JsonJobSummary) => {
            this.selectedJob = jobResponse;
        });
    }

    verifyCurrentUserApplicated() {
        this.currentUserApplicated = this.applicationsJob.find(application => application.email === this.currentUser.email) !== undefined;
    }

    getProfilePicture(email: string) {
        return this.authService.getProfilePicture(email);
    }

    goToProfile(email: string) {
        this.router.navigate([`/user-profile/${email}`]);
        this.dialogBox.closeAll();
        // this.closeDialog();
    }

    closeDialog() {
        this.router.navigate(['.'], {relativeTo: this.activatedRoute, queryParams: { job: null }, queryParamsHandling: 'merge' });
        this.dialogBox.closeAll();
    }

    ngAfterViewInit(): void {

    }

    onSelectedUserForJob(checkbox) {
        checkbox.source.deselectAll();
        checkbox.option.selected = true;
    }

    submitApplicant(userSelection) {
        const valueSelected = userSelection.selectedOptions.selected[0];
        if (valueSelected) {
            const applicant = valueSelected.value;
            if (this.job.employeeEmail === applicant.email) {
                this.notificationService.showPopupMessage(`${this.job.employeeName} already selected for you job!`, 'OK');
                return;
            }
            this.jobService.selectEmployeeForJob(this.job.uuid, applicant.email).pipe(
                takeUntil(this.navigateToOtherComponent)).subscribe(_ => {
                    this.job.employeeEmail = applicant.email;
                    this.job.employeeName = `${applicant.firstName} ${applicant.lastName}`;
                    this.notificationService.showPopupMessage(`${this.job.employeeName} selected for you job!`, 'OK');
                });
        }
    }
    getAllaplicationsForJob(jobUUID) {
        this.jobService.getJobApplications(jobUUID).subscribe(jobApplications => {
            this.allAplicants = jobApplications;
        });
    }

    applyJob() {
        this.jobService.applyToJob(this.selectedJob).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.notificationService.showPopupMessage('You have successfully applied !', 'OK');
            this.dialogBox.closeAll();
        }, error1 => {
            this.notificationService.showPopupMessage('An error occurred !', 'OK');
        });
    }

    openInviteDialog() {
        this.showDialogInvite = true;
    }

    removeJob() {
        this.changeStatusOfJob('DRAFT');
    }

    closeInviteDialog() {
        this.showDialogInvite = false;
    }

    changeStatusOfJob(status: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            title: 'Change status',
            message: `Are you sure you want to change status to ${status} ?`
        }

        this.dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        this.dialogRef.afterClosed().subscribe(response => {
            if (response === 'ok') {
                this.jobService.changeJobStatus(this.selectedJob.uuid, status).pipe(takeUntil(this.navigateToOtherComponent))
                    .subscribe(responsee => {
                        this.refreshCurrentJob();
                        this.notificationService.showPopupMessage('Status was modified successfully !', 'OK');
                    }, error => {
                       this.notificationService.showPopupMessage('An error occured !', 'OK');
                    });
            }
        })
    }
}
