import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbTipsModalComponent } from './fb-tips-modal.component';

describe('FbTipsModalComponent', () => {
  let component: FbTipsModalComponent;
  let fixture: ComponentFixture<FbTipsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbTipsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbTipsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
