import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommentsClassificationComponent } from './all-comments-classification.component';

describe('AllCommentsClassificationComponent', () => {
  let component: AllCommentsClassificationComponent;
  let fixture: ComponentFixture<AllCommentsClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCommentsClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommentsClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
