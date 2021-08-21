import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPackageComponent } from './our-package.component';

describe('OurPackageComponent', () => {
  let component: OurPackageComponent;
  let fixture: ComponentFixture<OurPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
