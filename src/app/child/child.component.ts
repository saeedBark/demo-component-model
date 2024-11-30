import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input()
  user!: User;

  @Output()
  selectedUserId = new EventEmitter<number>();

  onButtonClick() {
    this.selectedUserId.emit(this.user.id);
  }
}
