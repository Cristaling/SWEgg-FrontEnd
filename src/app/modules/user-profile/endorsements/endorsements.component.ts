import { EndorsementsService } from './endorsements.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { startWith, map, takeUntil, take } from 'rxjs/operators';
import { pipe, Subject } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { JsonUserData } from '../../../shared/models/JsonUserData';
import { AuthService } from '../../../core/authentication/auth.service';
import { SocketManagerService } from '../../../shared/services/socket-manager.service';
import { Message } from '@stomp/stompjs';

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
        private authService: AuthService,
        private socketService: SocketManagerService) { }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.loadUserEndorsements();

        this.socketService.subscribeSecured('/endorsement/add').pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe((message: Message) => {
                const body: any = JSON.parse(message.body);
                const ability: string = body.ability;
                const email: string = body.email;
                if (email === this.currentUser.email) {
                    return;
                }
                for (const endorsement of this.endorsements) {
                    if (endorsement.ability === ability) {
                        endorsement.emails.push(email);
                    }
                }
            });
        this.socketService.subscribeSecured('/endorsement/delete').pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe((message: Message) => {
                const body: any = JSON.parse(message.body);
                const ability: string = body.ability;
                const email: string = body.email;
                for (const endorsement of this.endorsements) {
                    if (endorsement.ability === ability) {
                        const index = endorsement.emails.indexOf(email, 0);
                        if (index > -1) {
                            endorsement.emails.splice(index, 1);
                        }
                    }
                }
            });
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
            if (!this.abilityAlreadyExists(ability)) {
                this.endorsementsService.toggleEndorsementHttp(ability, this.userEmail)
                    .pipe(takeUntil(this.navigateToOtherComponent))
                    .subscribe(response => {
                        this.loadUserEndorsements();
                    });
            }
        }
    }

    abilityAlreadyExists(ability) {
        for (const endorsement of this.endorsements) {
            if (endorsement.ability === ability) {
                return true;
            }
        }
        return false;
    }

}
