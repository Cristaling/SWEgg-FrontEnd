import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {RegisterService} from './register.service';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../../core/authentication/auth.service';
import {CustomValidators} from '../../../shared/helpers/custom-form-validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    registerForm: FormGroup;

    constructor(
        private router: Router,
        private registerService: RegisterService,
        private notificationService: NotificationsService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.authService.logout();
        this.initForms();
    }

    /**
     * Initialize component's forms
     */
    initForms(): any {
        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            birthDate: new FormControl('', CustomValidators.dateValidator),
            town: new FormControl(''),
        }, [CustomValidators.confirmPassword]);
    }

    onRegister() {
        const register = this.registerForm.value;
        this.registerService.registerUserHttp(register.email, register.password, register.firstName, register.lastName, register.birthDate, register.town).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.notificationService.showPopupMessage('Your account was successfully created !', 'OK');
            this.router.navigate(['../login'], {relativeTo: this.activatedRoute});
            }, (error) => {
            if (error.status === 409) {
                this.notificationService.showPopupMessage('Email already exists', 'FAIL');
            }
        });
    }

    backToLogin() {
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute});
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
