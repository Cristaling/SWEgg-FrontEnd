import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../../../shared/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
    constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  hideNotifications() {
        this.notificationsService.toggleNotifications.next();
  }

}
