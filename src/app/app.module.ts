import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthServiceService} from './services/auth-service.service';
import {FirebaseAuthService} from './services/firebase/firebase-auth.service';
import {FirebaseService} from './services/firebase/firebase.service';
import {TemplateDialogComponent} from './dialog/template-dialog/template-dialog.component';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {MainComponent} from './main/main.component';
import {NoFoundComponent} from './no-found/no-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {CategoriesDialogComponent} from './dialog/categories-dialog/categories-dialog.component';
import {CartsDialogComponent} from './dialog/carts-dialog/carts-dialog.component';
import {ClientsDialogComponent} from './dialog/clients-dialog/clients-dialog.component';
import {OrdersDialogComponent} from './dialog/orders-dialog/orders-dialog.component';
import {ProductsDialogComponent} from './dialog/products-dialog/products-dialog.component';
import {ReviewsDialogComponent} from './dialog/reviews-dialog/reviews-dialog.component';
import {RolesDialogComponent} from './dialog/roles-dialog/roles-dialog.component';
import {UsersDialogComponent} from './dialog/users-dialog/users-dialog.component';
import {CartApiService} from './services/api/cart-api.service';
import {CategoryApiService} from './services/api/category-api.service';
import {OrderApiService} from './services/api/order-api.service';
import {PaymentApiService} from './services/api/payment-api.service';
import {ProductApiService} from './services/api/product-api.service';
import {ProductImageApiService} from './services/api/product-image-api.service';
import {ReviewApiService} from './services/api/review-api.service';
import {SingUpEmailApiService} from './services/api/sing-up-email-api.service';
import {TransactionApiService} from './services/api/transaction-api.service';
import {UserApiService} from './services/api/user-api.service';
import {ProductCategoryApiService} from './services/api/product-category-api.service';
import {GuideDialogComponent} from './dialog/guide-dialog/guide-dialog.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {ForgotDialogComponent} from './dialog/forgot-dialog/forgot-dialog.component';
import {HandleRequestService} from './services/api/handle-request.service';
import {CustomSnackbarService} from './services/custom-snackbar.service';
import {LanguageDialogComponent} from './dialog/language-dialog/language-dialog.component';
import {AuthClientService} from './services/auth-client.service';
import {ClientOrderDialogComponent} from './dialog/client-order-dialog/client-order-dialog.component';
import {ClientPaymentDialogComponent} from './dialog/client-payment-dialog/client-payment-dialog.component';
import {ChatService} from './services/chat.service';
import {ChatAuthService} from './services/chat-auth.service';
import {CartProductsApiService} from './services/api/cart-products-api.service';
import {TagsDialogComponent} from './dialog/tags-dialog/tags-dialog.component';
import {RoleApiService} from './services/api/role-api.service';
import {PaymentDialogComponent} from './dialog/payment-dialog/payment-dialog.component';
import {StripeCheckoutModule} from 'ng-stripe-checkout';
import {MapService} from './services/map.service';
import {NgxPayPalModule} from 'ngx-paypal';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NoFoundComponent,
    TemplateDialogComponent,
    ConfirmDialogComponent,
    CartsDialogComponent,
    CategoriesDialogComponent,
    ClientsDialogComponent,
    OrdersDialogComponent,
    ProductsDialogComponent,
    ReviewsDialogComponent,
    RolesDialogComponent,
    UsersDialogComponent,
    GuideDialogComponent,
    TagsDialogComponent,
    ForgotDialogComponent,
    LanguageDialogComponent,
    ClientOrderDialogComponent,
    ClientPaymentDialogComponent,
    PaymentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    StripeCheckoutModule,
    NgxPayPalModule
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage,
    AngularFireDatabase,
    FirebaseService,
    FirebaseAuthService,
    AuthServiceService,
    AuthClientService,
    CartApiService,
    CartProductsApiService,
    CategoryApiService,
    OrderApiService,
    PaymentApiService,
    ProductApiService,
    ProductImageApiService,
    ReviewApiService,
    SingUpEmailApiService,
    TransactionApiService,
    UserApiService,
    RoleApiService,
    ProductCategoryApiService,
    HandleRequestService,
    CustomSnackbarService,
    ChatService,
    ChatAuthService,
    MapService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    CartsDialogComponent,
    CategoriesDialogComponent,
    ClientsDialogComponent,
    OrdersDialogComponent,
    ProductsDialogComponent,
    ReviewsDialogComponent,
    RolesDialogComponent,
    UsersDialogComponent,
    GuideDialogComponent,
    ForgotDialogComponent,
    ClientOrderDialogComponent,
    ClientPaymentDialogComponent,
    TagsDialogComponent,
    PaymentDialogComponent
  ]
})

export class AppModule {
}
