import { Injectable } from '@angular/core';
import { Note } from '../class/note';
import { NoteIterface } from '../interface/note-iterface';
import * as sampleNotes from './../data/notes.json';

@Injectable()
export class NotesService {
  private _notes: Array<NoteIterface>;

  constructor() {
    this.setDefaultNotes();
  }

  private setDefaultNotes() {
    this._notes =
      sampleNotes[Object.keys(sampleNotes).find(key => key === 'default')].map(
        sampleNote => sampleNote as NoteIterface
      ) || new Array<NoteIterface>();
  }

  get notes(): Array<NoteIterface> {
    return this._notes;
  }

  set notes(newNotes: Array<NoteIterface>) {
    this._notes = newNotes;
  }
}
