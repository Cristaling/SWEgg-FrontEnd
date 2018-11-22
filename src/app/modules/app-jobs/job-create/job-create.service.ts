import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../../shared/config/urls';
import {JobType} from '../../../shared/models/JobType';


@Injectable()
export class JobCreateService implements OnInit {

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
    }

    /**
     * Request to create Job
     * @param jobType,jobStatus,title,description
     * @returns {Observable<any>}
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

    getJobTypesHttp(): Observable<any> {
        return this.httpClient.get(urls.jobTypesUrl);
    }
}
