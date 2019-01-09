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
    allAplicants: any[] = [];
    dialogRefInvite: any;
    showDialogInvite: boolean = false;


    constructor(private dialogBox: MatDialog,
        private jobService: AppJobsService,
        private profileService: ProfileService,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationsService,
        private activatedRoute: ActivatedRoute,
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
                            this.dialogBox.open(this.jobModal, {
                                width: '400px'
                            });
                        });
                }
            });
        }
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
        this.showDialogInvite=true;
    }

    removeJob() {

    }
}
