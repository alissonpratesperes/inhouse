import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'clients',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'tags',
        loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { };