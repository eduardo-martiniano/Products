import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing";
import { CreateComponent } from "./components/create/create.component";

@NgModule({
  declarations: [
    CreateComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
    ],
  providers: []
})
export class AdminModule { }
