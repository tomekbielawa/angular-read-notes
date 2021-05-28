import { Component, Input, OnInit } from '@angular/core';
import { NoteIterface } from '../interface/note-iterface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() note: NoteIterface;

  constructor() {}

  ngOnInit() {}
}
