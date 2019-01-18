import { Injectable } from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class SocketManagerService {

  constructor(private rxStompService: RxStompService) { }

  subscribeUnsecured(email: string, endpoint: string, callback: any) {
      console.log('Listening on endpoint: /events/' + email + endpoint);
      this.rxStompService.watch('/events/' + email + endpoint).subscribe((message: Message) => {
          console.log('/events/' + email + endpoint + ': ' + message.body);
          callback(message);
      });
  }

    subscribeSecured(endpoint: string, callback: any) {
      // TODO Replace email with token
      console.log('Listening on endpoint: /events/' + 'email' + endpoint);
      this.rxStompService.watch('/events/' + 'email' + endpoint).subscribe((message: Message) => {
            console.log('/events/' + 'email' + endpoint + ': ' + message.body);
            callback(message);
        });
    }

}
