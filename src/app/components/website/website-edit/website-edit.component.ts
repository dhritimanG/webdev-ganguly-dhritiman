import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId: String;
  website = {};
  websites = [{}];
  websiteId: String;
  siteName: String;
  siteDesc: String;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.websites = this.websiteService.findWebsitesByUser(this.userId);
      this.website = this.websiteService.findWebsiteById(this.websiteId);
      this.siteName = this.website['name'];
      this.siteDesc = this.website['description'];
    });
  }

  updateWebsite() {
    this.website['name'] = this.siteName;
    this.website['description'] = this.siteDesc;
    this.website = this.websiteService.updateWebsite(this.websiteId, this.website);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId);
  }

}
