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
import {AuthService as SocialAuthService, GoogleLoginProvider} from 'angular-6-social-login';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    private navigateToOtherComponent: Subject<any> = new Subject();  // destroy all subscriptions when component is destroyed

    loginForm: FormGroup;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private authService: AuthService,
        private notificationService: NotificationsService,
        private profileService: ProfileService,
        private activatedRoute: ActivatedRoute,
        private socialAuthService: SocialAuthService
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
        this.loginService.loginUserHttp(values.username, values.password)
            .pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
            this.authService.setToken(response.token);
            this.profileService.getProfile(values.username)
                .pipe(takeUntil(this.navigateToOtherComponent))
                .subscribe((userResponse: JsonUserData) => {
                this.authService.setCurrentUser(userResponse);
                this.router.navigate(['/dashboard']);
            });
        }, (error) => {
            if (error.status === 401) {
                this.notificationService.showPopupMessage('User and password are incorrect !', 'OK');
            }
        });
    }

    onRegister() {
        this.router.navigate(['../register'], {relativeTo: this.activatedRoute});
    }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            // socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'linkedin') {
            // socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform + ' sign in data : ' , userData);

                this.loginService.socialLoginUserHttp(userData.idToken)
                    .pipe(takeUntil(this.navigateToOtherComponent))
                    .subscribe(response => {
                        this.authService.setToken(response.token);
                        this.profileService.getProfile(userData.email)
                            .pipe(takeUntil(this.navigateToOtherComponent))
                            .subscribe((userResponse: JsonUserData) => {
                                this.authService.setCurrentUser(userResponse);
                                this.router.navigate(['/dashboard']);
                            });
                    }, (error) => {
                        if (error.status === 401) {
                            this.notificationService.showPopupMessage('User and password are incorrect !', 'OK');
                        }
                    });
            }
        );
    }

    ngOnDestroy() {
        this.navigateToOtherComponent.next();
        this.navigateToOtherComponent.complete();
    }
}
