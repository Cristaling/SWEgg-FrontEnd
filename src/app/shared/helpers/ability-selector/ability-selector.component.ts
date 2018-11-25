import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import { CommonModule } from '@angular/common';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AbilitySelectorService } from './ability-selector.service';

@Component({
  selector: 'app-ability-selector',
  templateUrl: './ability-selector.component.html',
  styleUrls: ['./ability-selector.component.scss']
})
export class AbilitySelectorComponent implements OnInit {

    private navigateToOtherComponent: Subject<any> = new Subject();

    filteredAbilities: Observable<string[]>;

    @Input() selectedAbilities: string[];
    abilities: string[] = [];

    abilityCtrl = new FormControl();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('abilityInput') abilityInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(private abilitySelectorService: AbilitySelectorService) {
        this.filteredAbilities = this.abilityCtrl.valueChanges.pipe(
            startWith(null),
            map((ability: string | null) => ability ? this._filter(ability) : this.abilities.slice()));
        this.loadAbilities();
    }

    ngOnInit() {
        this.loadAbilities();
    }

    loadAbilities() {
        this.abilitySelectorService.getAbilitiesHttp()
            .pipe(takeUntil(this.navigateToOtherComponent))
            .subscribe(response => {
                console.log(response);
                this.abilities = response;
            });
    }

    add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            // Add our ability
            if ((value || '').trim()) {
                this.selectedAbilities.push(value.trim());
            }

            // Reset the input value
            if (input) {
                input.value = '';
            }

            this.abilityCtrl.setValue(null);
        }
    }

    remove(fruit: string): void {
        const index = this.selectedAbilities.indexOf(fruit);

        if (index >= 0) {
            this.selectedAbilities.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.selectedAbilities.push(event.option.viewValue);
        this.abilityInput.nativeElement.value = '';
        this.abilityCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.abilities.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

}
