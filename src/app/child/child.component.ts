import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const iduser = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.userService.getUsers().find((u) => (u.id = iduser))!;
  }

  // @Output()
  // selectedUserId = new EventEmitter<number>();

  // @Output()
  // selectedUserIdUpdate = new EventEmitter<number>();

  // onButtonClick() {
  //   this.selectedUserId.emit(this.user.id);
  // }

  // onButtonEditClick() {
  //   this.selectedUserIdUpdate.emit(this.user.id);
  // }

  // @Output()
  // editUser = new EventEmitter<User>();

  // onEditClick() {
  //   this.editUser.emit(this.user);
  // }
}
