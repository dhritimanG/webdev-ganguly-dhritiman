import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: String;
  websiteId: String;
  page = {};
  pageId: String;
  pages = [{}];
  pageName: String;
  pageDesc: String;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.page = this.pageService.findPageById(this.pageId);
      this.pageName = this.page['name'];
      this.pageDesc = this.page['description'];
      this.pageService.findPagesByWebsiteId(this.websiteId)
        .subscribe((pages) => {
        if (pages) {
          this.pages = pages;
        }
        });
      this.pageService.findPageById(this.pageId)
        .subscribe((page) => {
        if (page) {
          this.page = page;
          this.pageName = this.page['name'];
          this.pageDesc = this.page['description'];
        }
      });
    });
  }

  editPage() {
    // this.page['name'] = this.pageName;
    // this.page['description'] = this.pageDesc;
    // this.page = this.pageService.updatePage(this.pageId, this.page);
    this.page['name'] = this.pageName;
    this.page['description'] = this.pageDesc;
    this.pageService.updatePage(this.pageId, this.page)
      .subscribe((page) => {
        this.page = page;
      });
  }

  deletePage() {
    this.pageService.deletePage(this.pageId)
      .subscribe((pages) => {
        this.pages = pages;

      });
  }

}
