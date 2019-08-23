import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserApiService} from '../../services/api/user-api.service';
import {UtilsService} from '../../services/utils.service';
import {ModelUser} from '../../models/model-user';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  formPass: FormGroup;
  hidePass = true;
  hidePassNew = true;
  user: ModelUser;
  message = 'Loading...';

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.setForm();
    this.getUsers();
  }

  private setForm() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    });

    this.formPass = this.fb.group({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  private getUsers() {
    const query = `?idUser=${JSON.parse(localStorage.getItem('user')).id}`;
    this.userApiService.getUsers(query).subscribe((res: any) => {
      this.user = res.data;
    });
  }

  send() {
    this.userApiService.updateUser(this.form.value).subscribe(() => {
      this.snackBar.open('success', 'ok', {duration: 2000});
    });
  }

  sendPass() {
    this.userApiService.passwordUser(this.form.value).subscribe(() => {
      this.snackBar.open('success', 'ok', {duration: 2000});
    });
  }

  deleteData() {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        const id = JSON.parse(localStorage.getItem('user')).id;
        this.userApiService.deleteUser(id).subscribe(() => {
          this.snackBar.open('Deleted', 'ok', {duration: 2000});
          this.getUsers();
        });
      }
    });
  }

  getError(controlName: string) {
    return UtilsService.getError(this.form, controlName);
  }
}
