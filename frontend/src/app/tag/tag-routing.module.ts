import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./pages/list/list.component";
import { DetailComponent } from "./pages/detail/detail.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "register",
    component: DetailComponent
  },
  {
    path: "edit/:id",
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { };