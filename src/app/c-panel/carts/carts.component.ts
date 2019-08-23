import {Component, OnInit} from '@angular/core';
import {ModelCart} from '../../models/model-cart';
import {CartApiService} from '../../services/api/cart-api.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  carts: ModelCart;
  message = 'Loading...';

  constructor(
    private cartApiService: CartApiService
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.cartApiService.getCarts().subscribe(res => this.carts = res);
  }

  openDialog(cart: any = {}) {
    this.cartApiService.getCartsByUser(cart.id).subscribe((res) => console.log(res));
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
