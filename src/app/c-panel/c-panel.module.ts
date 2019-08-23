import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CPanelRoutingModule} from './c-panel-routing.module';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {CartsComponent} from './carts/carts.component';
import {CategoriesComponent} from './categories/categories.component';
import {ClientsComponent} from './clients/clients.component';
import {GuideComponent} from './guide/guide.component';
import {OrdersComponent} from './orders/orders.component';
import {PaymentsComponent} from './payments/payments.component';
import {ProductsComponent} from './products/products.component';
import {ProfileComponent} from './profile/profile.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {RolesComponent} from './roles/roles.component';
import {SingUpEmailsComponent} from './sing-up-emails/sing-up-emails.component';
import {UsersComponent} from './users/users.component';
import {CPanelComponent} from './c-panel/c-panel.component';
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
import {ChatsComponent} from './chats/chats.component';
import {ChatComponent} from './chat/chat.component';
import {TagsComponent} from './tags/tags.component';
import {InfoPageComponent} from './info-page/info-page.component';

@NgModule({
  declarations: [
    CPanelComponent,
    LoginComponent,
    HomeComponent,
    CartsComponent,
    CategoriesComponent,
    ClientsComponent,
    GuideComponent,
    OrdersComponent,
    PaymentsComponent,
    ProductsComponent,
    ProfileComponent,
    ReviewsComponent,
    RolesComponent,
    SingUpEmailsComponent,
    UsersComponent,
    ChatsComponent,
    ChatComponent,
    TagsComponent,
    InfoPageComponent,
  ],
  imports: [
    CommonModule,
    CPanelRoutingModule,
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
    MatProgressBarModule
  ]
})
export class CPanelModule {
}
