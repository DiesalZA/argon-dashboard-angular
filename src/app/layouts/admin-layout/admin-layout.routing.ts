import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { StockDetailComponent } from '../../pages/stock-detail/stock-detail.component';
import { TransactionFormComponent } from '../../pages/transaction-form/transaction-form.component';
import { ReportsComponent } from '../../pages/reports/reports.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',           component: DashboardComponent },
    { path: 'user-profile',        component: UserProfileComponent },
    { path: 'tables',              component: TablesComponent },
    { path: 'icons',               component: IconsComponent },
    { path: 'maps',                component: MapsComponent },
    { path: 'reports',             component: ReportsComponent },
    { path: 'stock/:symbol',       component: StockDetailComponent },
    { path: 'transaction/add',     component: TransactionFormComponent },
    { path: 'transaction/edit/:id', component: TransactionFormComponent }
];
