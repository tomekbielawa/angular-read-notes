import { Injectable } from '@angular/core';
import { Note } from '../class/note';
import { NoteIterface } from '../interface/note-iterface';
import * as sampleNotes from './../data/notes.json';

@Injectable()
export class NotesService {
  private _notes: Array<NoteIterface>;
  private _currentNote: NoteIterface;
  private _currentNoteIndex = 0;

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

  getNote(id: string): NoteIterface {
    this.currentNote = this.notes.find(note => note.id === id) || null;

    return this.currentNote;
  }

  get currentNote(): NoteIterface {
    return this._currentNote;
  }

  set currentNote(note: NoteIterface) {
    this._currentNote = note;
    this._currentNoteIndex = this.notes.findIndex(
      _note => _note.id === note.id
    );
  }

  previousNote() {
    const previousNote = this.getPreviousNote();

    if (previousNote) {
      this.currentNote = previousNote;
    }
  }

  getPreviousNote(): NoteIterface {
    return this.notes[this._currentNoteIndex - 1] || null;
  }

  nextNote() {
    const nextNote = this.getNextNote();

    if (nextNote) {
      this.currentNote = nextNote;
    }
  }

  getNextNote(): NoteIterface {
    return this.notes[this._currentNoteIndex + 1] || null;
  }
}
