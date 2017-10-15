import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  username: String;
  password: String;

  constructor(private router: Router) {

  }

  landing(username: String, password: String) {
  this.router.navigate(['./profile']);
}

  ngOnInit() {
  }

}
