import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  public pages = ['Home', 'About', 'Membership'];
  public sections = [];
  private formData = new FormData();
  private fileToUpload = [];
  private readonly data: any;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<InfoPageDialogComponent>,
    private infoPageApiService: InfoPageApiService,
    private infoPageImageApiService: InfoPageImageApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }

  ngOnInit(): void {
    this.startDialog();
  }

  private startDialog() {
    if (Object.entries(this.data).length === 0 && this.data.constructor === Object) {
      this.infoPage = null;
      this.form = this.fb.group({
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
        page: ['', [Validators.required]],
        section: ['', [Validators.required]]
      });
    } else {
      this.infoPage = this.data;
      this.changePage(this.infoPage.page);
      this.modalType = this.data.modalType;
      this.form = this.fb.group({
        title: [this.infoPage.title, [Validators.required]],
        content:  new FormControl(this.infoPage.content, [Validators.required]),
        page: [this.infoPage.page, [Validators.required]],
        section: [this.infoPage.section, [Validators.required]]
      });

      /* Form image */
      this.formImageData = this.fb.group({values: this.fb.array([])});
    }
    this.formImage = this.fb.group(({size: ['', [Validators.required]]}));
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  public save() {
    if (this.infoPage.id !== undefined) {
      this.form.value.id = this.infoPage.id;
      this.infoPageApiService.updateInfoPage(this.form.value).subscribe(() => {
        this.snackBar.open('Success', 'ok', {duration: 2000});
        this.dialogRef.close();
      });
    } else {
      this.infoPageApiService.createInfoPage(this.form.value).subscribe(() => {
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

  public changePage(value: any) {
    switch (value) {
      case 'Home':
        this.sections = [
          {id: 'header', value: 'Header'},
          {id: 'about', value: 'About'},
          {id: 'trading', value: 'Trading'},
          {id: 'how_to', value: 'How to'},
          {id: 'membership', value: 'Membership'},
          {id: 'testimony', value: 'Testimony'}
        ];
        break;
      case 'About':
        this.sections = [
          {id: 'header', value: 'Header'},
          {id: 'what_is', value: 'What is'},
          {id: 'how_to', value: 'How to'},
          {id: 'benefits', value: 'benefits'},
        ];
        break;
      case 'Membership':
        this.sections = [
          {id: 'info', value: 'Info'},
        ];
        break;
      default:
        this.sections = [];
        break;
    }
  }
}
