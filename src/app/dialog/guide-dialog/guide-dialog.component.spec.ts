import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideDialogComponent } from './guide-dialog.component';

describe('FormCategoriesComponent', () => {
  let component: GuideDialogComponent;
  let fixture: ComponentFixture<GuideDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
