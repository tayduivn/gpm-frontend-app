import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {ModelInfoPage} from '../../models/model-info-page';
import {InfoPageApiService} from '../../services/api/info-page-api.service';
import {InfoPageDialogComponent} from '../../dialog/info-page-dialog/info-page-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  message = 'Loading...';
  infoPages: [ModelInfoPage];

  constructor(
    private infoPageApiService: InfoPageApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getInfoPages();
  }

  private getInfoPages() {
    this.infoPageApiService.getInfoPages().subscribe((res: any) => this.infoPages = res.data);
  }

  openDialog(model: any = {}, type: string = '') {
    model.modalType = type;
    this.dialog.open(InfoPageDialogComponent, {width: '700px', data: model}).afterClosed()
      .subscribe(() => {
        this.getInfoPages();
      });
  }

  deleteProduct(id) {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        this.infoPageApiService.deleteInfoPage(id).subscribe(() => {
          this.snackBar.open('Deleted', 'ok', {duration: 2000});
          this.getInfoPages();
        });
      }
    });
  }
}
