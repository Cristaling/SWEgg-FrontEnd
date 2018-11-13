import {JsonUser} from './JsonUser';

export interface JsonJob {
    /**
     *
     */
    uuid?: string;

    /**
     *
     */
    user?: JsonUser;

    /**
     *
     */
    jobType?: string;

    /**
     *
     */
    jobStatus?: string;

    /**
     *
     */
    title?: string;

    /**
     *
     */
    description?: string;

}
