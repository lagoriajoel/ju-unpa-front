import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTorneosComponent } from './add-edit-torneos.component';

describe('AddEditTorneosComponent', () => {
  let component: AddEditTorneosComponent;
  let fixture: ComponentFixture<AddEditTorneosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTorneosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTorneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
