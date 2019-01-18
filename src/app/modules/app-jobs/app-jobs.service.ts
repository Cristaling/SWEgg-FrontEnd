import { Injectable } from '@angular/core';
import { JsonJobSummary } from '../../shared/models/JsonJobSummary';
import { JsonJob } from '../../shared/models/JsonJob';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { urls } from '../../shared/config/urls';
import { Observable } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NotificationsService} from '../../shared/services/notifications.service';

@Injectable()
export class AppJobsService {

    jobStatuses: Array<string>;

    constructor(private httpClient: HttpClient, private notificationService: NotificationsService) {
        this.getJobStatuses()
            .subscribe(response => {
                this.jobStatuses = response;
                this.notificationService.jobStatusesModified.next();
            })
    }

    /**
     * Creates a job
     * @param {string} jobType
     * @param {string} jobStatus
     * @param {string} title
     * @param {string} description
     * @param abilities
     * @returns {Observable<any>}
     */
    createJobHttp(jobType: string, jobStatus: string, title: string, description: string, abilities: string[]): Observable<any> {
        const jobAddRequest: JsonJob = {
            'jobType': jobType,
            'jobStatus': jobStatus,
            'title': title,
            'description': description,
            'abilities': abilities
        };
        return this.httpClient.post(urls.jobUrl, jobAddRequest);
    }

    /**
     * Get all summaries for jobs
     * @returns {Observable<any>}
     */
    public getJobsHttp(page: number, count: number, title?: string): Observable<any> {
        let params = new HttpParams().set('page', String(page)).set('count', String(count));
        if (title) {
            params = params.set('title', title);
        }
        return this.httpClient.get(urls.getJobSummaries, { params: params });
    }

    /**
     * Get one job
     * @param {string} uuid
     * @returns {JsonJob}
     */
    public getJobHttp(uuid: string): Observable<any> {
        const httpParams = new HttpParams().set('jobUUID', uuid);
        return this.httpClient.get(urls.jobUrl, { params: httpParams });
    }


    public getUserJobsHttp(email: string): Observable<any> {
        const params = new HttpParams().set('email', email);
        return this.httpClient.get(urls.getUserRelatedJobSummaries, { params: params });
    }


    public getInvitedJobs(): Observable<any> {
        return this.httpClient.get(urls.jobsInvites );
    }
    public getRelevantUserJobsHttp(): Observable<any> {
        return this.httpClient.get(urls.getUserRelevantJobSummaries);
    }
    getJobTypesHttp(): Observable<any> {
        return this.httpClient.get(urls.jobTypesUrl);
    }

    getJobApplications(uuid: string): Observable<any> {
        const params = new HttpParams().set('uuid', uuid);

        return this.httpClient.get(urls.getApplicationsForJob, { params: params });
    }

    applyToJob(job: JsonJob): Observable<any> {
        const uuidRequest = {
            uuid: job.uuid
        };
        return this.httpClient.post(urls.jobApplication, uuidRequest);
    }

    inviteToJob(jobUUID: string , email: string): Observable<any> {
        const inviteRequest = {
            jobUUID: jobUUID,
            email: email
        };
        return this.httpClient.post(urls.inviteOnJob, inviteRequest);
    }

    getApplicationsForJob(uuid: string): Observable<any> {
        return this.httpClient.get(`${urls.applicationsByJob}/${uuid}`);
    }

    selectEmployeeForJob(jobUUID: string, employeeEmail: string) {
        return this.httpClient.patch(urls.selectJobForEmployee, { jobUUID, email: employeeEmail });
    }

    public getOpenJobsForOwnerHttp(email: string): Observable<any> {
        const params = new HttpParams().set('email', email);

        return this.httpClient.get(urls.getOwnerJobSummaries, { params: params });
    }

    public getJobStatuses(): Observable<any> {
        return this.httpClient.get(urls.getJobStatuses);
    }

    public changeJobStatus(uuidJob: string, status: string): Observable<any> {
        return this.httpClient.patch(urls.changeStatusJob, {jobId: uuidJob, jobStatus: status});
    }

    public editJob(uuid: string, title: string, description: string): Observable<any> {

        const jobEditRequest: JsonJob = {
            'title': title,
            'description': description,
        };
        return this.httpClient.patch(`${urls.jobUrl}/${uuid}`, jobEditRequest);
    }

    public setJobStatuses(jobStatuses: Array<string>) {
        this.jobStatuses = jobStatuses;
    }

    public getJobStatusesField() {
        return this.jobStatuses;
    }
}
