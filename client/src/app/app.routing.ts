import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { CpvcComponent } from './components/cpvc/cpvc.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'allproducts', component: AllproductsComponent },
  { path: 'cpvc', component: CpvcComponent },
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
]
