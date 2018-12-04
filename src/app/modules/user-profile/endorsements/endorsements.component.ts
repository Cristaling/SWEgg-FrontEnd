import { EndorsementsService } from './endorsements.service';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {startWith, map, takeUntil, take} from 'rxjs/operators';
import { pipe, Subject } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {JsonUserData} from '../../../shared/models/JsonUserData';
import {AuthService} from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-endorsements',
  templateUrl: './endorsements.component.html',
  styleUrls: ['./endorsements.component.scss']
})
export class EndorsementsComponent implements OnInit {

    private navigateToOtherComponent: Subject<any> = new Subject();

    @Input() userEmail: string;
    abilitiesToAdd: string[] = [];
    endorsements: any;

    currentUser: JsonUserData;

    constructor(private endorsementsService: EndorsementsService,
        private notificationService: NotificationsService,
        private authService: AuthService) { }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.loadUserEndorsements();
    }

    loadUserEndorsements() {
        this.endorsementsService.getEndorsements(this.userEmail)
            .pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                this.endorsements = response;
            });
    }

    addAbilities() {
        for (const ability of this.abilitiesToAdd) {
            this.endorsementsService.toggleEndorsementHttp(ability, this.userEmail)
                .pipe(takeUntil(this.navigateToOtherComponent))
                .subscribe(response => {
                    // this.notificationService.showPopupMessage('Testing was successfull!', 'OK');
                });
        }
    }

}
