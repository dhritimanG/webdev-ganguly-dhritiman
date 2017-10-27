import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pageNewForm: NgForm;

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
    // this.activatedRoute.params.subscribe(params => {
    //   this.userId = params['userId'];
    //   this.websiteId = params['wid'];
    //   this.pageId = params['pid'];
    //   this.pages = this.pageService.findPagesByWebsiteId(this.websiteId);
    // });
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.pageService.findPagesByWebsiteId(this.websiteId)
        .subscribe((pages) => {
          this.pages = pages;
        });
    });
  }

  createPage() {
    this.page['name'] = this.pageNewForm.value.pageName;
    this.page['description'] = this.pageNewForm.value.pageDesc;
    this.pageService.createPage(this.websiteId, this.page)
      .subscribe((page) => {
        this.page = page;
      });
  }

}
