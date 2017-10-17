import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registrationForm: NgForm;

  user: User;
  confirmPassword: String;
  errorFlag: Boolean;
  errorMsg: String;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User('', '', '', '', '', '');
  }

  createUser() {
    this.user.username = this.registrationForm.value.username;
    this.user.password = this.registrationForm.value.password;
    this.user.firstName = this.registrationForm.value.firstName;
    this.user.lastName = this.registrationForm.value.lastName;
    this.user.email = this.registrationForm.value.email;
    this.confirmPassword = this.registrationForm.value.confirmPassword;

    if (this.user.password !== this.confirmPassword) {
      this.errorFlag = true;
      this.errorMsg = 'Passwords do not match!';
    } else {
      const user = this.userService.findUserByUsername(this.user.username);
      if (user) {
        this.errorFlag = true;
        this.errorMsg = 'User already exists';
      } else {
        const newUser = this.userService.createUser(this.user);
        if (newUser) {
          this.router.navigate(['/user', user._id]);
        } else {
          this.errorFlag = true;
          this.errorMsg = 'Could not register!';
        }
      }
    }


  }
}