import {Component, OnInit} from '@angular/core';
import {ModelProduct} from '../../models/model-product';
import {ProductApiService} from '../../services/api/product-api.service';
import {CartApiService} from '../../services/api/cart-api.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CartProductsApiService} from '../../services/api/cart-products-api.service';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {PaymentDialogComponent} from '../../dialog/payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public message = 'Loading...';
  public slideConfig = {
    autoplay: true,
    arrows: true,
    dots: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          arrows: false,
          dots: true,
        }
      }
    ]
  };
  public product: ModelProduct;
  private quantityValue = 1;

  constructor(
    public snackBar: MatSnackBar,
    private productApiService: ProductApiService,
    private cartProductsApiService: CartProductsApiService,
    private cartApiService: CartApiService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.request();
  }

  private request() {
    this.productApiService.getProducts(`?id=${this.route.snapshot.paramMap.get('id')}`).subscribe((res: any) => {
      this.product = res.data[0];
    });
  }

  getCountReviews() {
    return this.product.reviews ? 0 : 0;
  }

  saveCart() {
    const data = {
      cartProducts: {
        quantity: this.quantityValue,
        product_id: this.product.id,
        cart_id: localStorage.getItem('cartId'),
      },
      product: this.product
    };
    this.dialog.open(PaymentDialogComponent, {width: '700px', data}).afterClosed()
      .subscribe(() => {
        console.log('close');
      });
  }

  quantityProduct(isPlus) {
    if (isPlus && this.product.quantity <= this.quantityValue) {
      this.snackBar.open('This is the max in the store', 'ok', {duration: 2000});
      return;
    }
    if (!isPlus && this.quantityValue <= 1) {
      this.snackBar.open('1 is the minimum', 'ok', {duration: 2000});
      return;
    }
    this.quantityValue = isPlus ? this.quantityValue + 1 : this.quantityValue - 1;
    console.log(this.quantityValue);
  }

  getReviewSize(stars) {
    const reviewSize = [];
    for (let i = 0; i < stars; i++) {
      reviewSize.push(i);
    }
    return reviewSize;
  }

  openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    const elementById = document.getElementById(tabName);
    elementById.style.display = elementById.id === 'review' ? 'block' : 'flex';
    evt.currentTarget.className += ' active';
  }
}
