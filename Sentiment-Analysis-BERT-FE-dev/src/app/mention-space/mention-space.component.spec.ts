import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionSpaceComponent } from './mention-space.component';

describe('MentionSpaceComponent', () => {
  let component: MentionSpaceComponent;
  let fixture: ComponentFixture<MentionSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
