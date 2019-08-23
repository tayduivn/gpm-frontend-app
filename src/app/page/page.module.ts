import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageRoutingModule} from './page-routing.module';
import {LoginComponent} from './login/login.component';
import {ForgotComponent} from './forgot/forgot.component';
import {RegisterComponent} from './register/register.component';
import {PoliticsComponent} from './politics/politics.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MembershipComponent} from './membership/membership.component';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {TermsComponent} from './terms/terms.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ForgotComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    MembershipComponent,
    PoliticsComponent,
    RegisterComponent,
    TermsComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxLoadingModule.forRoot({}),
    MatSelectModule,
    MatButtonModule,
  ]
})
export class PageModule {
}
