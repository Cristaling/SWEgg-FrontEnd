import {Injectable} from '@angular/core';
import {JsonJobSummary} from '../../shared/models/JsonJobSummary';
import {JsonJob} from '../../shared/models/JsonJob';

@Injectable()
export class AppJobsService {
    jobsMock: JsonJobSummary[] = [
        {
            memberName: 'Ivanov Alexandru',
            title: 'Title1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. '
        },
        {
            memberName: 'Test test',
            title: 'Title2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. '
        },
        {
            memberName: 'Test test',
            title: 'Title3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. '
        },
        {
            memberName: 'Test test',
            title: 'Title4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. '
        },
        {
            memberName: 'Test test',
            title: 'Title5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. ' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. '
        },
        {
            memberName: 'Test test',
            title: 'Title5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. '
        },
        {
            memberName: 'Test test',
            title: 'Title5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Vestibulum eleifend diam metus, in luctus diam accumsan consectetur. '
        }
    ];

    constructor() {
    }

    public getJobsHttp(): JsonJobSummary[] {
        return this.jobsMock;
    }

    public getJobHttp(uuid: string): JsonJob {
        return this.jobsMock[0];
    }
}
