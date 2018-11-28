import { EndorsementMap } from './../../../shared/models/EndorsementMap';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/app/shared/config/urls';

@Injectable()
export class EndorsementsService {

    constructor(private httpClient: HttpClient) { }

    /**
     * Get current user profile
     * @param {string} email of user
     * @returns {Observable<EndorsementMap>}
     */
    getEndorsements(email: string): Observable<EndorsementMap> {
        const params = new HttpParams().set('email', email);
        return this.httpClient.get(urls.endorsementsUrl, {params: params});
    }

    /**
     * Add abilities
     */
    addAbilitiesHttp(abilities: string[]): Observable<any> {
        return this.httpClient.post(urls.addAbilitiesUrl, abilities);
    }

}
