import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  textHeader: string;
  sizeHeader: string;
  userId: string;
  wid: string;
  pid: string;
  wgid: string;
  widget = {};
  widgets = [{}];

  constructor(private widgetService: WidgetService,
              private activatedRoutes: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(params => {
      this.userId = params['userId'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.wgid = params['wgid'];
      if (this.wgid) {
        this.widgetService.findWidgetById(this.wgid)
          .subscribe(
            (widget: any) => {
              this.widget = widget;
              this.textHeader = widget['text'];
              this.sizeHeader = widget['size'];
            }
          );
      }
    });
  }

  create() {
    this.widget['type'] = 'HEADING';
    this.widget['text'] = this.textHeader;
    this.widget['size'] = this.sizeHeader;
    this.widgetService.createWidget(this.pid, this.widget)
      .subscribe((data) => {
        if (data) {
          this.widget = data;
          this.router.navigate(['/user', this.userId,
            'website', this.wid, 'page', this.pid, 'widget']);
        }
      });
  }

  update() {
    this.widget['type'] = 'HEADING';
    this.widget['text'] = this.textHeader;
    this.widget['size'] = this.sizeHeader;
    this.widgetService.updateWidget(this.wgid, this.widget)
      .subscribe(
        (widgets: any) => {
          this.router.navigate(['user/' + this.userId, 'website', this.wid, 'page', this.pid, 'widget']);
        }
      );
  }

  delete() {
    this.widgetService.deleteWidget(this.wgid)
      .subscribe(
        (widgets: any) => {
          this.router.navigate(['user/' + this.userId, 'website', this.wid, 'page', this.pid, 'widget']);
        }
      );
  }

}
