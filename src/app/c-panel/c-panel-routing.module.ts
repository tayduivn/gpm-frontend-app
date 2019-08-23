import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CPanelComponent} from './c-panel/c-panel.component';
import {ClientsComponent} from './clients/clients.component';
import {OrdersComponent} from './orders/orders.component';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductsComponent} from './products/products.component';
import {CategoriesComponent} from './categories/categories.component';
import {SingUpEmailsComponent} from './sing-up-emails/sing-up-emails.component';
import {PaymentsComponent} from './payments/payments.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {GuideComponent} from './guide/guide.component';
import {LoginComponent} from './login/login.component';
import {AuthServiceService} from '../services/auth-service.service';
import {ChatComponent} from './chat/chat.component';
import {AuthClientService} from '../services/auth-client.service';
import {ChatsComponent} from './chats/chats.component';
import {TagsComponent} from './tags/tags.component';

const routes: Routes = [
  {
    path: '',
    component: CPanelComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'client',
        component: ClientsComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'chats',
        component: ChatsComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'chat/:chatId',
        component: ChatComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'tags',
        component: TagsComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'emails',
        component: SingUpEmailsComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
      {
        path: 'guide',
        component: GuideComponent,
        canActivate: [AuthServiceService],
        data: {
          expectedRole: ['admin']
        },
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthServiceService],
    data: {
      expectedRole: ['admin']
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CPanelRoutingModule {
}
