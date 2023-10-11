import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDisciplinaComponent } from './add-edit-disciplina.component';

describe('AddEditDisciplinaComponent', () => {
  let component: AddEditDisciplinaComponent;
  let fixture: ComponentFixture<AddEditDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDisciplinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
