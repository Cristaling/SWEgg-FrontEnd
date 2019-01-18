import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../../shared/config/urls';

@Injectable({
    providedIn: 'root'
})
export class VerifyUserService {
    constructor(private httpClient: HttpClient) {}

    verifyUserByToken(token: string): Observable<any> {
        return this.httpClient.post(urls.verifyUser, token);
    }
}
