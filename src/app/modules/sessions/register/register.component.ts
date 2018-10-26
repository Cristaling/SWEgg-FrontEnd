import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../login/login.service';
import {AuthService} from '../../../core/authentication/auth.service';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {takeUntil} from '../../../../../node_modules/rxjs/internal/operators';
import {RegisterService} from './register.service';

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
        private notificationService: NotificationsService

    ) {
    }

    ngOnInit() {
        this.initForms();
    }

    /**
     * Initialize component's forms
     */
    initForms(): any {
        this.registerForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            birthDate: new FormControl(''),
            town: new FormControl(''),

        });
    }

    /**
     * Method to login the user
     */
    onLogin() {
        // const values = this.loginForm.value;
        // this.loginService.loginUserHttp(values.username, values.password).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
        //     this.authService.setToken(response.token);
        //     this.router.navigate(['/dashboard']);
        // }, (error) => {
        //     if (error.status === 401) {
        //         this.notificationService.showPopupMessage('User and password are incorrect !', 'OK');
        //     }
        // });
    }



    onRegister() {
        const register = this.registerForm.value;
        this.registerService.registerUserHttp(register.email, register.password, register.firstName, register.lastName, register.birthDate, register.town).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.notificationService.showPopupMessage('Your account was successfully created !', 'OK');
            this.router.navigate(['/login']);
        }, (error) => {
            if (error.status === 409) {
                this.notificationService.showPopupMessage('Email already exists', 'FAIL');
            }
        });
    }

    backToLogin() {
        this.router.navigate(['/login']);
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
