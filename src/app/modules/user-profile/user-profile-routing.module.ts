import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ProfileHandlerComponent } from './profile-handler/profile-handler.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileHandlerComponent,
    },
    {
        path: ':email',
        component: ProfileHandlerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
