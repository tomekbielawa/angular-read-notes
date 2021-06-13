import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { NotesService } from '../service/notes.service';
import { Note } from '../class/note';
import { Tag } from '../interface/tag-interface';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  itemForm: FormGroup;
  item: Note;
  tagList: Tag[] = new Array<Tag>();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.item = this.noteService.getNote(this.route.snapshot.params.id);
    this.tagList = this.item.tags;

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

  addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.tagList.push({ name: value });
    }
  }

  removeTag(tag: Tag) {
    const index = this.tagList.indexOf(tag);

    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }

  // @TODO
  onSubmit() {
    if (this.itemForm.valid) {
      // do some funny stuff
      console.log(this.itemForm.value.tags);
    }
  }
}
