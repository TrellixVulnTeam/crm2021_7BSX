import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionEvtgcComponent } from './resolucion-evtgc.component';

describe('ResolucionEvtgcComponent', () => {
  let component: ResolucionEvtgcComponent;
  let fixture: ComponentFixture<ResolucionEvtgcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolucionEvtgcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucionEvtgcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
