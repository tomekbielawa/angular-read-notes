import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NoteIterface } from '../interface/note-iterface';
import { NotesService } from '../service/notes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  notes: Array<NoteIterface>;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes = this.notesService.notes;
  }

  addClipping(newNote: NoteIterface) {
    this.notes.unshift(newNote);
  }
}
