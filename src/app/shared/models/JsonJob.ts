import {JsonUser} from './JsonUser';

export interface JsonJob {
    /**
     *
     */
    uuid?: string;

    /**
     *
     */
    owner?: JsonUser;

    /**
     *
     */
    employee?: JsonUser;

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
