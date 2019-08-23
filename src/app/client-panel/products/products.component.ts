import {Component, OnInit} from '@angular/core';
import {ModelProduct} from '../../models/model-product';
import {ProductApiService} from '../../services/api/product-api.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CategoryApiService} from '../../services/api/category-api.service';
import {ActivatedRoute} from '@angular/router';
import {TagApiService} from '../../services/api/tag-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public message = 'Loading...';
  public products: [ModelProduct];
  public categories: any;
  public tags: any;
  public pagination: any;
  public isToggle = 'content-filters';
  public search: any;
  public filterListCategory = [];
  public filterListTag = [];
  public filterDateOne: any;
  public filterDateTwo: any;
  public filterQuantity: any;
  public filterOrderBy: any;
  public filterOrderOrder: any;

  constructor(
    private productApiService: ProductApiService,
    private categoryApiService: CategoryApiService,
    private tagApiService: TagApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    const name = this.route.snapshot.queryParamMap.get('name');
    if (name !== null) {
      this.getProducts(`?productName=${name}`);
    } else {
      this.getProducts();
    }
    this.getCategories();
    this.getTags();
  }

  private getCategories() {
    this.categoryApiService.getCategories().subscribe((res: any) => this.categories = res.data);
  }

  private getTags() {
    this.tagApiService.getTags().subscribe((res: any) => this.tags = res.data);
  }

  searchProductPage(page) {
    const name = this.route.snapshot.queryParamMap.get('name');
    if (this.pagination.page !== page && name !== null) {
      this.getProducts(`?limit=12&page=${page}`);
    } else {
      this.getProducts(`?productName=${name}&limit=12&page=${page}`);
    }
  }

  private getProducts(query = '') {
    this.productApiService.getProducts(query).subscribe((res: any) => {
      this.products = res.data;
      this.pagination = res.data.pagination;
    });
  }

  searchProductFilter(time = 0) {
    setTimeout(() => {
      if (this.filterDateOne > this.filterDateTwo) {
        this.snackBar.open('The date one is mayor that the date two', 'ok', {duration: 2000});
        return;
      }

      const query = this.processQuery();

      console.log(query);

      this.productApiService.getFilterProducts(query).subscribe((res: any) => {
        this.products = res.data;
        this.pagination = res.data.pagination;
      });
    }, time);
  }

  private processQuery() {
    let query = '';
    let tempQuery = '';

    if (this.filterListCategory.length > 0) {
      this.categories.forEach((category, index) => {
        if (this.filterListCategory[index]) {
          tempQuery = `${tempQuery}${category.name},`;
        }
      });

      if (tempQuery !== '') {
        query = `?categoryName=${tempQuery.substring(0, tempQuery.length - 1)}`;
      }

      tempQuery = '';
    }

    if (this.filterListTag.length > 0) {
      this.tags.forEach((tag, index) => {
        if (this.filterListTag[index]) {
          tempQuery = `${tempQuery}${tag.name},`;
        }
      });

      if (tempQuery !== '') {
        if (query === '') {
          query = `?tagName=${tempQuery.substring(0, tempQuery.length - 1)}`;
        } else {
          query = `${query}&tagName=${tempQuery.substring(0, tempQuery.length - 1)}`;
        }
      }
    }

    if (this.filterQuantity) {
      if (query === '') {
        query = `?quantity=${this.filterQuantity}`;
      } else {
        query = `${query}&quantity=${this.filterQuantity}`;
      }
    }

    if (this.filterOrderBy) {
      console.log(query);
      if (query === '') {
        query = `?orderBy=${this.filterOrderBy}`;
      } else {
        query = `${query}&orderBy=${this.filterOrderBy}`;
      }
    }

    if (this.filterOrderOrder) {
      if (query === '') {
        query = `?order=${this.filterOrderOrder ? 'ASC' : 'DESC'}`;
      } else {
        query = `${query}&order=${this.filterOrderOrder ? 'ASC' : 'DESC'}`;
      }
    }

    if (this.search && this.search !== '') {
      if (query === '') {
        query = `?productName=${this.search}`;
      } else {
        query = `${query}&productName=${this.search}`;
      }
    }

    if (this.filterDateOne && this.filterDateTwo) {
      if (query === '') {
        query = `?rangeDate=${this.filterDateOne}|${this.filterDateTwo}`;
      } else {
        query = `${query}&rangeDate=${this.filterDateOne}|${this.filterDateTwo}`;
      }
    }
    return query;
  }
}
