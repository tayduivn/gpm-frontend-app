import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {TransactionApiService} from '../../services/api/transaction-api.service';
import {CartApiService} from '../../services/api/cart-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './client-payment-dialog.component.html',
  styleUrls: ['./client-payment-dialog.component.css']
})
export class ClientPaymentDialogComponent implements OnInit {
  public message = 'Loading...';
  public submitForm: false;
  private transaction: any = {};

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClientPaymentDialogComponent>,
    private transactionApiService: TransactionApiService,
    private cartApiService: CartApiService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  ngOnInit() {
  }

  private startDialog(data: any) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.snackBar.open('Error loading data', 'ok', {duration: 2000});
    } else {
      this.transaction.processor_trans_id = 1;
      this.transaction.cart_id = data.cart_id;
      this.transaction.user_id = data.user_id;
      this.transaction.total = data.totalPrice;
      this.transaction.subtotal = data.totalPrice;
      this.getPaypal();
    }
  }

  private getPaypal() {
    this.transactionApiService.getTransactions('?payment=Paypal')
      .subscribe((res: any) => {
        const env = res.data.data.production_paypal === '0' ? 'sandbox' : 'production';
        console.log(env);
        if (res.data.data.paypal_client !== '') {
          /*const paypal = require('paypal-checkout');
          const client = require('braintree-web/client');
          const paypalCheckout = require('braintree-web/paypal-checkout');*/
          const paypal: any = 'paypal-checkout';
          const client = 'braintree-web/client';
          const paypalCheckout = 'braintree-web/paypal-checkout';

          const self: any = this;

          paypal.Button.render({
            braintree: {client, paypalCheckout},
            client: {
              production: res.data.data.paypal_client,
              sandbox: res.data.data.paypal_client
            },
            env: env, // Or 'sandbox'
            commit: true, // This will add the transaction amount to the PayPal button

            payment: (data, actions) => actions.braintree.create({
              flow: 'checkout', // Required
              amount: self.totalPrice, // Required
              currency: 'USD', // Required
            }),

            onAuthorize: function (payload, actions) {
              actions.payment.get().then(function (data) {
                self.transaction.processor = 'Paypal';
                self.transaction.payload_paypal = {
                  nonce: payload.nonce,
                  orderID: payload.orderID,
                  payer_info: data.payer.payer_info
                };
                self.saveTransaction();
              });
            },
          }, '#paypal-button');
        } else {
          this.snackBar.open('Error recover Paypal information', 'ok', {duration: 2000});
        }
      });
  }

  saveTransaction() {
    this.transactionApiService.createTransaction(this.transaction).subscribe(() => {
      this.snackBar.open('Transaction success', 'ok', {duration: 2000});
      const id = JSON.parse(localStorage.getItem('user')).id;
      this.cartApiService.getCartStatus(id).subscribe((resStatus: any) => {
        localStorage.setItem('cartId', resStatus.data[0].cart_id);
        this.router.navigate(['/client/order']);
      });
    });
  }

  close() {
    this.dialogRef.close();
  }
}
