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
import {ImageValidator} from '../../shared/helpers/image-validator';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    securityForm: FormGroup;
    profileForm: FormGroup;

    selectedFile: File;
    validSelectedFile = true;
    localUrl: any;
    currentUser: JsonUserData;

    constructor(
        private authService: AuthService,
        private userProfileService: UserProfileService,
        private notificationService: NotificationsService) {
    }

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

        this.profileForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            birthDate: new FormControl('', [CustomValidators.dateValidator]),
            town: new FormControl(''),
            email: new FormControl({value: '', disabled: true})
        });

        this.showProfileData();
    }

    showProfileData() {
        const user: JsonUserData = this.authService.getCurrentUser();
        let date = null;
        if(user.birthDate != null) {
            date = user.birthDate.toString().split('T')[0];
        }
        this.profileForm.patchValue({'firstName': user.firstName});
        this.profileForm.patchValue({'lastName': user.lastName});
        if(date != null) {
            this.profileForm.patchValue({'birthDate': new Date(date)});
        }
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
            email: this.currentUser.email
        };
        this.userProfileService.changeUserDataHttp(userData).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
                if (this.selectedFile && this.validSelectedFile) {
                    this.userProfileService.postProfileImage(this.selectedFile, this.currentUser.email).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(image => {
                        this.notificationService.showPopupMessage('Profile data was updated successfully !', 'OK');
                        this.notificationService.updateProfileImageEvent.next(image);
                    }, error1 =>
                        this.notificationService.showPopupMessage('An error occured on saving image !', 'OK'));
                } else {
                    this.notificationService.showPopupMessage('Your profile data was successfully changed !', 'OK');
                }
                this.notificationService.userDataChangedEvent.next(response);
                this.authService.setCurrentUser(response);
            }, error1 => {
                this.notificationService.showPopupMessage('An error occurred on saving data!', 'OK');
            }
        );
    }

    onChangeSecurity() {
        const formValues = this.securityForm.value;
        const currentPassword = SecurityHelper.hashPassword(formValues.currentPassword).toString();
        const newPassword = SecurityHelper.hashPassword(formValues.password).toString();
        this.userProfileService.changePasswordHttp(currentPassword, newPassword).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.notificationService.showPopupMessage('Password was successfully changed !', 'OK');
        });
    }

    onFileChanged(event) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.selectedFile = event.target.files[0];
        this.validSelectedFile = ImageValidator.validateImageFile(this.selectedFile);
    }

    ngOnDestroy(): void {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
