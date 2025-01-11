import { Injectable } from '@angular/core';
import { User } from '../model/user.model';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] =[];
  private currentId = 1;
  
  private userUrl = environment.userUrl;
  private localStorageKey = 'users';

  constructor(private http: HttpClient) {

   }

   loadUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.userUrl).pipe(
        tap(users => {
          if(!localStorage.getItem(this.localStorageKey)) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(users));
          }
      
        })

      );

   }

  getUsers() {
    const users = localStorage.getItem(this.localStorageKey);
    this.users = users ? JSON.parse(users) : [];
    return this.users;
  };

  addUser(user: User) {
    user.id = this.currentId++;
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