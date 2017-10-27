import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  userId: String;
  user: User;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
    this.userId = params['userId']);
    // this.user = this.userService.findUserById(this.userId);
    this.userService.findUserById(this.userId)
      .subscribe((user: User) => {
        this.user = user;
      });

    // if (!this.user) {
    //   this.router.navigate(['/login']);
    // }
  }

}
