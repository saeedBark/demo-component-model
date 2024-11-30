import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  users: User[] = [];
  userName: string = '';
  userAge: number | null = null;
  userId: number | null = null;


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  addUser() {
    let user1 = new User(this.userId!, this.userName, this.userAge!);

    this.userService.addUser(user1);
    this.ngOnInit();  

  }

  onDeleteCall(userId: number) {
    this.userService.deleteUser(userId);
    this.users = this.userService.getUsers();
  }

}
