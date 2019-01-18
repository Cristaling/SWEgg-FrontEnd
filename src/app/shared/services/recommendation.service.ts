import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/authentication/auth.service';
import {Observable} from 'rxjs';
import {HttpParams} from '../../../../node_modules/@angular/common/http';
import {urls} from '../config/urls';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService) {
    }


    getUsersRecomended(): Observable<any> {
        const params = new HttpParams().set('token', this.authService.getToken());
        return this.httpClient.get(urls.ussersRecomendedToYou, {params: params});
    }
}
