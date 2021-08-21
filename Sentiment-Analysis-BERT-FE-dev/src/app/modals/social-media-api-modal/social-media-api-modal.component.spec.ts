import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaApiModalComponent } from './social-media-api-modal.component';

describe('SocialMediaApiModalComponent', () => {
  let component: SocialMediaApiModalComponent;
  let fixture: ComponentFixture<SocialMediaApiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaApiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaApiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
