import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {UtilsService} from '../../services/utils.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ModelInfoPage} from '../../models/model-info-page';
import {InfoPageApiService} from '../../services/api/info-page-api.service';
import {InfoPageImageApiService} from '../../services/api/info-page-image-api.service';

@Component({
  selector: 'app-form-categories',
  templateUrl: './info-page-dialog.component.html',
  styleUrls: ['./info-page-dialog.component.scss']
})
export class InfoPageDialogComponent implements OnInit {
  public form: FormGroup;
  public formImage: FormGroup;
  public formImageData: FormGroup;
  public modalType: string;
  public infoPage: ModelInfoPage;
  private formData = new FormData();
  private fileToUpload = [];

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<InfoPageDialogComponent>,
    private infoPageApiService: InfoPageApiService,
    private infoPageImageApiService: InfoPageImageApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.infoPage = null;
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        description_short: ['', [Validators.required]],
        description_one: ['', [Validators.required]],
        description_two: ['', [Validators.required]],
        image: ['', [Validators.required]],
        regular_price: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
      });
    } else {
      this.infoPage = data;
      this.modalType = data.modalType;
      this.form = this.fb.group({
        title: [this.infoPage.title, [Validators.required]],
        content: [this.infoPage.content, [Validators.required]],
        reference: [this.infoPage.reference, [Validators.required]],
        image: [''],
      });

      /* Form image */
      this.formImageData = this.fb.group({values: this.fb.array([])});
      console.log(this.formImageData.controls.values);
    }
    this.formImage = this.fb.group(({size: ['', [Validators.required]]}));
  }

  ngOnInit(): void {
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  public getErrorImage(controlName: string): string {
    return UtilsService.getError(this.formImage, controlName);
  }

  public save() {
    if (this.infoPage.id !== undefined) {
      this.infoPageApiService.updateInfoPage(this.form).subscribe(() => {
        this.snackBar.open('Success', 'ok', {duration: 2000});
        this.dialogRef.close();
      });
    } else {
      this.infoPageApiService.createInfoPage(this.form).subscribe(() => {
        this.snackBar.open('Success', 'ok', {duration: 2000});
        this.dialogRef.close();
      });
    }
  }

  /* Image */
  public uploadImage(event) {
    this.fileToUpload = event.target.files;
    this.formData.delete('image');
    if (this.fileToUpload.length) {
      for (const image of this.fileToUpload) {
        this.formData.append('image', image, image.name);
      }
    }
  }

  public saveImage() {
    this.formDataImageSend();
    this.infoPageImageApiService.createImage(this.formData).subscribe(() => {
      this.snackBar.open('Success', 'ok', {duration: 2000});
      this.infoPageApiService.getInfoPages()
        .subscribe((res: any) => {
          this.infoPage = res.data.find(value => value.id === this.infoPage.id);
        });
    });
  }

  private formDataImageSend(id = '') {
    if (this.fileToUpload.length === 0) {
      this.snackBar.open('Upload a image', 'ok', {duration: 2000});
      return;
    }
    this.formData.delete('id');
    this.formData.append('id', id);
    this.formData.delete('info_page_id');
    this.formData.append('info_page_id', this.infoPage.id);
  }

  public editDataImage(id: string) {
    this.formDataDataImageSend(id);
    this.infoPageImageApiService.updateImage(this.formData).subscribe(() => {
      this.snackBar.open('Success', 'ok', {duration: 2000});
      this.infoPageApiService.getInfoPages()
        .subscribe((res: any) => {
          this.infoPage = res.data.find(value => value.id === this.infoPage.id);
        });
    });
  }

  private formDataDataImageSend(id = '') {
    if (this.fileToUpload.length === 0) {
      this.snackBar.open('Upload a image', 'ok', {duration: 2000});
      return;
    }
    this.formData.delete('id');
    this.formData.append('id', id);
    this.formData.delete('info_page_id');
    this.formData.append('info_page_id', this.infoPage.id);
  }

  public deleteDataImage(id: string, index) {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        this.infoPageImageApiService.deleteImage(id)
          .subscribe(() => {
            this.snackBar.open('Deleted', 'ok', {duration: 2000});
            this.infoPageApiService.getInfoPages().subscribe((res: any) => {
              (<FormArray>this.formImageData.controls.values).removeAt(index);
              this.infoPage = res.data.find(value => value.id === this.infoPage.id);
            });
          });
      }
    });
  }

  public close() {
    this.dialogRef.close();
  }
}
