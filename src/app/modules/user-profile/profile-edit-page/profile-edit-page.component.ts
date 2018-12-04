import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonUserData } from 'src/app/shared/models/JsonUserData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { CustomValidators } from 'src/app/shared/helpers/custom-form-validators';
import { ImageValidator } from 'src/app/shared/helpers/image-validator';
import { UserProfileService } from '../user-profile.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();

    profileForm: FormGroup;

    selectedFile: File;
    validSelectedFile = true;
    localUrl: any;

    currentUser: JsonUserData;

    constructor(private authService: AuthService,
        private userProfileService: UserProfileService,
        private notificationService: NotificationsService) { }

    ngOnInit() {
        this.initForms();
    }

    initForms() {
        this.currentUser = this.authService.getCurrentUser();

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
        let date = null;
        if (this.currentUser.birthDate != null) {
            date = this.currentUser.birthDate.toString().split('T')[0];
        }
        this.profileForm.patchValue({'firstName': this.currentUser.firstName});
        this.profileForm.patchValue({'lastName': this.currentUser.lastName});
        if (date != null) {
            this.profileForm.patchValue({'birthDate': new Date(date)});
        }
        this.profileForm.patchValue({'town': this.currentUser.town});
        this.profileForm.patchValue({'email': this.currentUser.email});
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

        this.userProfileService.changeUserDataHttp(userData)
            .pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                if (this.selectedFile && this.validSelectedFile) {

                    this.userProfileService.postProfileImage(this.selectedFile, this.currentUser.email)
                        .pipe(takeUntil(this.navigateToOtherComponent))
                        .subscribe(image => {
                            this.notificationService.showPopupMessage('Profile data was updated successfully !', 'OK');
                            this.authService.saveProfilePicture(image);
                            this.notificationService.updateProfileImageEvent.next(image);
                        }, error1 =>
                            this.notificationService.showPopupMessage('An error occured on saving image !', 'OK')
                        );

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

    onFileChanged(event) {
        const reader = new FileReader();
        // tslint:disable-next-line:no-shadowed-variable
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
