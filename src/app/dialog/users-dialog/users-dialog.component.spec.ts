import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDialogComponent } from './users-dialog.component';

describe('FormCategoriesComponent', () => {
  let component: UsersDialogComponent;
  let fixture: ComponentFixture<UsersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
