import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoadDataGuard } from './guards/load-data.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'lost-password',
    loadChildren: () => import('./pages/lost-password/lost-password.module').then(m => m.LostPasswordModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'icons-edit',
    loadChildren: () => import('./pages/icons-edit/icons-edit.module').then(m => m.IconsEditModule),
    canActivate: [LoadDataGuard]
  },
  {
    path: 'account-settings',
    loadChildren: () => import('./pages/account-settings/account-settings.module').then(m => m.AccountSettingsPageModule),
    canActivate: [LoadDataGuard]
  },
  {
    path: 'linked-accounts',
    loadChildren: () => import('./pages/linked-accounts/linked-accounts.module').then(m => m.LinkedAccountsPageModule),
    canActivate: [LoadDataGuard]
  },
  {
    path: 'account-follows/:tab',
    loadChildren: () => import('./pages/account-follows/account-follows.module').then(m => m.AccountFollowsModule),
    canActivate: [LoadDataGuard]
  },
  {
    path: 'card-collections',
    loadChildren: () => import('./pages/card-collections/card-collections.module').then(m => m.CardCollectionsModule),
    canActivate: [LoadDataGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
    canActivate: [LoadDataGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
