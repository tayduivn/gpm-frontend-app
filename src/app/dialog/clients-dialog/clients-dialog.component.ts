import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModelUser} from '../../models/model-user';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-form-categories',
  templateUrl: './clients-dialog.component.html',
  styleUrls: ['./clients-dialog.component.css']
})
export class ClientsDialogComponent implements OnInit {
  user: ModelUser;

  constructor(
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClientsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.user = null;
    } else {
      this.user = data;
    }
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

  formaDate(date: any) {
    return UtilsService.formDate(date);
  }
}
