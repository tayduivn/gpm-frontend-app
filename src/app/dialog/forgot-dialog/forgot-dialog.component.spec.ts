import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotDialogComponent } from './forgot-dialog.component';

describe('ForgotComponent', () => {
  let component: ForgotDialogComponent;
  let fixture: ComponentFixture<ForgotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
