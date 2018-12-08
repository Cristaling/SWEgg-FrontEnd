import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {JsonJobSummary} from '../../models/JsonJobSummary';
import {MatDialog} from '@angular/material';
// import {JsonJob} from '../../models/JsonJob';
// import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';
// import {JsonJob} from '../../../shared/models/JsonJob';
// import {AppJobsService} from '../app-jobs.service';
import {urls} from '../../../shared/config/urls';
import {ProfileService} from '../../../shared/services/profile.service';
import {AuthService} from '../../../core/authentication/auth.service';
import {Router} from '@angular/router';
import {AppJobsService} from '../../../modules/app-jobs/app-jobs.service';
import {JsonJob} from '../../models/JsonJob';
import {JsonUser} from '../../models/JsonUser';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {JsonJobApplicationAddRequest} from '../../models/JsonJobApplicationAddRequest';
import {NotificationsService} from '../../services/notifications.service';

@Component({
    selector: 'app-app-job',
    templateUrl: './app-job.component.html',
    styleUrls: ['./app-job.component.scss']
})
export class AppJobComponent implements OnInit {
    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    @ViewChild('jobModal') jobModal;
    @Input() job: JsonJobSummary;

    selectedJob: JsonJob;
    applicationsJob: JsonJobApplicationAddRequest[];
    currentUserApplicated: boolean = true;

    currentUser: JsonUser;

    constructor(private dialogBox: MatDialog,
                private jobService: AppJobsService,
                private profileService: ProfileService,
                private authService: AuthService,
                private router: Router,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
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
        this.jobService.getJobHttp(job.uuid).pipe(takeUntil(this.navigateToOtherComponent)).subscribe((jobResponse: JsonJob) => {
            this.selectedJob = jobResponse;
            this.jobService.getApplicationsForJob(job.uuid).pipe(takeUntil(this.navigateToOtherComponent)).subscribe((applications: JsonJobApplicationAddRequest[]) => {
                this.applicationsJob = applications;
                this.verifyCurrentUserApplicated();
            });
            this.dialogBox.open(this.jobModal, {
                width: '400px'
            });
        });
        // this.selectedJob = job;

    }

    verifyCurrentUserApplicated() {
        this.currentUserApplicated = this.applicationsJob.find(application => application.applicant.email === this.currentUser.email) !== undefined;
    }

    getProfilePicture(email: string) {
        return this.authService.getProfilePicture(email);
    }

    goToProfile(email: string) {
        this.router.navigate([`/user-profile/${email}`]);
        this.closeDialog();
    }

    closeDialog() {
        this.dialogBox.closeAll();
    }

    applyJob() {
        this.jobService.applyToJob(this.selectedJob).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.notificationService.showPopupMessage('You have successfully applied !', 'OK');
            this.dialogBox.closeAll();
        }, error1 =>  {
            this.notificationService.showPopupMessage('An error occurred !', 'OK');
        });
    }
}
