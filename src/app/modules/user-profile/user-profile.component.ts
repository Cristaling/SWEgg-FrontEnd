import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/helpers/custom-form-validators';
import {AuthService} from '../../core/authentication/auth.service';
import {JsonUserData} from '../../shared/models/JsonUserData';
import {UserProfileService} from './user-profile.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SecurityHelper} from '../../shared/helpers/security-helper';
import {NotificationsService} from '../../shared/services/notifications.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    securityForm: FormGroup;
    profileForm: FormGroup;

    constructor(
        private authService: AuthService,
        private userProfileService: UserProfileService,
        private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.initForms();
    }

    initForms() {
        this.securityForm = new FormGroup({
            currentPassword: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required)
        }, CustomValidators.confirmPassword);

        this.profileForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            birthDate: new FormControl('', [Validators.required, CustomValidators.dateValidator]),
            town: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });

        this.showProfileData();
    }

    showProfileData() {
        const user: JsonUserData = this.authService.getCurrentUser();
        const date = user.birthDate.toString().split('T')[0];
        this.profileForm.patchValue({'firstName': user.firstName});
        this.profileForm.patchValue({'lastName': user.lastName});
        this.profileForm.patchValue({'birthDate': new Date(date)});
        this.profileForm.patchValue({'town': user.town});
        this.profileForm.patchValue({'email': user.email});
    }
    onChangeUserData() {
        const formValues = this.profileForm.value;
        const userData: JsonUserData = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            birthDate: formValues.birthDate,
            town: formValues.town,
            email: formValues.email
        };
        this.userProfileService.changeUserDataHttp(userData).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.notificationService.showPopupMessage('Your profile data was successfully changed !', 'OK');
            this.notificationService.userDataChangedEvent.next(userData);
        });
    }

    onChangeSecurity() {
        const formValues = this.securityForm.value;
        const currentPassword = SecurityHelper.hashPassword(formValues.currentPassword).toString();
        const newPassword = SecurityHelper.hashPassword(formValues.password).toString();
        this.userProfileService.changePasswordHttp(currentPassword, newPassword).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.notificationService.showPopupMessage('Password was successfully changed !', 'OK');
        });
    }

    ngOnDestroy(): void {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
