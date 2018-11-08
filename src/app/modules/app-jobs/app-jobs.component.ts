import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ProfileService} from '../../shared/services/profile.service';

@Component({
    selector: 'app-app-jobs',
    templateUrl: './app-jobs.component.html',
    styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

    onCreateJob() {
        this.router.navigate(['create'], {relativeTo: this.activatedRoute});
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

}
