import {Injectable} from '@angular/core';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {JsonJob} from '../../shared/models/JsonJob';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {urls} from '../../shared/config/urls';
import {Observable} from 'rxjs';

@Injectable()
export class AppJobsService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Creates a job
     * @param {string} jobType
     * @param {string} jobStatus
     * @param {string} title
     * @param {string} description
     * @returns {Observable<any>}
     */
    createJobHttp(jobType: string, jobStatus: string, title: string, description: string): Observable<any> {
        const jobAddRequest: JsonJob = {
            'jobType': jobType,
            'jobStatus': jobStatus,
            'title': title,
            'description': description
        };
        return this.httpClient.post(urls.jobUrl, jobAddRequest);
    }

    /**
     * Get all summaries for jobs
     * @returns {Observable<any>}
     */
    public getJobsHttp(page: number, count: number): Observable<any> {
        const params = new HttpParams().set('page', String(page)).set('count', String(count));
        return this.httpClient.get(urls.getJobSummaries, {params: params});
    }

    /**
     * Get one job
     * @param {string} uuid
     * @returns {JsonJob}
     */
    public getJobHttp(uuid: string): Observable<any> {
        return this.httpClient.get(urls.jobUrl);
    }
}