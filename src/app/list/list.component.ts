import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Note } from '../class/note';
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
  clippings: { file: string; items: Array<string> } = { file: '', items: [] };

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes = this.notesService.notes;
  }

  // @TODO - refaktor: wyniesc z tego komponenetu
  importNotesFromClippingFile(element: any) {
    const file = element.target.files,
      fileReader = new FileReader();

    fileReader.onload = () => {
      this.clippings.file = fileReader.result.toString();
    };
    fileReader.readAsText(file[0]);
  }

  // @TODO - refaktor: wyniesc z tego komponenetu
  reloadClippings() {
    const titleAndAuthorRegexp = /(.+) \((.+)\)\r*\n(.+)\r*\n(.+)*\r*\n(.+)*/gi;

    this.clippings.items = this.clippings.file.split('==========');

    this.clippings.items.forEach(clipping => {
      let clippingData;

      while ((clippingData = titleAndAuthorRegexp.exec(clipping)) !== null) {
        const newNote = new Note();
        newNote.title = clippingData[1] || '';
        newNote.author = clippingData[2] || '';
        newNote.text = clippingData[5] || '';

        this.notes.unshift(newNote);
      }
    });
  }
}
