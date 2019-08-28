import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductsComponent} from './products/products.component';
import {GuideComponent} from './guide/guide.component';
import {ChatComponent} from './chat/chat.component';
import {TrendingComponent} from './trending/trending.component';
import {AuthClientService} from '../services/auth-client.service';
import {CartComponent} from './cart/cart.component';
import {ChatsComponent} from './chats/chats.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {MyProductsComponent} from './my-products/my-products.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'my-products',
        component: MyProductsComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'guide',
        component: GuideComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'chats',
        component: ChatsComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
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
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
      {
        path: 'trending',
        component: TrendingComponent,
        canActivate: [AuthClientService],
        data: {
          expectedRole: ['client']
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPanelRoutingModule {
}
