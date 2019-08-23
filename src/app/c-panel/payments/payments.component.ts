import {Component, OnInit} from '@angular/core';
import {ModelPayment} from '../../models/model-payment';
import {PaymentApiService} from '../../services/api/payment-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments: ModelPayment;
  message = 'Loading...';
  form: FormGroup;
  isActiveTextOne = '';
  isActiveTextTwo = '';

  constructor(
    private paymentApiService: PaymentApiService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getPayments();
  }

  private getPayments() {
    this.paymentApiService.getPayments().subscribe((res: any) => {
      this.payments = res.data[0];
      this.form = this.fb.group({
        stripe_secret_token: [this.payments.stripe_secret_token, [Validators.required]],
        paypal_token: [this.payments.paypal_token, [Validators.required]],
      });
    });
  }

  sendProduction(event: any, method: string) {
    if (method === 'stripe') {
      this.form.value.production_stripe = event.target.checked ? 1 : 0;
    } else if (method === 'paypal') {
      this.form.value.production_paypal = event.target.checked ? 1 : 0;
    }
    this.send(method);
  }

  send(method = '') {
    this.paymentApiService.updatePayment(this.form.value).subscribe(() => {
      if (method === 'stripe') {
        this.isActiveTextOne = 'transaction';
        setTimeout(() => {
          this.isActiveTextOne = 'false';
        }, 1000);
      } else if (method === 'paypal') {
        this.isActiveTextTwo = 'transaction';
        setTimeout(() => {
          this.isActiveTextTwo = 'false';
        }, 1000);
      } else {
        this.snackBar.open('success', 'ok', {duration: 2000});
      }
    });
  }
}
