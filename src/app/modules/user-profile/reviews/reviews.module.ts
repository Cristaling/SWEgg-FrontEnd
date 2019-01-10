import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReviewsComponent} from './components/review/reviews.component';
import {RatingModule} from 'ngx-rating';
import {SharedModule} from '../../../shared/shared.module';
import {ReviewsService} from './services/reviews.service';
import { RatingComponent } from './components/rating/rating/rating.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        RatingModule,
        SharedModule
    ],
    declarations: [ReviewsComponent, RatingComponent],
    exports: [ReviewsComponent],
    providers: [ReviewsService]
})
export class ReviewsModule {
}
