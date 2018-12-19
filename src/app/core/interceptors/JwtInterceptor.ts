import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }
        return this.router.url === '/sessions/login' ? next.handle(request) : next.handle(request).pipe(catchError((error, caught) => {
            this.handleAuthError(error);
            return of(error);
        }) as any);
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.router.navigate([`/sessions/login`]);
            return of(err.message);
        }
        throw error;
    }
}
