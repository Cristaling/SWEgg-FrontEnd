import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {JobCreateComponent} from './job-create/job-create.component';
import {ProfileService} from '../../shared/services/profile.service';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {AppJobsService} from './app-jobs.service';
import {FormControl} from '@angular/forms';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {ArrayHelper} from '../../shared/helpers/array-helper';
import {NotificationsService} from '../../shared/services/notifications.service';

@Component({
  selector: 'app-app-jobs',
  templateUrl: './app-jobs.component.html',
  styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed

    currentPage = 0;
    countPage = 8;
    allJobs: JsonJobSummary[] = [];

    finished = false;
    dialogRef: any;
    filteredTitleOptions: Observable<string[]>;
    controlSearchTitle = new FormControl();

    waitSearchTitle;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private jobsService: AppJobsService,
        private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.filteredTitleOptions = this.controlSearchTitle.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        this.getJobs();
        this.getJobStatuses();
    }

    onCreateJob() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialogRef = this.dialog.open(JobCreateComponent, dialogConfig);
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    getJobs(title?: string) {
        if (this.finished) {
            return;
        }
        this.jobsService.getJobsHttp(this.currentPage, this.countPage, title).subscribe(jobsSummaries => {
            if (jobsSummaries.length === 0 || jobsSummaries.length < this.countPage) {
                this.finished = true;
            }
            this.allJobs.push.apply(this.allJobs, jobsSummaries);
            this.currentPage += 1;
        });
    }

    onScroll() {
       this.getJobs();
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return ArrayHelper.removeDuplicates(
            this.allJobs.filter(job => job.title.toLowerCase().includes(filterValue)).map(job => job.title));
    }

    filterJobsByTitle() {
        clearTimeout(this.waitSearchTitle);
        this.waitSearchTitle = setTimeout(() => {
            this.currentPage = 0;
            this.finished = false;
            this.allJobs = [];
            this.getJobs(this.controlSearchTitle.value);
        }, 500);

        // this.allJobs = this.allJobs.filter(job => job.title.startsWith(option));
        // this.finished = true;
    }

    removeFilters() {
        this.controlSearchTitle.setValue('');
        this.currentPage = 0;
        this.finished = false;
        this.allJobs = [];
        this.getJobs();
    }

    private getJobStatuses() {
        this.jobsService.getJobStatuses().pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                this.jobsService.setJobStatuses(response);
                this.notificationService.jobStatusesModified.next();
            })
    }
}
