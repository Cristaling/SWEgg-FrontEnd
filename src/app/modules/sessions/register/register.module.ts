import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterService} from './register.service';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {MatFormFieldModule, MatDatepickerModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ],
    declarations: [RegisterComponent],
    providers: [RegisterService]
})
export class RegisterModule {
}
