import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModelReview} from '../../models/model-review';

@Component({
  selector: 'app-form-categories',
  templateUrl: './reviews-dialog.component.html',
  styleUrls: ['./reviews-dialog.component.css']
})
export class ReviewsDialogComponent implements OnInit {
  public form: FormGroup;
  review: ModelReview;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ReviewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.review = null;
    } else {
      this.review = data;
    }
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }
}
