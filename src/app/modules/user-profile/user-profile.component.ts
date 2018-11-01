import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/helpers/custom-form-validators';
import {AuthService} from '../../core/authentication/auth.service';
import {JsonUserData} from '../../shared/models/JsonUserData';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    securityForm: FormGroup;
    profileForm: FormGroup;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.initForms();
    }

    initForms() {
        this.securityForm = new FormGroup({
            currentPassword: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email])
        }, CustomValidators.confirmPassword);

        this.profileForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            birthDate: new FormControl('', [Validators.required, CustomValidators.dateValidator]),
            town: new FormControl('', [Validators.required])
        });

        this.showProfileData();
    }

    showProfileData() {
        const user: JsonUserData = this.authService.getCurrentUser();
        this.profileForm.patchValue({'firstName': user.firstName});
        this.profileForm.patchValue({'lastName': user.lastName});
        this.profileForm.patchValue({'birthDate': user.birthDate});
        this.profileForm.patchValue({'town': user.town});
        this.securityForm.patchValue({'email': user.email});
    }
}
