import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ModelProduct} from '../../models/model-product';
import {ModelCategory} from '../../models/model-category';
import {ModelTag} from '../../models/model-tag';
import {UtilsService} from '../../services/utils.service';
import {ProductApiService} from '../../services/api/product-api.service';
import {ProductImageApiService} from '../../services/api/product-image-api.service';
import {ProductCategoryApiService} from '../../services/api/product-category-api.service';
import {CategoryApiService} from '../../services/api/category-api.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ProductTagApiService} from '../../services/api/product-tag-api.service';
import {TagApiService} from '../../services/api/tag-api.service';

@Component({
  selector: 'app-form-categories',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})
export class ProductsDialogComponent implements OnInit {
  public form: FormGroup;
  public formImage: FormGroup;
  public formImageData: FormGroup;
  public modalType: string;
  public product: ModelProduct;
  public categories = [];
  public tags = [];
  private formData = new FormData();
  private categoryType = [];
  private categoryStart = false;
  private tagType = [];
  private tagStart = false;
  private fileToUpload = [];

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProductsDialogComponent>,
    private productApiService: ProductApiService,
    private productImageApiService: ProductImageApiService,
    private categoryApiService: CategoryApiService,
    private tagApiService: TagApiService,
    private productCategoryApiService: ProductCategoryApiService,
    private productTagApiService: ProductTagApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.startDialog(data);
  }

  private startDialog(data) {
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      this.product = null;
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
      this.product = data;
      this.modalType = data.modalType;
      this.categoryApiService.getCategories().subscribe((res: any) => this.categories = res.data);
      this.tagApiService.getTags().subscribe((res: any) => this.tags = res.data);
      this.form = this.fb.group({
        name: [this.product.name, [Validators.required]],
        description_short: [this.product.description_short, [Validators.required]],
        description_one: [this.product.description_one, [Validators.required]],
        description_two: [this.product.description_two, [Validators.required]],
        image: [''],
        regular_price: [this.product.regular_price, [Validators.required]],
        quantity: [this.product.quantity, [Validators.required]],
      });

      /* Form image */
      this.formImageData = this.fb.group({values: this.fb.array([])});
      if (this.product.images[0].id_image !== '0') {
        for (const item of this.product.images) {
          this.addFormImageData(item);
        }
      }
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
    this.formDataSendProduct();
    if (this.product.id !== undefined) {
      this.productApiService.updateProduct(this.formData).subscribe(() => {
        this.snackBar.open('Success', 'ok', {duration: 2000});
        this.dialogRef.close();
      });
    } else {
      this.productApiService.createProduct(this.formData).subscribe(() => {
        this.snackBar.open('Success', 'ok', {duration: 2000});
        this.dialogRef.close();
      });
    }
  }

  /* Category */
  public checkCategory(index: number, category: ModelCategory, product: any) {
    if (this.categoryStart) {
      return this.categoryType[index];
    }
    /* Product without categories */
    if (product.categories === undefined) {
      product.categories = [];
      this.categoryStart = true;
      return;
    }
    /* Product with categories and finish for */
    if (index === (this.categories.length - 1)) {
      this.categoryStart = true;
    }
    this.categoryType[index] = product.categories.find(value => value.id === category.id) !== undefined;
    return this.categoryType[index];
  }

  public sendCategory(event, product_id, category_id, index: number) {
    if (event.target.checked) {
      this.productCategoryApiService.createProductCategory({product_id, category_id}).subscribe(() => {
        this.categoryType[index] = true;
        this.snackBar.open('Success', 'ok', {duration: 2000});
      });
    } else {
      this.productCategoryApiService.deleteProductCategory({product_id, category_id}).subscribe(() => {
        this.categoryType[index] = false;
        this.snackBar.open('Success', 'ok', {duration: 2000});
      });
    }
  }

  /* Tag */
  public checkTag(index: number, tag: ModelTag, product: any) {
    if (this.tagStart) {
      return this.tagType[index];
    }
    /* Product without categories */
    if (product.tags === undefined) {
      product.tags = [];
      this.tagStart = true;
      return;
    }
    /* Product with tags and finish for */
    if (index === (this.tags.length - 1)) {
      this.tagStart = true;
    }
    this.tagType[index] = product.tags.find(value => value.id === tag.id) !== undefined;
    return this.tagType[index];
  }

  public sendTag(event, product_id, tag_id, index: number) {
    if (event.target.checked) {
      this.productTagApiService.createProductTag({product_id, tag_id}).subscribe(() => {
        this.tagType[index] = true;
        this.snackBar.open('Success', 'ok', {duration: 2000});
      });
    } else {
      this.productTagApiService.deleteProductTag({product_id, tag_id}).subscribe(() => {
        this.tagType[index] = false;
        this.snackBar.open('Success', 'ok', {duration: 2000});
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
    this.productImageApiService.createImage(this.formData).subscribe(() => {
      this.snackBar.open('Success', 'ok', {duration: 2000});
      this.productApiService.getProducts('?order=ASC&LIMIT=15')
        .subscribe((res: any) => {
          this.addFormImageData({size: this.formImage.value.size});
          this.product = res.data.find(value => value.id === this.product.id);
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
    this.formData.delete('size');
    this.formData.append('size', this.formImage.value.size);
    this.formData.delete('product_id');
    this.formData.append('product_id', this.product.id);
  }

  public editDataImage(id: string, index) {
    this.formDataDataImageSend(id, index);
    this.productImageApiService.updateImage(this.formData).subscribe(() => {
      this.snackBar.open('Success', 'ok', {duration: 2000});
      this.productApiService.getProducts('?order=ASC&LIMIT=15')
        .subscribe((res: any) => {
          this.product = res.data.find(value => value.id === this.product.id);
        });
    });
  }

  private formDataDataImageSend(id = '', index) {
    if (this.fileToUpload.length === 0) {
      this.snackBar.open('Upload a image', 'ok', {duration: 2000});
      return;
    }
    this.formData.delete('id');
    this.formData.append('id', id);
    this.formData.delete('size');
    this.formData.append('size', this.formImageData.value.values[index].size);
    this.formData.delete('product_id');
    this.formData.append('product_id', this.product.id);
  }

  public deleteDataImage(id: string, index) {
    this.dialog.open(ConfirmDialogComponent, {disableClose: false}).afterClosed().subscribe(result => {
      if (result) {
        this.productImageApiService.deleteImage(id)
          .subscribe(() => {
            this.snackBar.open('Deleted', 'ok', {duration: 2000});
            this.productApiService.getProducts('?order=ASC&LIMIT=15').subscribe((res: any) => {
              (<FormArray>this.formImageData.controls.values).removeAt(index);
              this.product = res.data.find(value => value.id === this.product.id);
            });
          });
      }
    });
  }

  public close() {
    this.dialogRef.close();
  }

  private formDataSendProduct() {
    this.formData.delete('id');
    this.formData.append('id', this.product.id);
    this.formData.delete('name');
    this.formData.append('name', this.form.value.name);
    this.formData.delete('description_short');
    this.formData.append('description_short', this.form.value.description_short);
    this.formData.delete('description_one');
    this.formData.append('description_one', this.form.value.description_one);
    this.formData.delete('description_two');
    this.formData.append('description_two', this.form.value.description_two);
    this.formData.delete('preparation');
    this.formData.append('preparation', this.form.value.preparation);
    this.formData.delete('regular_price');
    this.formData.append('regular_price', Number(this.form.value.regular_price).toFixed(2));
    this.formData.delete('quantity');
    this.formData.append('quantity', this.form.value.quantity);
    this.formData.delete('user_id');
    this.formData.append('user_id', JSON.parse(localStorage.getItem('user')).id);
  }

  private addFormImageData(item) {
    (<FormArray>this.formImageData.controls.values).push(
      this.fb.group({
        'size': new FormControl(item.size, [Validators.required]),
      })
    );
  }
}
