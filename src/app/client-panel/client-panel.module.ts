import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientPanelRoutingModule} from './client-panel-routing.module';
import {HomeComponent} from './home/home.component';
import {CartComponent} from './cart/cart.component';
import {GuideComponent} from './guide/guide.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {ProfileComponent} from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {ChatComponent} from './chat/chat.component';
import {TrendingComponent} from './trending/trending.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {ChatsComponent} from './chats/chats.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {MyProductsComponent} from './my-products/my-products.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    GuideComponent,
    OrdersComponent,
    MyProductsComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProfileComponent,
    ChatComponent,
    TrendingComponent,
    ChatsComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ClientPanelRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressBarModule,
    SlickCarouselModule
  ]
})
export class ClientPanelModule {
}
