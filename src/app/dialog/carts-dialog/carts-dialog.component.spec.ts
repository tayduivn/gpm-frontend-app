import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsDialogComponent } from './carts-dialog.component';

describe('FormCategoriesComponent', () => {
  let component: CartsDialogComponent;
  let fixture: ComponentFixture<CartsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
