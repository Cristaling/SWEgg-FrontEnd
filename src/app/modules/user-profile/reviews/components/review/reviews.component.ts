import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ReviewSummary} from '../../../../../shared/models/ReviewSummary';
import {AuthService} from '../../../../../core/authentication/auth.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ReviewsService} from '../../services/reviews.service';
import {Review} from '../../../../../shared/models/Review';
import {NotificationsService} from '../../../../../shared/services/notifications.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
    @Input() userEmail: string;
    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed
    review: Review = new Review();
    currentUser;
    reviews: ReviewSummary[] = [
        {
            uuid: 'a',
            reviewerEmail: 'squishymaster12@gmail.com',
            reviewerLastName: 'fodor',
            reviewerFirstName: 'ciprian',
            stars: 4,
            text: 'blanao',
            dateGiven: new Date()
        }
    ];

    constructor(private authService: AuthService,
                private router: Router,
                private reviewsService: ReviewsService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.reviewsService.getUserReviews(this.userEmail).pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(reviews => {
            this.reviews.push(...reviews);
        });
    }

    getProfilePicture(email: string) {
        return this.authService.getProfilePicture(email);
    }

    goToProfile(email: string) {
        this.router.navigate([`/user-profile/${email}`]);
    }

    addReview() {

        if (!this.review.stars) {
            this.notificationService.showPopupMessage('Rating must be set!', 'OK');
            return;
        }
        this.review.reviewedEmail = this.userEmail;
        this.reviewsService.addUserReview(this.review).pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(
                response => {
                    const item = this.reviews.find((review) =>
                        review.uuid === response.uuid
                    );
                    if (item) {
                        const index = this.reviews.indexOf(item);
                        this.reviews.splice(index, 1);
                        this.reviews.splice(0, 0, response);
                    } else {
                        const items = this.reviews.splice(this.reviews.length - 1, 1);
                        this.reviews.splice(0, 0, response);
                    }
                },
                (err) => {
                     this.notificationService.showPopupMessage('The user must have work for at least one job for you', 'OK');
                });
    }

    ngOnDestroy() {
        this.reviews = [];
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
