import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CreateComponent } from './components/create/create.component';
import { ReadComponent } from './components/read/read.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: "",
    component: ReadComponent
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
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
