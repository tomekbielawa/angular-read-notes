import { NgModule } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { ItemNewComponent } from '../item-new/item-new.component';
import { ItemEditComponent } from '../item-edit/item-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: ListComponent },
  {
    path: 'notes/new',
    component: ItemNewComponent
  },
  {
    path: 'notes/:id/edit',
    component: ItemEditComponent
  },
  {
    path: 'notes/:id',
    component: ItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
