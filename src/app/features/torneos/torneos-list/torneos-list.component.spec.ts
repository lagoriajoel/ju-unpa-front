import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneosListComponent } from './torneos-list.component';

describe('TorneosListComponent', () => {
  let component: TorneosListComponent;
  let fixture: ComponentFixture<TorneosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
