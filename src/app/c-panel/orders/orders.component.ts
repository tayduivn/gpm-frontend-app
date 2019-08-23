import {Component, OnInit} from '@angular/core';
import {ModelOrder} from '../../models/model-order';
import {UtilsService} from '../../services/utils.service';
import {OrdersDialogComponent} from '../../dialog/orders-dialog/orders-dialog.component';
import {OrderApiService} from '../../services/api/order-api.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: ModelOrder;
  message = 'Loading...';
  selectedStatus = UtilsService.state[0];
  statesOrder = UtilsService.state;

  constructor(
    private orderApiService: OrderApiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.orderApiService.getOrders(this.selectedStatus).subscribe((res: any) => this.orders = res.data);
  }

  openDialog(order = {}) {
    this.dialog.open(OrdersDialogComponent, {width: '700px', data: order}).afterClosed()
      .subscribe(() => {
        this.getOrders();
      });
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
