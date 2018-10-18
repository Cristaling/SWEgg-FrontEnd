import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../../shared/config/urls';


@Injectable()
export class LoginService implements OnInit {

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
    }

    /**
     * Request to login
     * @param {string} username
     * @param {string} password
     * @returns {Observable<any>} 401 unauthorized if credentials are invalid, token if is valid
     */
    loginUserHttp(username: string, password: string): Observable<any> {
        return this.httpClient.post(urls.loginUserUrl, {username, password});
    }
}
