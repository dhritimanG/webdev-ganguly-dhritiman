import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  username: String;
  password: String;

  constructor(private userService: UserService, private router: Router) {

  }

  landing(username: String, password: String) {
    const user: User = this.userService.findUserByCredentials(username, password);
    if (user) {
      this.router.navigate(['./user', user._id]);

    }
  }

  ngOnInit() {
  }

}
