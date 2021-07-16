import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredencialesGuard } from './pages/login/credenciales.guard';

const routes: Routes = [

  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {path: '**', pathMatch: 'full', redirectTo: 'login' },
  {path: '', pathMatch: 'full', redirectTo: 'login' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
