import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonUserData} from '../models/JsonUserData';

@Injectable()
export class NotificationsService {
    userDataChangedEvent: Subject<JsonUserData> = new Subject<JsonUserData>();
    updateProfileImageEvent: Subject<any> = new Subject<any>();
    toggleNotifications: Subject<any> = new Subject<any>();
    jobStatusesModified: Subject<any> = new Subject<any>();
    changeProfilePage: Subject<any> = new Subject<any>();
    viewUserProfile: Subject<any> = new Subject<any>();

    constructor(private snackBar: MatSnackBar) {
    }

    showPopupMessage(message: string, confirmation: string) {
        this.snackBar.open(message, confirmation, {
            duration: 2000
        });
    }
}
