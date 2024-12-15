import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] =[];

  constructor() { }

  getUsers() {
    return [...this.users];
  };

  addUser(user: User) {
    this.users.push(user);
  }


  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  
  }

  updateUser(updatedUser: User) {
  const index = this.users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    this.users[index] = updatedUser;
    console.log('update successs', this.users[index]);
  } else {
    console.error('not update')
  }
}

}