import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './modules/layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'sessions',
        loadChildren: './modules/sessions/sessions.module#SessionsModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
