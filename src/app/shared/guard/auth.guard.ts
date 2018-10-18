import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from '../../core/authentication/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
