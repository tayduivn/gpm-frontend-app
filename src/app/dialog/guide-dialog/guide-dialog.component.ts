import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CategoryApiService} from '../../services/api/category-api.service';

@Component({
  selector: 'app-form-categories',
  templateUrl: './guide-dialog.component.html',
  styleUrls: ['./guide-dialog.component.css']
})
export class GuideDialogComponent implements OnInit {
  public form: FormGroup;
  public data: any = {};
  guide: any;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GuideDialogComponent>,
    private categoryApiService: CategoryApiService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.data = null;
    } else {
      this.data = data;
    }
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
