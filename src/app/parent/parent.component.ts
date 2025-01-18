import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  userForm: FormGroup;

  users: User[] = [];
  userName: string = '';
  userAge: number | null = null;
  userSalary: number | null = null;
  userId: number | null = null;
  private userNextId = 1;

  isOnEditUser = false;

  editUserIdValue: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      salary: ['', [Validators.required, Validators.maxLength(2)]],
    });
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();

    const iduser = Number(this.route.snapshot.paramMap.get('id'));

    if (iduser) {
      this.onEditCall(iduser);
    }

    this.userNextId =
      this.userService.getUsers.length > 0
        ? Math.max(...this.users.map((user) => user.id)) + 1
        : 1;
  }

  

  addUser() {
    if (this.userForm.valid) {
      const userFormValue = this.userForm.value;

      if (this.isOnEditUser && this.editUserIdValue != null) {
        this.userService.updateUser({
          id: this.editUserIdValue,
          name: userFormValue.name,
          age: userFormValue.age,
          salary: userFormValue.salary,
        });
      } else {
        const userInit = {
          id: this.userNextId++,
          ...userFormValue,
        };
        this.resetFormValue();
        this.userService.addUser(userInit);
      }

      this.ngOnInit();
    }
  }

  onDeleteCall(userId: number) {
    this.userService.deleteUser(userId);
    this.users = this.userService.getUsers();
  }

  onEditCall(userId: number) {
    const userEdit = this.users.find((user) => user.id === user.id);
    if (userEdit) {
      this.isOnEditUser = true;
      this.editUserIdValue = userId;
      this.userForm.setValue({ name: userEdit.name, age: userEdit.age,salary:userEdit.salary });
    }
  }

  resetFormValue() {
    this.userForm.reset();
    this.isOnEditUser = false;
    this.editUserIdValue = null;
  }

  // updateUser() {
  //   if (this.userId !== null && this.userName && this.userAge !== null) {
  //     const updatedUser = new User(this.userId, this.userName, this.userAge);
  //     this.userService.updateUser(updatedUser);
  //     this.users = this.userService.getUsers();
  //     this.clearInputs();
  //   }
  // }
  // onEditUser(user: User) {
  //   this.userId = user.id;
  //   this.userName = user.name;
  //   this.userAge = user.age;
  // }

  clearInputs() {
    this.userId = null;
    this.userName = '';
    this.userAge = null;
    this.userSalary;
  }
}
