import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { ItemNewComponent } from '../item-new/item-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: ListComponent },
  {
    path: 'notes/new',
    component: ItemNewComponent
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
