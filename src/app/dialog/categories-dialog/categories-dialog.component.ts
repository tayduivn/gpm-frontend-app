import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CategoryApiService} from '../../services/api/category-api.service';
import {UtilsService} from '../../services/utils.service';
import {ModelCategory} from '../../models/model-category';

@Component({
  selector: 'app-form-categories',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css']
})
export class CategoriesDialogComponent implements OnInit {
  public form: FormGroup;
  public category: ModelCategory;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CategoriesDialogComponent>,
    private categoryApiService: CategoryApiService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.category = null;
      this.form = this.fb.group({
        name: ['', [Validators.required]],
      });
    } else {
      this.category = data;
      this.form = this.fb.group({
        name: [this.category.name, [Validators.required]],
      });
    }
  }

  ngOnInit(): void {
  }

  public getError(controlName: string): string {
    return UtilsService.getError(this.form, controlName);
  }

  public save() {
    if (this.category !== null) {
      this.form.value.id = this.category.id;
      this.categoryApiService.updateCategory(this.form.value).subscribe((res: any) => {
        this.snackBar.open(res.message, 'ok', {duration: 2000});
      });
    } else {
      this.categoryApiService.createCategory(this.form.value).subscribe((res: any) => {
        this.snackBar.open(res.message, 'ok', {duration: 2000});
      });
    }
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
