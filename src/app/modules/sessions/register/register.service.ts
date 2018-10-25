import {Injectable} from '@angular/core';
import {HttpClient} from '../../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../../shared/config/urls';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private httpClient: HttpClient) {
    }


    registerUserHttp(email: string, password: string, firstName: string, lastName: string, birthDate: Date, town: string): Observable<any> {
        var registerModel =
            {
                'email': email,
                'password': password,
                'firstName': firstName,
                'lastName': lastName,
                'birthDate': birthDate,
                'town': town,

            };
        return this.httpClient.post('http://localhost:8080/api/register', registerModel);
    }
}
