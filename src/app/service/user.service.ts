import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{id: 1, name: 'saeed', age: 25},];

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
}