import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonUserData} from '../../../../shared/models/JsonUserData';
import {Router} from '@angular/router';
import {AppJobsService} from '../../../app-jobs/app-jobs.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {RecommendationService} from '../../../../shared/services/recommendation.service';

@Component({
  selector: 'app-recommendations-tab',
  templateUrl: './recommendations-tab.component.html',
  styleUrls: ['./recommendations-tab.component.scss']
})
export class RecommendationsTabComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed
    finishedRecommendedUsers = false;
    emptyRecommendedUsers = false;
    recommendedUsers: any[] = [];
    user: JsonUserData;
    constructor(
        private router: Router,
        private jobsService: AppJobsService,
        private authService: AuthService,
        private recommendationService: RecommendationService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        if (this.finishedRecommendedUsers) {
            return;
        }
        this.getAllRecommendedUsers();
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

    getAllRecommendedUsers() {
        this.recommendationService.getUsersRecomended().subscribe(response => {
            if (this.recommendedUsers.length === 0 ) {
                this.finishedRecommendedUsers = true;
            }
            this.recommendedUsers = response;
            if (this.recommendedUsers.length === 0) {
                this.emptyRecommendedUsers = true;
            }
        });

    }

}
