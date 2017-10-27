import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';



@Injectable()

export class PageService {

  constructor(private http: Http) {

  }

  pages: Page[] = [
    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
  ];

  createPage(websiteId, page) {
    // page._id = Math.random()
    // page.websiteId = webiteId;
    // this.pages.push(page);
    // return page;
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this.http.post(url, page)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findPagesByWebsiteId(websiteId) {
    // return this.pages.filter(function (page) {
    //   return page.websiteId === websiteId;
    // });
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this.http.get(url)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findPageById(pageId) {
    // return this.pages.find(function (page) {
    //   return page._id === pageId;
    // });
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this.http.get(url)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  updatePage(pageId, page) {
    // for (let x = 0; x < this.pages.length; x++) {
    //   if (this.pages[x]._id === pageId) {
    //     this.pages[x].name = page.name;
    //     this.pages[x].description = page.description;
    //     return this.pages[x];
    //   }
    // }
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this.http.put(url, page)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  deletePage(pageId) {
    // for (let x = 0; x < this.pages.length; x++) {
    //   if (this.pages[x]._id === pageId) {
    //     delete this.pages[x];
    //   }
    // }
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this.http.delete(url)
      .map(
        (res: Response) => {
          return res.json();
        }
      );

  }


}
