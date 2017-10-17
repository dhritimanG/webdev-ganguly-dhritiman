import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';


@Injectable()

export class PageService {

  constructor() {

  }

  pages: Page[] = [
    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
  ];

  createPage(webiteId, page) {
    page._id = Math.random()
    page.websiteId = webiteId;
    this.pages.push(page);
    return page;
  }

  findPagesByWebsiteId(websiteId) {
    return this.pages.filter(function (page) {
      return page.websiteId;
    });
  }

  findPageById(pageId) {
    return this.pages.find(function (page) {
      return page._id === pageId;
    });
  }

  updatePage(pageId, page) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        this.pages[x].name = page.name;
        this.pages[x].description = page.description;
        return this.pages[x];
      }
    }
  }

  deletePage(pageId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        delete this.pages[x];
      }
    }
  }


}
