import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAsociadosComponent } from './tickets-asociados.component';

describe('TicketsAsociadosComponent', () => {
  let component: TicketsAsociadosComponent;
  let fixture: ComponentFixture<TicketsAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsAsociadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
