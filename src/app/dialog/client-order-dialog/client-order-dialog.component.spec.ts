import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderDialogComponent } from './client-order-dialog.component';

describe('ClientOrderDialogComponent', () => {
  let component: ClientOrderDialogComponent;
  let fixture: ComponentFixture<ClientOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
