import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {urls} from '../../../shared/config/urls';
import {Md5} from 'ts-md5';
import {HttpClient} from '@angular/common/http';
import {SecurityHelper} from '../../../shared/helpers/security-helper';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private httpClient: HttpClient) {
    }


    registerUserHttp(email: string, password: string, firstName: string, lastName: string, birthDate: Date, town: string): Observable<any> {
        const hashedPassword = SecurityHelper.hashPassword(password);
        const registerModel = {
                'email': email,
                'password': hashedPassword,
                'firstName': firstName,
                'lastName': lastName,
                'birthDate': birthDate,
                'town': town,
            };
        return this.httpClient.post(urls.registerUserUrl, registerModel);
    }
}
