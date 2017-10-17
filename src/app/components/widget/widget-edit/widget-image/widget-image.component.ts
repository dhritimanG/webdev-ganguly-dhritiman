import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  imgName: String;
  imgText: String;
  imgUrl: String;
  imgWidth: String;
  uploadImage: String;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widgetEdit: Boolean;
  widget = {};

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      if (this.widgetId) {
        this.widget = this.widgetService.findWidgetById(this.widgetId);
        this.widgetEdit = true;
        this.imgName = this.widget['name'];
        this.imgText = this.widget['text'];
        this.imgUrl = this.widget['url'];
        this.imgWidth = this.widget['width'];
        this.uploadImage = this.widget['upload'];
      }
    });
  }

  createWidget() {
    this.widget['widgetType'] = 'IMAGE';
    this.widget['text'] = this.imgText;
    this.widget['url'] = this.imgUrl;
    this.widget['width'] = this.imgWidth;
    this.widget['upload'] = this.uploadImage;
    this.widget['name'] = this.imgName;
    this.widgetService.createWidget(this.pageId, this.widget);
  }

  updateWidget() {
    this.widget['widgetType'] = 'IMAGE';
    this.widget['text'] = this.imgText;
    this.widget['url'] = this.imgUrl;
    this.widget['width'] = this.imgWidth;
    this.widget['upload'] = this.uploadImage;
    this.widget['name'] = this.imgName;
    this.widgetService.updateWidget(this.widgetId, this.widget);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

}
