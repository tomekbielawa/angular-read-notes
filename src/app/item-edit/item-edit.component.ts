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
import { censorshipValidator } from '../validators/censorship.validator';
import { duplicatesValidator } from '../validators/duplicates.validator';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  itemForm: FormGroup;
  item: Note;
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

    this.setForm();
  }

  setForm() {
    this.itemForm = new FormGroup(
      {
        id: new FormControl(),
        author: new FormControl(null, [
          Validators.required,
          Validators.minLength(5)
        ]),
        title: new FormControl(null, [
          Validators.required,
          Validators.minLength(5)
        ]),
        text: new FormControl(),
        tags: new FormControl(null, [duplicatesValidator()])
      },
      { validators: [censorshipValidator] }
    );

    this.itemForm.setValue(this.item);
  }

  get author(): AbstractControl {
    return this.itemForm.get('author');
  }

  get title(): AbstractControl {
    return this.itemForm.get('title');
  }

  addTag(event: MatChipInputEvent) {
    const formTags = this.itemForm.get('tags').value,
      value = (event.value || '').trim();

    if (formTags && value) {
      formTags.push({ name: value });
    }

    event.input.value = '';

    this.findIfTagsHasDuplicates();
  }

  removeTag(tag: Tag) {
    const formTags = this.itemForm.get('tags').value,
      index = formTags && formTags.indexOf(tag);

    if (index >= 0) {
      formTags.splice(index, 1);
    }

    this.findIfTagsHasDuplicates();
  }

  findIfTagsHasDuplicates() {
    const formTags = this.itemForm.get('tags'),
      fieldErrors = duplicatesValidator()(formTags);

    formTags.setErrors(fieldErrors || null);
  }

  // @TODO
  onSubmit() {
    if (this.itemForm.valid) {
      // do some funny stuff
      console.log('Form is valid with:', this.itemForm.value.tags);
    }
  }
}
