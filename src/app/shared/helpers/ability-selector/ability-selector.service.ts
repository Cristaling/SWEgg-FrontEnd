import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from '../../config/urls';

@Injectable()
export class AbilitySelectorService {

  constructor(private httpClient: HttpClient) { }

    /**
     * Request abilities
     * @returns {Observable<any>} 401 unauthorized if credentials are invalid, token if is valid
     */
    getAbilitiesHttp(): Observable<any> {
        return this.httpClient.get(urls.abilitiesUrl);
    }

}
