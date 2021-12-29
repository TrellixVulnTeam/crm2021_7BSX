import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualMdComponent } from './manual-md.component';

describe('ManualMdComponent', () => {
  let component: ManualMdComponent;
  let fixture: ComponentFixture<ManualMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualMdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
