import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {NoFoundComponent} from './no-found/no-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'client',
      },
      {
        path: 'index',
        loadChildren: './page/page.module#PageModule',
      },
      {
        path: 'cPanel',
        loadChildren: './c-panel/c-panel.module#CPanelModule',
      },
      {
        path: 'client',
        loadChildren: './client-panel/client-panel.module#ClientPanelModule',
      },
    ]
  },
  {
    path: 'no-found',
    component: NoFoundComponent
  },
  {
    path: '**',
    redirectTo: 'no-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
