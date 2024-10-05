import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import {DashboardComponent} from './dashboard/dashboard.component'
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ManualEntryComponent} from './Customer/manual-entry/manual-entry.component';
import {BulkEntryComponent} from './Customer/bulk-entry/bulk-entry.component';
import {CustomerDataComponent} from './Customer/customer-data/customer-data.component';
import {ListInvoiceComponent} from './Invoice/list-invoice/list-invoice.component';
import {GenerateInvoiceComponent} from './Invoice/generate-invoice/generate-invoice.component';
import {InvoiceDetailsComponent} from './Invoice/invoice-details/invoice-details.component';
import {PaymentHistoryComponent} from './Payment/payment-history/payment-history.component';
import {MarkCashComponent} from './Payment/mark-cash/mark-cash.component';
import {ProfileComponent} from './profile/profile.component';


export const routes: Routes = [
  {path:'register',component:RegisterComponent},
  { path: 'login', component: LoginComponent }, 
  
  {path: '',component: DefaultLayoutComponent,
    children: [
      {path:'profile',component:ProfileComponent},
      {path: 'dashboard',component:DashboardComponent},
      {path:'manual',component:ManualEntryComponent},
      {path:'bulk',component:BulkEntryComponent},
      {path:'customerData',component:CustomerDataComponent},
      {path:'listInvoice',component:ListInvoiceComponent},
      {path:'uploadInvoice',component:GenerateInvoiceComponent},
      {path:'paymentHistory',component:PaymentHistoryComponent},
      {path:'markCash',component:MarkCashComponent},
      {path:'invoice/:billId',component:InvoiceDetailsComponent},
    ]
  },
  { path: '', redirectTo: '/register', pathMatch: 'full' }     
]
