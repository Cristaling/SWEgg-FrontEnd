import {JsonUser} from './JsonUser';
import {JsonJob} from './JsonJob';

export interface JsonJobApplicationAddRequest {
    /**
     *
     */
    uuid?: string;
    /**
     *
     */
    applicant?: JsonUser;

    /**
     *
     */
    job?: JsonJob;
}
