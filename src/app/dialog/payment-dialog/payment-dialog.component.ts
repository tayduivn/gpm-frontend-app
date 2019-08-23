import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderApiService} from '../../services/api/order-api.service';
import {ModelCartProduct} from '../../models/model-cart-product';
import {ModelProduct} from '../../models/model-product';
import {CartProductsApiService} from '../../services/api/cart-products-api.service';
import {StripeCheckoutHandler, StripeCheckoutLoader} from 'ng-stripe-checkout';
import {CartApiService} from '../../services/api/cart-api.service';
import {TransactionApiService} from '../../services/api/transaction-api.service';
import {MapService} from '../../services/map.service';
import {PaymentApiService} from '../../services/api/payment-api.service';
import paypal from 'paypal-checkout';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {ChatService} from '../../services/chat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-categories',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {
  public message = 'Loading...';
  public product: ModelProduct;
  public totalPrice: any;
  public isPayment = false;
  public title_payment = 'Select your ubication';
  private cartProducts: ModelCartProduct;
  private transaction: any = {address: ''};
  private stripeCheckoutHandler: StripeCheckoutHandler;
  private user = JSON.parse(localStorage.getItem('user'));
  public payPalConfig?: IPayPalConfig;

  constructor(
    private fb: FormBuilder,
    private stripeCheckoutLoader: StripeCheckoutLoader,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private orderApiService: OrderApiService,
    private cartProductsApiService: CartProductsApiService,
    private cartApiService: CartApiService,
    private transactionApiService: TransactionApiService,
    private mapService: MapService,
    private paymentApiService: PaymentApiService,
    private chatService: ChatService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.message = 'Error cargando datos';
    } else {
      this.cartProducts = data.cartProducts;
      this.product = data.product;
      const number = +(Number(this.product.regular_price).toFixed(2));
      this.totalPrice = Number(this.cartProducts.quantity * number).toFixed(2);
    }
  }

  ngOnInit(): void {
    setTimeout(() => this.setMap(), 1);
  }

  private setMap() {
    this.mapService.setMap();
    this.mapService.geocoder.on('result', ev => {
      this.transaction.address = 'Loading...';
      const lng = ev.result.geometry.coordinates[0];
      const lat = ev.result.geometry.coordinates[1];
      this.mapService.getLocationName(lng, lat).subscribe((res: any) => {
        this.transaction.map_lng = lng;
        this.transaction.map_lat = lat;
        console.log(lng);
        console.log(lat);
        this.transaction.address = res.features[2].place_name;
      }, () => {
        alert('Error cargando datos');
      });
    });

    this.mapService.map.on('click', ev => {
      this.transaction.address = 'Loading...';
      const lng = ev.lngLat.lng;
      const lat = ev.lngLat.lat;
      this.mapService.getLocationName(lng, lat).subscribe((res: any) => {
        this.transaction.map_lng = lng;
        this.transaction.map_lat = lat;
        this.transaction.address = res.features[2].place_name;
      }, () => {
        alert('Error cargando datos');
      });
    });
  }

  setConfigStripe() {
    this.stripeCheckoutLoader.createHandler({
      key: 'pk_test_YeVKMYilUfYqLjz0T8aVkUZG00vF7lQyNZ',
      token: (token) => {
        console.log('Payment successful!', token);
      }
    }).then((handler: StripeCheckoutHandler) => {
      this.stripeCheckoutHandler = handler;
    });
  }

  setStripe() {
    if (this.stripeCheckoutHandler) {
      this.stripeCheckoutHandler.open({
        amount: Number(this.totalPrice.toString().replace('.', '')),
        currency: this.product.currency,
      }).then((token) => {
        this.transaction.token_stripe = token;
        this.transaction.processor = 'Credit card';
        this.requestTransaction();
      }).catch((err) => {
        if (err !== 'stripe_closed') {
          throw err;
        }
      });
    } else {
      this.snackBar.open('Loading information, please wait', 'ok', {duration: 2000});
    }
  }

  setConfigPaypal() {
    console.log(this.product);
    const dataPaypal = {
      value: this.totalPrice.toString(),
      currency_code: 'USD',
      name: this.product.name,
      quantity: this.cartProducts.quantity.toString()
    };
    console.log(dataPaypal);
    this.payPalConfig = {
      currency: dataPaypal.currency_code,
      clientId: 'AeXmWVVQuA7uLDl_CYZjP_YMo053Fo5XQDEzCqvd441ipe6aLdb7HpLQ80y6DFL18tkYUMGFIsy5BiUf',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: dataPaypal.currency_code,
              value: dataPaypal.value,
              breakdown: {
                item_total: {
                  currency_code: dataPaypal.currency_code,
                  value: dataPaypal.value
                }
              }
            },
            items: [
              {
                name: dataPaypal.name,
                quantity: dataPaypal.quantity,
                unit_amount: {
                  currency_code: dataPaypal.currency_code,
                  value: dataPaypal.value,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.transaction.order_id_paypal = data.id;
        this.transaction.processor = 'Paypal';
        this.requestTransaction();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  requestTransaction() {
    this.createChat()
      .then((res) => {
        this.transaction.processor_trans_id = 1;
        this.transaction.quantity = this.cartProducts.quantity;
        this.transaction.product_id = this.cartProducts.product_id;
        this.transaction.cart_id = this.cartProducts.cart_id;
        this.transaction.user_id = this.user.user_id;
        this.transaction.total = this.totalPrice;
        this.transaction.subtotal = this.totalPrice;
        this.transaction.user_id = this.user.id;
        this.transaction.chat_id = res.id;

        console.log(this.transaction);
        this.transactionApiService.createTransaction(this.transaction).subscribe(() => {
          this.snackBar.open('success', 'ok', {duration: 2000}).afterDismissed().subscribe(() => {
            this.router.navigate(['/client/orders']);
          });
        }, () => {
          this.snackBar.open('Error completing transaction', 'ok', {duration: 2000});
        });
      })
      .catch(err => {
        this.snackBar.open('Error completing transaction', 'ok', {duration: 2000});
      });
  }

  createChat() {
    const user_two = this.user.firebase_id;
    const user_one = this.product.user[0].firebase_id;

    const data = {
      first_uid: user_one,
      second_uid: user_two,
      second: {
        displayName: `${this.user.first_name} ${this.user.last_name}`,
        photo: this.user.photo,
        email: this.user.email
      },
      first: {
        displayName: `${this.product.user[0].first_name} ${this.product.user[0].last_name}`,
        photo: this.product.user[0].photo,
        email: this.product.user[0].email
      },
      createdAt: Date.now(),
      messages: []
    };

    return this.chatService.createChat(data);
  }

  public close() {
    this.dialogRef.close();
  }

  changeView(isPayment: boolean) {
    if (this.transaction.address) {
      if (isPayment) {
        this.title_payment = `Detail of the Product ${this.product.name}`;
        this.setConfigStripe();
        this.setConfigPaypal();
      } else {
        this.title_payment = 'Select your ubication';
        setTimeout(() => this.setMap(), 1);
      }
      this.isPayment = isPayment;
    } else {
      this.snackBar.open('Missing address', 'ok', {duration: 2000});
    }
  }
}
