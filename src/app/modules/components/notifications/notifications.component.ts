import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @Input() notifications: any[];
  @Input() unreadCount;
  private navigateToOtherComponent: Subject<any> = new Subject();

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {

  }

  hideNotifications() {
    this.notificationsService.toggleNotifications.next();
  }
  markAsRead(notification) {
    if (notification.read) {
      return;
    }
    this.notificationsService.markRead(notification.uuid).pipe(takeUntil(this.navigateToOtherComponent))
          .subscribe(response => {
            notification.read = true;
            this.unreadCount.value--;
          });
  }
  markAllAsRead() {
    this.unreadCount.value = 0;
    for (let notification of this.notifications) {
      if (!notification.read) {
        this.notificationsService.markRead(notification.uuid).pipe(takeUntil(this.navigateToOtherComponent))
          .subscribe(response => {
          });
        notification.read = true;
      }
    }
  }

}
