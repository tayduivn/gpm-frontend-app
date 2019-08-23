import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentDialogComponent } from './client-payment-dialog.component';

describe('PaymentDialogComponent', () => {
  let component: ClientPaymentDialogComponent;
  let fixture: ComponentFixture<ClientPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
