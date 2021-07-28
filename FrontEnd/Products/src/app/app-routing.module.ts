import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CompletedBuyComponent } from './components/completed-buy/completed-buy.component';
import { CreateComponent } from './components/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { ReadComponent } from './components/read/read.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: "",
    component: ReadComponent
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
    path :"products/create",
    component: CreateComponent
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
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
