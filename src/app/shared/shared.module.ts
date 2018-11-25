import { AbilitySelectorService } from './helpers/ability-selector/ability-selector.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule, MatDatepickerModule,
    MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule, MatToolbarModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AbilitySelectorComponent } from './helpers/ability-selector/ability-selector.component';

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
        MatChipsModule
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
        AbilitySelectorComponent
    ],
    declarations: [AbilitySelectorComponent],
    providers: [AbilitySelectorService]
})
export class SharedModule {

}
