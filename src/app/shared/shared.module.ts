import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule, MatDatepickerModule, MatDialogModule,
    MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule, MatToolbarModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppJobComponent} from './modules/app-job/app-job.component';
import {AppJobModule} from './modules/app-job/app-job/app-job.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { AbilitySelectorComponent } from './components/ability-selector/ability-selector.component';
import { AbilitySelectorService } from './services/ability-selector.service';

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
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
        MatChipsModule,
        MatDialogModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule
        // AppJobModule,
    ],
    exports: [
        CommonModule,
        MatAutocompleteModule,
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
        MatChipsModule,
        AbilitySelectorComponent,
        MatDialogModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule
    ],
    declarations: [AbilitySelectorComponent],
    providers: [AbilitySelectorService, MatNativeDateModule]
})
export class SharedModule {

}
