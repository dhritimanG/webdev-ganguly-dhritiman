import {Component, OnInit, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  // properties
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg: String;


  constructor(private userService: UserService, private router: Router) {

  }

  landing() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    const user = this.userService.findUserByCredentials(this.username, this.password);
     if (user) {
      this.router.navigate(['/user', user._id]);
    } else {
      this.errorFlag = true;
      this.errorMsg = 'Invalid username or password !';
    }
  }

  ngOnInit() {
  }

}
