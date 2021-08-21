import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDataSendModalComponent } from './auto-data-send-modal.component';

describe('AutoDataSendModalComponent', () => {
  let component: AutoDataSendModalComponent;
  let fixture: ComponentFixture<AutoDataSendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDataSendModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDataSendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
