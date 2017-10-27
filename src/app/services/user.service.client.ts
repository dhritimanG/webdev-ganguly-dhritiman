import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {User} from '../models/user.model.client';

// injecting service into module
@Injectable()

export class UserService {

  constructor(private http: Http) { }

  users: User[] = [
    {_id: '123', username: 'alice', password: 'alice', email: 'alice.wonder@gmail.com', firstName: 'Alice', lastName: 'Wonder'},
    {_id: '234', username: 'bob', password: 'bob', email: 'bob.marley@gmail.com', firstName: 'Bob', lastName: 'Marley'},
    {_id: '345', username: 'charly',   password: 'charly', email: 'charly.garcia@gmail.com', firstName: 'Charly', lastName: 'Garcia'  },
    {_id: '456', username: 'jannunzi', password: 'jannunzi', email: 'j.annunzi@gmail.com', firstName: 'Jose',   lastName: 'Annunzi' }
  ];

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'findUserByCredentials' : this.findUserByCredentials
  };

  createUser(user: any) {
    user._id = Math.random();
    this.users.push(user);
    return user;
  }

  findUserById(userId: String) {
    const url = 'http://localhost:3100/api/user/' + userId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
    // for (let x = 0; x < this.users.length; x++) {
    //   if (this.users[x]._id === userId) {  return this.users[x]; }
    // }
  }

  findUserByUsername(username: String) {
    return this.users.find(function (user) {
      return user.username === username;
    });
  }

  findUserByCredentials(username: String, password: String) {
    // return this.users.find(function (user) {
    //   return user.username === username && user.password === password;
    // });
    const url = 'http://localhost:3100/api/user?username=' + username + '&password=' + password;
    return this.http.get(url)
      .map(
        (response: Response) => {
        return response.json();
    });
  }

  updateUser(userId, user) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]['_id'] === userId) {
        this.users[x]['username'] = user.username;
        this.users[x]['email'] = user.email;
        this.users[x]['firstName'] = user.firstName;
        this.users[x]['lastName'] = user.lastName;
        return this.users[x];
      }
    }
  }
  deleteUser(userId) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        delete this.users[x];
      }
    }
  }

}
