import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../../shared/config/urls';


@Injectable()
export class JobCreateService implements OnInit {

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
    }

    /**
     * Request to login
     * @param email
     * @param {string} password
     * @returns {Observable<any>} 401 unauthorized if credentials are invalid, token if is valid
     */
    createJobHttp(jobType: string, jobStatus: string, title: string, description: string): Observable<any> {
        const jobAddRequest = {
            'jobType': jobType,
            'jobStatus': jobStatus,
            'title': title,
            'description': description
        };
        return this.httpClient.post(urls.jobCreateUrl, jobAddRequest);
    }
}
