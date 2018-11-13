import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppJobsComponent} from './app-jobs.component';
import {JobCreateComponent} from './job-create/job-create.component';

const routes: Routes = [
    {
        path: '',
        component: AppJobsComponent
    },
    {
        path: 'create',
        component: JobCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppJobsRoutingModule { }
