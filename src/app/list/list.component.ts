import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Note } from '../class/note';
import { NotesService } from '../service/notes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  notes: Array<Note>;
  pageEvent: PageEvent = new PageEvent();
  pageIndex = 0;
  pageSize = 2;
  pagesLength = 0;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.pagesLength = this.notesService.notesLength;

    this.notes = this.notesService.getNotesPaginated(
      this.pageIndex,
      this.pageSize
    );

    console.log('this.notes', this.notes);
  }

  getData(event: PageEvent) {
    console.log('pageIndex?', this.pageEvent.pageIndex);
    console.log('pageSize', this.pageEvent.pageSize);
    console.log(event.pageIndex);

    this.notes = this.notesService.getNotesPaginated(
      this.pageEvent.pageIndex,
      this.pageEvent.pageSize
    );

    console.log('this.notes', this.notes);

    return event;
  }

  addClipping(newNote: Note) {
    this.notes.unshift(newNote);
  }
}
