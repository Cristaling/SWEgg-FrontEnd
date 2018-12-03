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
}
