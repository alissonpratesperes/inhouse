import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TagRoutingModule } from "./tag-routing.module";
import { ListComponent } from "./pages/list/list.component";
import { DetailComponent } from "./pages/detail/detail.component";

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TagModule { };