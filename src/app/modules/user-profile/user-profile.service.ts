import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
        return this.httpClient.post(urls.getProfileUrl, userData);
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

    uploadeProfilePicture() {

    }

    getProfilePicture(email: string): Observable<any> {
        const params = new HttpParams().set('email', email);
        return this.httpClient.get(urls.profilePictureUrl, {params: params, responseType: 'text'});
    }
}
