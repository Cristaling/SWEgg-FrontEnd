import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {AuthService} from '../../../core/authentication/auth.service';
import {NotificationsService} from '../../../shared/services/notifications.service';
import {Subject} from 'rxjs';
import {ProfileService} from '../../../shared/services/profile.service';
import {takeUntil} from 'rxjs/operators';
import {JsonUserData} from '../../../shared/models/JsonUserData';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  //destroy all subscriptions when component is destroyed

    loginForm: FormGroup;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private authService: AuthService,
        private notificationService: NotificationsService,
        private profileService: ProfileService,
        private activatedRoute: ActivatedRoute
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
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    /**
     * Method to login the user
     */
    onLogin() {
        const values = this.loginForm.value;
        this.loginService.loginUserHttp(values.username, values.password).pipe(takeUntil(this.navigateToOtherComponent)).subscribe(response => {
            this.authService.setToken(response.token);
            this.profileService.getProfile(values.username).pipe(takeUntil(this.navigateToOtherComponent)).subscribe((userResponse: JsonUserData) => {
                this.authService.setCurrentUser(userResponse);
                this.router.navigate(['/dashboard']);
            });
        }, (error) => {
            if (error.status === 401) {
                this.notificationService.showPopupMessage('User and password are incorrect !', 'OK');
            }
        });
    }
    onRegister(){
        this.router.navigate(['../register'], {relativeTo: this.activatedRoute});
    }
    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
