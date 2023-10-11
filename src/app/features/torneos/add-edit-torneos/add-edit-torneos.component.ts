import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-add-edit-torneos',
  templateUrl: './add-edit-torneos.component.html',
  styleUrls: ['./add-edit-torneos.component.css']
})
export class AddEditTorneosComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  

  constructor(private _formBuilder: FormBuilder) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }
  // private _filter(fruit: string): any {
  //   throw new Error('Method not implemented.');
  // }

 ngOnInit(): void {
   
 }
 add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our fruit
  if (value) {
    this.fruits.push(value);
  }

  // Clear the input value
  event.chipInput!.clear();

  this.fruitCtrl.setValue(null);
}

remove(fruit: string): void {
  const index = this.fruits.indexOf(fruit);

  if (index >= 0) {
    this.fruits.splice(index, 1);

    this.announcer.announce(`Removed ${fruit}`);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.fruits.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
}
}
