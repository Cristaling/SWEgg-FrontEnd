import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {JsonUserData} from '../models/JsonUserData';
import {HttpClient, HttpParams} from '@angular/common/http';
import {urls} from '../config/urls';

@Injectable()
export class NotificationsService {
    userDataChangedEvent: Subject<JsonUserData> = new Subject<JsonUserData>();
    updateProfileImageEvent: Subject<any> = new Subject<any>();
    toggleNotifications: Subject<any> = new Subject<any>();
    jobStatusesModified: Subject<any> = new Subject<any>();
    changeProfilePage: Subject<any> = new Subject<any>();
    viewUserProfile: Subject<any> = new Subject<any>();
    markAllAsRead: Subject<any> = new Subject<any>();

    constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {
    }

    showPopupMessage(message: string, confirmation: string) {
        this.snackBar.open(message, confirmation, {
            duration: 2000
        });
    }

    getUnreadNotification(): Observable<any> {
        return this.httpClient.get(urls.getUnreadNotificationsUrl);
    }

    markRead(uuid: string): Observable<any> {
        const params = new HttpParams().set('uuid', uuid);
        return this.httpClient.get(urls.markAsReadUrl, {params: params})
    }
}
