import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CompletedBuyComponent } from './components/completed-buy/completed-buy.component';
import { ReadComponent } from './components/read/read.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedGuard } from './services/guards/shared.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "products",
    component: ReadComponent
  },
  {
    path :"shopping-cart",
    component: ShoppingCartComponent
  },
  {
    path :"checkout",
    component: CheckoutComponent
  },
  {
    path :"finish/:buyId",
    component: CompletedBuyComponent
  },
  {
    path :'', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canLoad: [SharedGuard],
    canActivate: [SharedGuard],
    data: {role: "admin"}
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
