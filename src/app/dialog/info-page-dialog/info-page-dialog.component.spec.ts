import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageDialogComponent } from './info-page-dialog.component';

describe('FormCategoriesComponent', () => {
  let component: InfoPageDialogComponent;
  let fixture: ComponentFixture<InfoPageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
