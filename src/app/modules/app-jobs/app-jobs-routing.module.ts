import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppJobsComponent} from './app-jobs.component';

const routes: Routes = [
    {path: '', component: AppJobsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppJobsRoutingModule { }
