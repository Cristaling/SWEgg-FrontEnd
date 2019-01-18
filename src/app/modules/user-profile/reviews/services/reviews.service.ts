import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewSummary} from '../../../../shared/models/ReviewSummary';
import {urls} from '../../../../shared/config/urls';
import {Review} from '../../../../shared/models/Review';

@Injectable()
export class ReviewsService {

    constructor(private httpClient: HttpClient) {
    }

    getUserReviews(email: string): Observable<any> {
        const params = new HttpParams().set('email', email);
        return this.httpClient.get<ReviewSummary[]>(urls.userReviews, {params: params});
    }

    addUserReview(review: Review): Observable<any> {
        return this.httpClient.post(urls.userReviews, {reviewedEmail: review.reviewedEmail, text: review.text, stars: review.stars});
    }
}
