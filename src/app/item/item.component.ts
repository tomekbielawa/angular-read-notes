import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NoteIterface } from '../interface/note-iterface';
import { NotesService } from '../service/notes.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() note: NoteIterface;
  noteId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('id');
    this.getNote();
  }

  getNote() {
    if (!this.note && this.noteId) {
      this.note = this.notesService.getNote(this.noteId);
    }
  }

  canNavigateToPreviousNote() {
    return !!this.notesService.getPreviousNote();
  }

  canNavigateToNextNote() {
    return !!this.notesService.getNextNote();
  }

  navigateToPreviousNote() {
    this.notesService.previousNote();
    this.routeToNote();
  }

  navigateToNextNote() {
    this.notesService.nextNote();
    this.routeToNote();
  }

  private routeToNote() {
    if(this.notesService.currentNote) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate([`/notes/${this.notesService.currentNote?.id}`]);
    }
  }
}
