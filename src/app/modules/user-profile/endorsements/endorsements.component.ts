import { EndorsementsService } from './endorsements.service';
import { Component, OnInit, Input } from '@angular/core';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { pipe, Subject } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-endorsements',
  templateUrl: './endorsements.component.html',
  styleUrls: ['./endorsements.component.scss']
})
export class EndorsementsComponent implements OnInit {

    private navigateToOtherComponent: Subject<any> = new Subject();

    @Input() userEmail: string;
    abilitiesToAdd: string[] = [];

    constructor(private endorsementsService: EndorsementsService,
        private notificationService: NotificationsService) { }

    ngOnInit() {
        this.loadUserEndorsements();
    }

    loadUserEndorsements() {

    }

    addAbilities() {
        this.endorsementsService.addAbilitiesHttp(this.abilitiesToAdd)
            .pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                this.notificationService.showPopupMessage('Password was successfully changed !', 'OK');
            });
    }

}
