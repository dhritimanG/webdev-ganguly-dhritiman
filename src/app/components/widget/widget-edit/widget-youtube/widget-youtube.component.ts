import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  vidName: String;
  vidText: String;
  urlYoutube: String;
  vidWidth: String;
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
        this.vidName = this.widget['name'];
        this.vidText = this.widget['text'];
        this.urlYoutube = this.widget['url'];
        this.vidWidth = this.widget['width'];
      }
    });
  }

  createWidget() {
    this.widget['widgetType'] = 'YOUTUBE';
    this.widget['name'] = this.vidName;
    this.widget['text'] = this.vidText;
    this.widget['url'] = this.urlYoutube;
    this.widget['width'] = this.vidWidth;
    this.widgetService.createWidget(this.pageId, this.widget);
  }

  updateWidget() {
    this.widget['widgetType'] = 'YOUTUBE';
    this.widget['name'] = this.vidName;
    this.widget['text'] = this.vidText;
    this.widget['url'] = this.urlYoutube;
    this.widget['width'] = this.vidWidth;
    this.widgetService.updateWidget(this.widgetId, this.widget);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

}
