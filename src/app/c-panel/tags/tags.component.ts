import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {UtilsService} from '../../services/utils.service';
import {TagApiService} from '../../services/api/tag-api.service';
import {CategoriesDialogComponent} from '../../dialog/categories-dialog/categories-dialog.component';
import {ModelTag} from '../../models/model-tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: [ModelTag];
  message: 'Loading...';

  constructor(
    private tagApiService: TagApiService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.tags = undefined;
    this.tagApiService.getTags().subscribe((res: any) => this.tags = res.data);
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
        this.tagApiService.deleteTag(id).subscribe(() => {
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
