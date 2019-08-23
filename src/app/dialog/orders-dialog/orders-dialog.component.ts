import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModelOrder} from '../../models/model-order';
import {UtilsService} from '../../services/utils.service';
import {OrderApiService} from '../../services/api/order-api.service';

@Component({
  selector: 'app-form-categories',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.css']
})
export class OrdersDialogComponent implements OnInit {
  public form: FormGroup;
  order: ModelOrder;
  message = 'Loading...';

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OrdersDialogComponent>,
    private orderApiService: OrderApiService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.order = null;
      this.form = this.fb.group({
        selectedStatus: ['', [Validators.required]],
      });
    } else {
      this.order = data;
      this.form = this.fb.group({
        selectedStatus: [this.order.order_status, [Validators.required]],
      });
    }
  }

  ngOnInit(): void {
  }

  public getTotal(quantity, price) {
    const value = quantity * +(Number(price).toFixed(2));
    console.log(value);
    return Number(value).toFixed(2);
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  public save() {
    if (this.order !== null) {
      this.form.value.id = this.order.id;
      this.orderApiService.updateOrder(this.form.value);
    } else {
      this.snackBar.open('Error', 'ok', {duration: 2000});
    }
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
