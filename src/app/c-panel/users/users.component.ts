import {Component, OnInit} from '@angular/core';
import {ModelUser} from '../../models/model-user';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserApiService} from '../../services/api/user-api.service';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {UsersDialogComponent} from '../../dialog/users-dialog/users-dialog.component';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: ModelUser;
  message = 'Loading...';

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private userApiService: UserApiService,
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userApiService.getUsers('?type=admin').subscribe((res: any) => this.users = res.data);
  }

  confirmDialog(id: string) {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        this.userApiService.deleteUser(id).subscribe(() => {
          this.snackBar.open('Deleted', 'ok', {duration: 2000});
          this.getUsers();
        });
      }
    });
  }

  openDialog() {
    this.dialog.open(UsersDialogComponent, {width: '700px', data: {}}).afterClosed()
      .subscribe(() => {
        this.getUsers();
      });
  }

  checkMyUser(user: ModelUser) {
    return !!(user.email !== JSON.parse(localStorage.getItem('user')).email);
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
