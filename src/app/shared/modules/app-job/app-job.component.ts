import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {JsonJobSummary} from '../../models/JsonJobSummary';
import {MatDialog, MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material';
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
import {JsonUserData} from '../../models/JsonUserData';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-app-job',
    templateUrl: './app-job.component.html',
    styleUrls: ['./app-job.component.scss']
})
export class AppJobComponent implements OnInit, AfterViewInit {

    @ViewChild('jobModal') jobModal;
    @Input() job: JsonJobSummary;

    // selectedJob: JsonJob;
    selectedJob: JsonJobSummary;
    currentUser: JsonUser;
    allAplicants: any[] = [];

    constructor(private dialogBox: MatDialog,
                private jobService: AppJobsService,
                private profileService: ProfileService,
                private authService: AuthService,
                private router: Router) {
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

    onJobClick(job: JsonJob) {
        // this.jobService.getJobHttp(job).subscribe((jobResponse: JsonJob) => {
        //     this.selectedJob = jobResponse;
        // });
        this.selectedJob = job;
        this.dialogBox.open(this.jobModal, {
            width: '400px'
        });
        this.getAllaplicationsForJob(this.selectedJob.uuid);
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

    ngAfterViewInit(): void {

    }

    onSelectedUserForJob(checkbox) {
        checkbox.source.deselectAll();
        checkbox.option.selected = true;
    }

    submitApplicant(userSelection) {
        console.log(userSelection.selectedOptions.selected[0].value);
    }
    getAllaplicationsForJob(jobUUID) {
        this.jobService.getJobApplications(jobUUID).subscribe(jobApplications => {
            this.allAplicants = jobApplications;
        });
    }
}
