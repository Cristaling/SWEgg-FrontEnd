import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JsonUserData} from '../models/JsonUserData';
import {urls} from '../config/urls';
import {map} from 'rxjs/operators';

@Injectable()
export class ProfileService {
    constructor(private httpClient: HttpClient) {
    }

    /**
     * Get current user profile
     */
    getProfile(email: string): Observable<JsonUserData> {
        const params = new HttpParams().set('email', email);
        return this.httpClient.get(urls.getProfileUrl, {params: params});
    }

    /**
     * Get profile picture
     * @param {string} email of user
     * @returns {Observable<any>}
     */
    getProfilePicture(email: string): Observable<any> {
        const params = new HttpParams().set('email', email);
        return this.httpClient.get(urls.profilePictureUrl, {params: params, responseType: 'text'});
    }

}
