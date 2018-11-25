import { FlexLayoutModule } from '@angular/flex-layout';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule, MatDatepickerModule, MatDialogModule,
    MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule, MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppJobComponent} from './modules/app-job/app-job.component';
import {AppJobModule} from './modules/app-job/app-job/app-job.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {ScrollingModule} from '@angular/cdk-experimental/scrolling';

@NgModule({
    imports: [
        MatSnackBarModule,
        MatDividerModule,
        MatCardModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FlexLayoutModule,
        MatDialogModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule
        // AppJobModule,
    ],
    exports: [
        MatSnackBarModule,
        MatDividerModule,
        MatCardModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FlexLayoutModule,
        MatDialogModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule
    ],
    providers: [MatNativeDateModule]
})
export class SharedModule {

}
