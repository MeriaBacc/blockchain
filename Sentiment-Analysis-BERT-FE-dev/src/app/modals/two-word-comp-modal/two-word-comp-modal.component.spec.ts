import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWordCompModalComponent } from './two-word-comp-modal.component';

describe('TwoWordCompModalComponent', () => {
  let component: TwoWordCompModalComponent;
  let fixture: ComponentFixture<TwoWordCompModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoWordCompModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWordCompModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
