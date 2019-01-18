import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ProfileHandlerComponent } from './profile-handler/profile-handler.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ProfileEditPageComponent} from './profile-edit-page/profile-edit-page.component';

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
