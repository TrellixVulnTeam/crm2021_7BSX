import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtencionComponent } from './modal-atencion.component';

describe('ModalAtencionComponent', () => {
  let component: ModalAtencionComponent;
  let fixture: ComponentFixture<ModalAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
