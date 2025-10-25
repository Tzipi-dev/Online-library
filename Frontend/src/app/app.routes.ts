import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { LoansComponent } from './loans/loans.component';
import { ManagementComponent } from './management/management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'management', component: ManagementComponent },
  { path: '**', redirectTo: '/catalog' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
