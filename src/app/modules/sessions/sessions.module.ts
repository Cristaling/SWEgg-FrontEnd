import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatDatepickerModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {RegisterComponent} from './register/register.component';
import {RegisterService} from './register/register.service';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {SessionsRoutingModule} from './sessions-routing.module';
@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        SessionsRoutingModule,

    ],
    declarations: [RegisterComponent, LoginComponent],
    providers: [RegisterService, LoginService]
})
export class SessionsModule {
}
