import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesOtecnicasComponent } from './detalles-otecnicas.component';

describe('DetallesOtecnicasComponent', () => {
  let component: DetallesOtecnicasComponent;
  let fixture: ComponentFixture<DetallesOtecnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesOtecnicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesOtecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
