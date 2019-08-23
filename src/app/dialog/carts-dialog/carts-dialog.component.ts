import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModelCart} from '../../models/model-cart';

@Component({
  selector: 'app-form-categories',
  templateUrl: './carts-dialog.component.html',
  styleUrls: ['./carts-dialog.component.css']
})
export class CartsDialogComponent implements OnInit {
  cart: ModelCart;
  message = 'Loading...';

  constructor(
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CartsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.cart = null;
    } else {
      this.cart = data;
    }
  }

  ngOnInit(): void {
  }

  public save() {
    /* Is edit */
    if (this.cart !== null) {
    }
    /* Make request */
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
