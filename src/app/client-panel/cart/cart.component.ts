import {Component, OnInit} from '@angular/core';
import {ModelCart} from '../../models/model-cart';
import {CartApiService} from '../../services/api/cart-api.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ClientPaymentDialogComponent} from '../../dialog/client-payment-dialog/client-payment-dialog.component';
import {CartProductsApiService} from '../../services/api/cart-products-api.service';

@Component({
  selector: 'app-carts',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public carts: ModelCart;
  public message = 'Loading...';
  public quantityValue: any = [];
  public totalPrice: any = 0;
  product = {
    image: 'http://gardensofamerica.com/logo.png',
    name: 'Gardens of America',
    description: 'Credit card information',
    currency: 'USD',
    amount: 0
  };

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private cartApiService: CartApiService,
    private cartProductsApiService: CartProductsApiService,
  ) {
  }

  ngOnInit() {
    this.getCartProducts();
  }

  private getCartProducts() {
    const id = JSON.parse(localStorage.getItem('user')).id;
    this.cartApiService.getCartStatus(id).subscribe((res: any) => {
      this.carts = res.data[0];
      if (res.data[0].products.length) {
        res.data[0].products.forEach((value: any, index) => {
          this.quantityValue[index] = {
            cart_product_id: value.cart_product_id,
            product_id: value.product_id,
            quantity: parseInt(value.cart_quantity, 0)
          };
        });
        this.getTotalPrice();
        this.product.amount = this.totalPrice;
        console.log(this.totalPrice);
      } else {
        this.snackBar.open('Without products', 'ok', {duration: 2000});
      }
    }, () => {
      this.message = 'Error loading';
    });
  }

  quantityProduct(isPlus, index) {
    if (isPlus && this.carts.products[index].quantity <= parseInt(this.quantityValue[index].quantity, 0)) {
      this.snackBar.open('This is the max in the store', 'ok', {duration: 2000});
      return;
    }
    if (!isPlus && parseInt(this.quantityValue[index].quantity, 0) <= 1) {
      this.snackBar.open('1 is the minimum', 'ok', {duration: 2000});
      return;
    }
    const number = parseInt(this.quantityValue[index].quantity, 0) - 1;
    this.quantityValue[index].quantity = isPlus ? parseInt(this.quantityValue[index].quantity, 0) + 1 : number;
    this.getTotalPrice();
  }

  private getTotalPrice() {
    let totalPrice: any = 0;
    this.carts.products.forEach((value: any, index) => {
      const number = typeof value.regular_price === 'string' ? parseFloat(value.regular_price) : value.regular_price;
      const total = typeof value.regular_price === 'string' ? parseFloat(totalPrice) : totalPrice;
      totalPrice = Number(number * this.quantityValue[index].quantity + total).toFixed(2);
    });
    this.totalPrice = Number(totalPrice).toFixed(2);
  }

  openDialog(cart: any = {}) {
    cart.cart_id = this.carts.cart_id;
    cart.user_id = this.carts.user_id;
    cart.totatlPrice = this.totalPrice;
    cart.subtotal = this.totalPrice;
    this.dialog.open(ClientPaymentDialogComponent, {width: '700px', data: cart}).afterClosed().subscribe(() => {
      console.log('close');
    });
  }

  updateCart() {
    const data = {products: this.quantityValue};
    console.log(JSON.stringify(data));
    this.cartProductsApiService.updateProduct(data).subscribe(() => {
      this.getCartProducts();
      this.snackBar.open('success', 'ok', {duration: 2000});
    });
  }

  validateQuantity(product, index) {
    return product.quantity < parseInt(this.quantityValue[index].quantity, 0);
  }
}
