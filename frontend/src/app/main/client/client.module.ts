import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ListComponent } from "./pages/list/list.component";
import { ClientRoutingModule } from "./client-routing.module";
import { DetailComponent } from "./pages/detail/detail.component";

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ClientModule { };