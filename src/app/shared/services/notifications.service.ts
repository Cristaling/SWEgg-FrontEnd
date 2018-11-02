import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonUserData} from '../models/JsonUserData';

@Injectable()
export class NotificationsService {
    userDataChangedEvent: Subject<JsonUserData> = new Subject<JsonUserData>();

    constructor(private snackBar: MatSnackBar) {
    }

    showPopupMessage(message: string, confirmation: string) {
        this.snackBar.open(message, confirmation, {
            duration: 2000
        });
    }
}
