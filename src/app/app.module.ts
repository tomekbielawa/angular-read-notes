import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NotesService } from './service/notes.service';
import { ItemComponent } from './item/item.component';
import { RoutingModule } from './routing/routing.module';
import { ClippingsImporterComponent } from './importer/clippings-importer/clippings-importer.component';
import { ItemNewComponent } from './item-new/item-new.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    ListComponent,
    ItemComponent,
    ClippingsImporterComponent,
    ItemNewComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    NotesService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' }
    }
  ]
})
export class AppModule {}
