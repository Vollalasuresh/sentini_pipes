import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CreateproductComponent } from 'app/pages/createproduct/createproduct.component';
import { CpvcComponent } from 'app/components/cpvc/cpvc.component';
import { DealerproductsComponent } from 'app/pages/dealerproducts/dealerproducts.component';
import { CartComponent } from 'app/pages/cart/cart.component';
import { AuthGuard } from 'app/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'createproduct', component: CreateproductComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'dealerproducts', component: DealerproductsComponent },
    { path: 'cpvc', component: CpvcComponent }
];
