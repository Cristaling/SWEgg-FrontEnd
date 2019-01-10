import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReviewsComponent} from './components/review/reviews.component';
import {SharedModule} from '../../../shared/shared.module';
import {ReviewsService} from './services/reviews.service';
import { RatingComponent } from './components/rating/rating/rating.component';
@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [ReviewsComponent, RatingComponent],
    exports: [ReviewsComponent],
    providers: [ReviewsService]
})
export class ReviewsModule {
}
