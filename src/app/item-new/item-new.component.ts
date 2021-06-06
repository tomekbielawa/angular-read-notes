import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NotesService } from '../service/notes.service';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {
  itemForm: FormGroup;
  filteredOptions: Observable<Array<string>>;

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = new FormGroup({
      author: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      text: new FormControl(null)
    });
  }

  onSubmit() {
    if (!this.itemForm.valid) {
      return;
    }

    this.notesService.createNewNote(this.itemForm.value).then(
      newNote => {
        this.router.navigate(['notes']);
      },
      error => console.error(error)
    );
  }
}
