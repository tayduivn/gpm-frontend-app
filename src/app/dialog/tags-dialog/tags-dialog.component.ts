import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UtilsService} from '../../services/utils.service';
import {TagApiService} from '../../services/api/tag-api.service';
import {ModelTag} from '../../models/model-tag';

@Component({
  selector: 'app-form-categories',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.css']
})
export class TagsDialogComponent implements OnInit {
  public form: FormGroup;
  public tag: ModelTag;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TagsDialogComponent>,
    private tagApiService: TagApiService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.tag = null;
      this.form = this.fb.group({
        name: ['', [Validators.required]],
      });
    } else {
      this.tag = data;
      this.form = this.fb.group({
        name: [this.tag.name, [Validators.required]],
      });
    }
  }

  ngOnInit(): void {
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  public save() {
    if (this.tag !== null) {
      this.form.value.id = this.tag.id;
      this.tagApiService.updateTag(this.form.value).subscribe((res: any) => {
        this.snackBar.open(res.message, 'ok', {duration: 2000});
      });
    } else {
      this.tagApiService.createTag(this.form.value).subscribe((res: any) => {
        this.snackBar.open(res.message, 'ok', {duration: 2000});
      });
    }
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
