import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtecnicasComponent } from './otecnicas.component';

describe('OtecnicasComponent', () => {
  let component: OtecnicasComponent;
  let fixture: ComponentFixture<OtecnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtecnicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
