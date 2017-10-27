import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';


@Injectable()

export class WidgetService {

  constructor(private http: Http) {}
  baseUrl = environment.baseUrl;


  widgets = [
    {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},
    {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
      'url': 'https://i.pinimg.com/originals/a2/2a/0a/a22a0a7e624943303b23cc326598c167.jpg'
    },
    {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
    {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
      'url': 'https://www.youtube.com/embed/vlDzYIIOYmM'
    },
    {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
  ];

  createWidget(pageId, widget) {
    // widget._id = Math.random();
    // widget.pageId = pageId;
    // this.widgets.push(widget);
    // return widget;
    const url = this.baseUrl +  '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findWidgetsByPageId(pageId) {
    const url = this.baseUrl +  '/api/page/' + pageId + '/widget';
    return this.http.get(url)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findWidgetById(widgetId) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  updateWidget(widgetId, widget) {
    // for (let x = 0; x < this.widgets.length; x++) {
    //   if (this.widgets[x]._id === widgetId) {
    //     switch (widget['type']) {
    //       case 'HTML':
    //         this.widgets[x]['text'] = widget['text'];
    //         break;
    //       case 'HEADING':
    //         this.widgets[x]['size'] = widget['size'];
    //         this.widgets[x]['text'] = widget['text'];
    //         break;
    //       case 'IMAGE':
    //         this.widgets[x]['width'] = widget['width'];
    //         this.widgets[x]['url'] = widget['url'];
    //         break;
    //       case 'YOUTUBE':
    //         this.widgets[x]['width'] = widget['width'];
    //         this.widgets[x]['url'] = widget['url'];
    //         break;
    //     }
    //     this.widgets[x]._id = widgetId;
    //     return this.widgets[x];
    //   }
    // }
    const url = this.baseUrl +  '/api/widget/' + widgetId;
    return this.http.put(url, widget)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  deleteWidget(widgetId) {
    // for (let x = 0; x < this.widgets.length; x++) {
    //   if (this.widgets[x]._id === widgetId) {
    //     delete this.widgets[x];
    //   }
    // }
    const url = this.baseUrl +  '/api/widget/' + widgetId;
    return this.http.delete(url)
      .map(
        (res: Response) => {
          return res.status;
        }
      );
  }
}
