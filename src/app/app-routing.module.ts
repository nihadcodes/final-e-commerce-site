import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{
  path:'',
  component:HomeComponent,
},

{
path:'seller',
  component:SellerComponent,
},

{
  path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
