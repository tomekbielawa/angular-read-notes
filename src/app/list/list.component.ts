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
  pagesLength = 0;
  pageIndex = 0;
  pageSize = 2;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.pagesLength = this.notesService.notesLength;

    this.getData();
  }

  getData() {
    this.notes = this.notesService.getNotesPaginated(
      this.pageIndex,
      this.pageSize
    );
  }

  getPaginatedData(event: PageEvent) {
    const { pageIndex, pageSize } = event;

    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.notes = this.notesService.getNotesPaginated(pageIndex, pageSize);

    return event;
  }

  addClipping(newNote: Note) {
    this.notes.unshift(newNote);
  }
}
