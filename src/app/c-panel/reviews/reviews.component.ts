import {Component, OnInit} from '@angular/core';
import {ModelReview} from '../../models/model-review';
import {ReviewsDialogComponent} from '../../dialog/reviews-dialog/reviews-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {ReviewApiService} from '../../services/api/review-api.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: ModelReview;
  message = 'Loading...';

  constructor(
    private reviewApiService: ReviewApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getReviews();
  }

  private getReviews() {
    this.reviewApiService.getReviews().subscribe((res: any) => this.reviews = res.data);
  }

  openDialog(review = {}) {
    this.dialog.open(ReviewsDialogComponent, {width: '700px', data: review}).afterClosed()
      .subscribe(() => {
        console.log('close');
      });
  }

  confirmDialog(id: string) {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        this.reviewApiService.deleteReview(id).subscribe(() => {
          this.snackBar.open('Deleted', 'ok', {duration: 2000});
          this.getReviews();
        });
      }
    });
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
