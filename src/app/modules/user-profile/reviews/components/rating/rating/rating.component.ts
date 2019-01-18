import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Review} from '../../../../../../shared/models/Review';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
    @Input() review: any;
    @Input() disabled = false;
    inputName: string;

    ngOnInit() {
        this.inputName = this.review.uuid ? this.review.uuid : 'new-review';
    }

    onClick(stars: number): void {
        if (this.disabled) {
            return;
        }
        this.review.stars = stars;
    }
}
