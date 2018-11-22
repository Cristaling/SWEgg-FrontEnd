import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {JobCreateComponent} from './job-create/job-create.component';

@Component({
    selector: 'app-app-jobs',
    templateUrl: './app-jobs.component.html',
    styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    onCreateJob() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialog.open(JobCreateComponent, dialogConfig);
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

}
