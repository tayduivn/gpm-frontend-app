import {Component, OnInit} from '@angular/core';
import {ModelProduct} from '../../models/model-product';
import {ProductApiService} from '../../services/api/product-api.service';
import {ProductsDialogComponent} from '../../dialog/products-dialog/products-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  message = 'Loading...';
  products: [ModelProduct];

  constructor(
    private productApiService: ProductApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.productApiService.getProducts(`?idUser=${user.id}order=ASC&LIMIT=15`).subscribe((res: any) => this.products = res.data);
  }

  openDialog(model: any = {}, type: string = '') {
    model.modalType = type;
    this.dialog.open(ProductsDialogComponent, {width: '700px', data: model}).afterClosed()
      .subscribe(() => {
        this.getProducts();
      });
  }

  deleteProduct(id) {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        this.productApiService.deleteProduct(id).subscribe(() => {
          this.snackBar.open('Deleted', 'ok', {duration: 2000});
          this.getProducts();
        });
      }
    });
  }
}
