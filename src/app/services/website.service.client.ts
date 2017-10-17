import {Website} from '../models/website.model.client';
import {Injectable} from '@angular/core';

// injecting service into module
@Injectable()

export class WebsiteService {

  constructor() {}

  websites: Website[] = [
    {'_id': '123', 'name': 'Facebook', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '234', 'name': 'Tweeter', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '890', 'name': 'Go', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '678', 'name': 'Checkers', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '789', 'name': 'Chess', 'developerId': '234', 'description': 'Lorem'}
  ];

  createWebsite(userId, website) {
    website._id = Math.random();
    website.developerId = userId;
    this.websites.push(website);
    return website;
  }

  findWebsitesByUser(userId) {
    return this.websites.filter(function (website) {
      return website.developerId === userId;
    });
  }

  findWebsiteById(websiteId) {
    return this.websites.find(function (website) {
      return website._id === websiteId;
    });
  }

  updateWebsite(websiteId, website) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        this.websites[x].name = website.name;
        this.websites[x].description = website.description;
        return this.websites[x];
      }
    }
  }

  deleteWebsite(websiteId) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        delete this.websites[x];
      }
    }
  }


}
