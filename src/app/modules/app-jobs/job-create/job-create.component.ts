import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {JobCreateService} from './job-create.service';
import {NotificationsService} from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-job-create',
    templateUrl: './job-create.component.html',
    styleUrls: ['./job-create.component.scss']
})
export class JobCreateComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed
    jobCreateForm: FormGroup;

    constructor(
        private router: Router,
        private jobCreateService: JobCreateService,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationsService
    ) {
    }

    ngOnInit() {
        this.initForms();
    }

    initForms(): any {
        this.jobCreateForm = new FormGroup({
            jobType: new FormControl('', Validators.required),
            jobTitle: new FormControl('', Validators.required),
            jobDescription: new FormControl('', Validators.required),
            isPrivate: new FormControl(''),
        });
        this.jobCreateForm.patchValue({'jobType': 'SINGLE'});
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
        this.jobCreateService.createJobHttp(values.jobType, jobStatus, values.jobTitle, values.jobDescription)
            .pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            if (jobStatus === 'INVITED') {
                this.notificationService.showPopupMessage('Not implemented!', 'OK');
            } else {
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            }
        }, (error) => {
            if (error.status === 401) {
                this.notificationService.showPopupMessage('An error occurred !', 'OK');
            }
        });
    }
}
