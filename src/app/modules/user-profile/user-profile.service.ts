import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {JsonUserData} from '../../shared/models/JsonUserData';
import {urls} from '../../shared/config/urls';
import {Observable} from 'rxjs';

@Injectable()
export class UserProfileService {
    constructor(private httpClient: HttpClient) {}

    /**
     * Change user data profile
     */
    changeUserDataHttp(userData: JsonUserData): Observable<any> {
        return this.httpClient.put(urls.userUrl, userData);
    }

    /**
     * Change account password
     */
    changePasswordHttp(currentPassword: string, newPassword: string): Observable<any> {
        const passwordJson = {
            'currentPassword': currentPassword,
            'newPassword': newPassword
        };
        return this.httpClient.post(urls.changePasswordUrl, passwordJson);
    }

    postProfileImage(file: File, email: string): Observable<any> {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);

        return this.httpClient.patch(urls.userUrl, formData, {responseType: 'text'});
    }

    searchForUser(name): Observable<any> {
        const params = new HttpParams().set('name', name);
        return this.httpClient.get(urls.searchUserUrl, {params: params});
    }
}
