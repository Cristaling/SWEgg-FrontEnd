import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {ActivatedRoute, Router} from '@angular/router';
import {AppJobsService} from '../app-jobs/app-jobs.service';
import {JsonUserData} from '../../shared/models/JsonUserData';
import {AuthService} from '../../core/authentication/auth.service';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnDestroy {

    constructor(
       ) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }


}
