import {Component, Inject, OnInit} from '@angular/core';
import {ModelOrder} from '../../models/model-order';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderApiService} from '../../services/api/order-api.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-client-order-dialog',
  templateUrl: './client-order-dialog.component.html',
  styleUrls: ['./client-order-dialog.component.css']
})
export class ClientOrderDialogComponent implements OnInit {
  public order: ModelOrder;
  public message = 'Loading...';
  public disabledButton = false;

  constructor(
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClientOrderDialogComponent>,
    private orderApiService: OrderApiService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.order = null;
    } else {
      this.orderApiService.getCartUserOrder(data.user_id, data.order_id, data.stateOrder)
        .subscribe((res: any) => {
          this.order = res.data[0];
        });
    }
  }

  ngOnInit(): void {
  }

  public editStatusOrder() {
    if (this.order !== null) {
      const order = {
        id: this.order.order_id,
        status: UtilsService.state[2]
      };
      this.orderApiService.updateOrder(order).subscribe(() => {
        this.order.order_status = UtilsService.state[2];
        this.snackBar.open('success', 'ok', {duration: 2000});
      });
    } else {
      this.snackBar.open('Error', 'ok', {duration: 2000});
    }
  }

  public close() {
    this.dialogRef.close();
  }

}
