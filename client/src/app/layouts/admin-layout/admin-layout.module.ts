import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CreateproductComponent } from '../../pages/createproduct/createproduct.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdtypePipe } from 'app/prodtype.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    ProductsComponent,
    CreateproductComponent,
    OrdersComponent,
    ProdtypePipe
  ]
})

export class AdminLayoutModule { }
