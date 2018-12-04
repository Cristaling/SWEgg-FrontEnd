import {Component, Input, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {EndorsementsService} from '../endorsements.service';
import {Subject} from 'rxjs';
import {JsonUserData} from '../../../../shared/models/JsonUserData';
import {AuthService} from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-endorsement',
  templateUrl: './endorsement.component.html',
  styleUrls: ['./endorsement.component.scss']
})
export class EndorsementComponent implements OnInit {

    private navigateToOtherComponent: Subject<any> = new Subject();

    @Input() userEmail: string;
    @Input() ability: string;
    @Input() people: string[];

    currentUser: JsonUserData;

    constructor(private endorsementsService: EndorsementsService,
                private authService: AuthService) { }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
    }

    endorse() {
        const index = this.people.indexOf(this.currentUser.email);
        if (index !== -1) {
            this.people.splice(index, 1);
        } else {
            this.people.push(this.currentUser.email);
        }

        this.endorsementsService.toggleEndorsementHttp(this.ability, this.userEmail)
            .pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                // this.notificationService.showPopupMessage('Testing was successfull!', 'OK');
            });
    }

}
