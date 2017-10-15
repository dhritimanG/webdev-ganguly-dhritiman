import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {User} from '../models/user.model.client';

// injecting service into module
@Injectable()

export class UserService {

  constructor() { }

  users: User[] = [
    {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
    {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
    // ... rest of user objects
  ];

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername
  };

  createUser(user: any) {
    user._id = Math.random();
    this.users.push(user);
    return user;
  }

  findUserById(userId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {  return this.users[x]; }
    }
  }

  findUserByUsername(username: String) {
    return this.users.find(function (user) {
      return user.username === username;
    });
  }

  findUserByCredentials(username: String, password: String) {
    return this.users.find(function (user) {
      return user.username === username && user.password === password;
    });
  }
  // updateUser(userId, user) { … }
  // deleteUser(userId) { … }
}
