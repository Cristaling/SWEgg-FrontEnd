import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationsService {
    constructor(private snackBar: MatSnackBar) {
    }

    showPopupMessage(message: string, confirmation: string) {
        this.snackBar.open(message, confirmation, {
            duration: 2000
        });
    }
}
