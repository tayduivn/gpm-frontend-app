import {Component, OnInit} from '@angular/core';
import {ModelCategory} from '../../models/model-category';
import {CategoryApiService} from '../../services/api/category-api.service';
import {CategoriesDialogComponent} from '../../dialog/categories-dialog/categories-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: ModelCategory;
  message: 'Loading...';

  constructor(
    private categoryApiService: CategoryApiService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.categories = undefined;
    this.categoryApiService.getCategories().subscribe((res: any) => this.categories = res.data);
  }

  openDialog(category = {}) {
    this.dialog.open(CategoriesDialogComponent, {width: '700px', data: category}).afterClosed()
      .subscribe(() => {
        this.getCategories();
      });
  }

  confirmDialog(id: string) {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        this.categoryApiService.deleteCategory(id).subscribe(() => {
          this.snackBar.open('Deleted', 'ok', {duration: 2000});
          this.getCategories();
        });
      }
    });
  }

  formDate(date: any) {
    return UtilsService.formDate(date);
  }
}
