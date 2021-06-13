import { Injectable } from '@angular/core';

import { Note } from '../class/note';
import * as sampleNotes from './../data/notes.json';

@Injectable()
export class NotesService {
  private _notes: Array<Note>;
  private _currentNote: Note | null;
  private _currentNoteIndex = 0;

  constructor() {
    this.setDefaultNotes();
  }

  private setDefaultNotes() {
    this._notes =
      sampleNotes[Object.keys(sampleNotes).find(key => key === 'default')].map(
        sampleNote => sampleNote as Note
      ) || new Array<Note>();

    if (this._notes) {
      this.currentNote = this._notes[0];
    }
  }

  get notes(): Array<Note> {
    return this._notes;
  }

  get notesLength(): number {
    return this._notes.length || 0;
  }

  set notes(newNotes: Array<Note>) {
    this._notes = newNotes;
  }

  getNotesPaginated(index = 0, pagesLength = 2): Array<Note> {
    return this._notes.slice(index * pagesLength, (index + 1) * pagesLength);
  }

  getNote(id: string): Note {
    const _note = this.notes.find(note => note && note.id === id);
    if (_note) {
      this.currentNote = _note;
    }

    return this.currentNote;
  }

  get currentNote(): Note {
    return this._currentNote;
  }

  set currentNote(note: Note) {
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

  getPreviousNote(): Note {
    return this.notes[this._currentNoteIndex - 1] || null;
  }

  nextNote() {
    const nextNote = this.getNextNote();

    if (nextNote) {
      this.currentNote = nextNote;
    }
  }

  getNextNote(): Note {
    return this.notes[this._currentNoteIndex + 1] || null;
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  createNewNote(note: Note): Promise<Note> {
    return new Promise((resolve, reject) => {
      try {
        const newNote = new Note();
        Object.assign(newNote, note);

        this.addNote(newNote);

        resolve(newNote);
      } catch (e) {
        reject(e);
      }
    });
  }
}
