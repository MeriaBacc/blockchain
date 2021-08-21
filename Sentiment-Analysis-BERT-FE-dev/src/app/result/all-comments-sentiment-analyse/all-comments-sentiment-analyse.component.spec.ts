import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommentsSentimentAnalyseComponent } from './all-comments-sentiment-analyse.component';

describe('AllCommentsSentimentAnalyseComponent', () => {
  let component: AllCommentsSentimentAnalyseComponent;
  let fixture: ComponentFixture<AllCommentsSentimentAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCommentsSentimentAnalyseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommentsSentimentAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
