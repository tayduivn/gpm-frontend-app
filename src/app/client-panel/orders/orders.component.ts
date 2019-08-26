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
  public orders: [ModelOrder];
  public message = 'Loading...';
  public listState = UtilsService.state;
  public stateOrder = UtilsService.state[0];
  public selectOrder = 'Buyer';
  private user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private orderApiService: OrderApiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.orderApiService.getOrders(`?type=${this.selectOrder}&my_email=${this.user.email}`).subscribe((res: any) => {
      this.orders = res.data;
    }, () => {
      this.message = 'Error loading data';
    });
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
    this.dialog.open(ClientOrderDialogComponent, {width: '700px', data: order}).afterClosed().subscribe(() => {
      this.getOrders();
    });
  }

  selectTypeOrder() {
    this.orderApiService.getOrders(`?type=${this.selectOrder}&my_email=${this.user.email}`).subscribe((res: any) => {
      console.log(res.data);
      this.orders = res.data;
    }, () => {
      this.message = 'Error loading data';
    });
  }
}
