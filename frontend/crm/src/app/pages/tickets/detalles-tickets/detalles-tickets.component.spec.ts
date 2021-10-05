import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesTicketsComponent } from './detalles-tickets.component';

describe('DetallesTicketsComponent', () => {
  let component: DetallesTicketsComponent;
  let fixture: ComponentFixture<DetallesTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
