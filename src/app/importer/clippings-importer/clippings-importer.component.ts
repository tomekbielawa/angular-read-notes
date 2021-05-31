import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../../class/note';
import { NoteIterface } from '../../interface/note-iterface';

@Component({
  selector: 'app-clippings-importer',
  templateUrl: './clippings-importer.component.html',
  styleUrls: ['./clippings-importer.component.css']
})
export class ClippingsImporterComponent implements OnInit {
  @Output() onClippingsChange: EventEmitter<NoteIterface> = new EventEmitter();

  clippings: { file: string; items: Array<string> } = { file: '', items: [] };

  constructor() {}

  ngOnInit() {}

  importNotesFromClippingFile(element: any) {
    const file = element.target.files,
      fileReader = new FileReader();

    fileReader.onload = () => {
      this.clippings.file = fileReader.result.toString();
    };
    fileReader.readAsText(file[0]);
  }

  reloadClippings() {
    const clippingNoteRegexp = /(.+) \((.+)\)\r*\n(.+)\r*\n(.+)*\r*\n(.+)*/gi;

    this.clippings.items = this.clippings.file.split('==========');

    this.clippings.items.forEach(clipping => {
      let clippingData;

      while ((clippingData = clippingNoteRegexp.exec(clipping)) !== null) {
        const newNote = new Note();
        newNote.title = clippingData[1] || '';
        newNote.author = clippingData[2] || '';
        newNote.text = clippingData[5] || '';

        this.onClippingsChange.emit(newNote);
      }
    });
  }
}
