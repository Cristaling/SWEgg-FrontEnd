import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SocketManagerService {

    token;
    constructor(private rxStompService: RxStompService,
        private authService: AuthService) {
            this.token = authService.getToken();
         }


    subscribeSecured(endpoint: string) {
        // TODO Replace email with token
        console.log('Listening on endpoint:' + endpoint);
        return this.rxStompService.watch(`/events/${this.token}${endpoint}`);
    }

}
