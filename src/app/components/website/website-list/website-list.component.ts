import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: String;
  websites = [{}];

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // this.userId = params['userId'];
      // this.websites = this.websiteService.findWebsitesByUser(this.userId);
      this.userId = params['userId'];
      this.websiteService
        .findWebsitesByUser(this.userId)
        .subscribe((websites) => {
        this.websites = websites;
        });
    });
  }

}
