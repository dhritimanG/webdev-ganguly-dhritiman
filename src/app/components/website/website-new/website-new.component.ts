import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  @ViewChild('f') websiteNewForm: NgForm;

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
    });
  }

  createWebsite() {
    this.website['name'] = this.websiteNewForm.value.siteName;
    this.website['description'] = this.websiteNewForm.value.siteDesc;
    this.website = this.websiteService.createWebsite(this.userId, this.website);
  }

}
