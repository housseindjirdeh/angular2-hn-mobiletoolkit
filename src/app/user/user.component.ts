import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { FromUnixPipe, TimeAgoPipe } from 'angular2-moment/src';
import { Title } from '@angular/platform-browser';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

export interface User {
  about: string;
  created: Date;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}

@Component({
  moduleId: module.id,
  selector: 'user',
  template:` 
  <div *ngIf="user$" class="profile">
    <div class="main-details">
      <span class="name">{{ user$.id }}</span>
      <span class="right">{{ user$.karma }} ★</span>
      <p class="age">Created {{ (user$.created | amFromUnix) | amTimeAgo }}</p>
    </div>
    <div class="other-details" *ngIf="user$.about">
      <p [innerHTML]="user$.about"></p>
    </div>
  </div>
   `,
  pipes: [FromUnixPipe, TimeAgoPipe],
  providers: [HackerNewsAPIService, Title],
  styles: [`
    .profile {
      padding: 30px;
    }

    .main-details .name {
      color: #B13138;
      font-weight: bold; 
      font-size: 32px;
      letter-spacing: 2px;
    }


    @media screen and (max-width: 768px) {
      .main-details .name {
        font-size: 18px;
      }
    }

    .main-details .age {
      font-weight: bold;
      color: #828282;
      padding-bottom: 0;
    }

    .main-details .right {
      float: right;
      color: #B13138;
      font-weight: bold; 
      font-size: 32px;
      letter-spacing: 2px;
    }

    @media screen and (max-width: 768px) {
      .main-details .right {
        font-size: 18px;
      }
    }

    .other-details {
      word-wrap: break-word;
    }
  `]
})

export default class UserComponent {
  private sub: any;
  user$: Observable<User>; 

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService, 
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let userID = params['id'];
      this._hackerNewsAPIService.fetchUser(userID).subscribe(data => {
        this.user$ = data;
        this.titleService.setTitle('Profile: ' + data.id + ' | Angular 2 HN');
      }, error => console.log('Could not load user'));
    });
  }
}