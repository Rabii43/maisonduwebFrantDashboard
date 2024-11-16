import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterditesComponent } from './interdites.component';

describe('InterditesComponent', () => {
  let component: InterditesComponent;
  let fixture: ComponentFixture<InterditesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterditesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterditesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
