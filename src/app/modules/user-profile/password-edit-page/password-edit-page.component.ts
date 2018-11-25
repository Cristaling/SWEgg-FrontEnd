import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CustomValidators } from 'src/app/shared/helpers/custom-form-validators';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { JsonUserData } from 'src/app/shared/models/JsonUserData';
import { takeUntil } from 'rxjs/operators';
import { UserProfileService } from '../user-profile.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { SecurityHelper } from 'src/app/shared/helpers/security-helper';

@Component({
  selector: 'app-password-edit-page',
  templateUrl: './password-edit-page.component.html',
  styleUrls: ['./password-edit-page.component.scss']
})
export class PasswordEditPageComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();

    securityForm: FormGroup;

    currentUser: JsonUserData;

    constructor(private authService: AuthService,
        private userProfileService: UserProfileService,
        private notificationService: NotificationsService) { }

    ngOnInit() {
        this.initForms();
    }

    initForms() {
        this.currentUser = this.authService.getCurrentUser();

        this.securityForm = new FormGroup({
            currentPassword: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required)
        }, CustomValidators.confirmPassword);
    }

    onChangeSecurity() {
        const formValues = this.securityForm.value;
        const currentPassword = SecurityHelper.hashPassword(formValues.currentPassword).toString();
        const newPassword = SecurityHelper.hashPassword(formValues.password).toString();
        this.userProfileService.changePasswordHttp(currentPassword, newPassword)
            .pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                this.notificationService.showPopupMessage('Password was successfully changed !', 'OK');
            });
    }

    ngOnDestroy(): void {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }

}
