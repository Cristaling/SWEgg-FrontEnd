import {NotificationsService} from './services/notifications.service';
import {NgModule} from '@angular/core';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
    imports: [
        MatSnackBarModule
    ],
    providers: [NotificationsService]
})
export class SharedModule {

}
