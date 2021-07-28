import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./components/create/create.component";

const adminRouterConfig: Routes = [
  {
    path: 'products/create',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRouterConfig)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
