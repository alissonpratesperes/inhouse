import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', loadChildren: () => import('./client/client.module').then(module => module.ClientModule) },
  { path: 'tags', loadChildren: () => import('./tag/tag.module').then(module => module.TagModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };