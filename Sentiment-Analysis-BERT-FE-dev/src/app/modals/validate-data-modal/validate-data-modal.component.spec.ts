import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDataModalComponent } from './validate-data-modal.component';

describe('ValidateDataModalComponent', () => {
  let component: ValidateDataModalComponent;
  let fixture: ComponentFixture<ValidateDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateDataModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
