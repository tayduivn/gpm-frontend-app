import {Component, OnInit} from '@angular/core';
import {ModelUser} from '../../models/model-user';
import {UserApiService} from '../../services/api/user-api.service';
import {UtilsService} from '../../services/utils.service';
import {ClientsDialogComponent} from '../../dialog/clients-dialog/clients-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  users: ModelUser;
  message = 'Loading...';

  constructor(
    private userApiService: UserApiService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.userApiService.getUsers('?type=client').subscribe((res: any) => this.users = res.data);
  }

  openDialog(user: ModelUser = null) {
    this.dialog.open(ClientsDialogComponent, {width: '700px', data: user}).afterClosed()
      .subscribe(() => {
        console.log('close');
      });
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
