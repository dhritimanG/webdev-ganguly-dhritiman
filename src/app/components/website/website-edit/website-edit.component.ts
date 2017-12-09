import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') websiteEditForm: NgForm;
  website = {};
  userId: string;
  user: any;
  wid: string;
  websites = [{}];

  constructor(private webService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          // this.userId = params['userId'];
          this.user = this.sharedService.user;
        }
      );
    this.userService.findUserById(this.user._id)
      .subscribe(
        (user: any) => {
          this.user = user;
        }
      );


    this.activatedRoute.params
      .subscribe(params => {
        this.user = this.sharedService.user || {};
        console.log(this.user.username);
        console.log(this.user._id);
      });


    this.webService.findWebsitesByUser(this.user._id)
      .subscribe(
        (websites: any) => {
          this.websites = websites;
        }
      );
  }

  update() {
    this.webService.updateWebsite(this.wid, this.website)
      .subscribe(
        (website: any) => {
          this.router.navigate(['website']);
        }
      );
  }

  delete() {
    this.webService.deleteWebsite(this.wid)
      .subscribe(
        (website: any) => {
          this.router.navigate(['website']);
        }
      );
  }

}
