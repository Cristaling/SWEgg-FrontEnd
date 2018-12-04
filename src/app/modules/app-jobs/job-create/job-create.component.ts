import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {JobType} from '../../../shared/models/JobType';
import {AppJobsService} from '../app-jobs.service';

@Component({
    selector: 'app-job-create',
    templateUrl: './job-create.component.html',
    styleUrls: ['./job-create.component.scss']
})
export class JobCreateComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed
    jobCreateForm: FormGroup;
    jobTypeSelected: JobType;

    jobTypes: JobType[];

    constructor(
        private router: Router,
        private appJobsService: AppJobsService,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationsService
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
        this.appJobsService.createJobHttp(this.jobTypeSelected.value.toLocaleUpperCase(), jobStatus, values.jobTitle, values.jobDescription)
            .pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            if (jobStatus === 'INVITED') {
                this.notificationService.showPopupMessage('Not implemented!', 'OK');
            } else {
                this.notificationService.showPopupMessage('Your job was saved successfully !', 'OK');
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            }
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
}
