import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrjectModalComponent } from './create-prject-modal.component';

describe('CreatePrjectModalComponent', () => {
  let component: CreatePrjectModalComponent;
  let fixture: ComponentFixture<CreatePrjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrjectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
