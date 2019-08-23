import {Component, OnInit} from '@angular/core';
import {ModelOrder} from '../../models/model-order';
import {UtilsService} from '../../services/utils.service';
import {OrderApiService} from '../../services/api/order-api.service';
import {MatDialog} from '@angular/material';
import {ClientOrderDialogComponent} from '../../dialog/client-order-dialog/client-order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: [ModelOrder];
  message = 'Loading...';
  listState = UtilsService.state;
  stateOrder = UtilsService.state[0];

  constructor(
    private orderApiService: OrderApiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.orderApiService.getOrders(this.stateOrder).subscribe((res: any) => this.orders = res.data);
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }

  changeStatus(state: string) {
    this.stateOrder = state;
    this.getOrders();
  }

  openDialog(order: any = {}) {
    order.stateOrder = this.stateOrder;
    this.dialog.open(ClientOrderDialogComponent, {width: '700px', data: order}).afterClosed()
      .subscribe(() => {
        this.getOrders();
      });
  }
}
