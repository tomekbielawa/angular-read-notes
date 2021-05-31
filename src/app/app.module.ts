import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NotesService } from './service/notes.service';
import { ItemComponent } from './item/item.component';
import { RoutingModule } from './routing/routing.module';
import { ClippingsImporterComponent } from './importer/clippings-importer/clippings-importer.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RoutingModule],
  declarations: [AppComponent, ListComponent, ItemComponent, ClippingsImporterComponent],
  bootstrap: [AppComponent],
  providers: [NotesService]
})
export class AppModule {}
