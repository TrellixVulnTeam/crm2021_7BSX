import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosAsociadosComponent } from './eventos-asociados.component';

describe('EventosAsociadosComponent', () => {
  let component: EventosAsociadosComponent;
  let fixture: ComponentFixture<EventosAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosAsociadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
