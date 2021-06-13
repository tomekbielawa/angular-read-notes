import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../service/notes.service';
import { Note } from '../class/note';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  itemForm: FormGroup;
  item: Note;

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.item = this.noteService.getNote(this.route.snapshot.params.id);

    this.setForm();
  }

  setForm() {
    this.itemForm = new FormGroup({
      id: new FormControl(),
      author: new FormControl(null, [
        Validators.compose([Validators.required, Validators.minLength(5)])
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      text: new FormControl(),
      tags: new FormControl()
    });

    this.itemForm.setValue(this.item);
  }

  get author(): AbstractControl {
    return this.itemForm.get('author');
  }

  get title(): AbstractControl {
    return this.itemForm.get('title');
  }

  onSubmit() {
    if (this.itemForm.valid) {
      // do some funny stuff
    }
  }
}
