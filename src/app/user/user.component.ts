import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

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
  <div *ngIf="!user$">
    ...
  </div>
  <div *ngIf="user$" class="profile">
    <div class="main-details">
      <span class="name">{{ user$.id }}</span>
      <span class="age">{{ timeAgo(user$.created) }}</span>
      <span class="right">{{ user$.karma }} ★</span>
    </div>
    <div class="other-details" *ngIf="user$.about">
      <p [innerHTML]="user$.about"></p>
    </div>
  </div>
   `,
  providers: [HackerNewsAPIService],
  styles: [`
    .profile {
      padding: 30px;
    }

    .main-details {
      padding-bottom: 10px;
    }

    .main-details .name {
      color: #B13138;
      font-weight: bold; 
      font-size: 32px;
      letter-spacing: 2px;
    }

    .main-details .age {
      font-weight: bold;
      color: #828282;
    }

    .main-details .right {
      float: right;
      color: #B13138;
      font-weight: bold; 
      font-size: 32px;
      letter-spacing: 2px;
    }

    .other-details {
      padding-top: 10px;
    }
  `]
})

export default class UserComponent {
  private sub: any;
  user$: Observable<User>; 

  constructor(private _hackerNewsAPIService: HackerNewsAPIService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let userID = params['id'];
      this._hackerNewsAPIService.fetchUser(userID).subscribe(data => {
        this.user$ = data;
      }, error => console.log('Could not load user'));
    });
  }

  timeAgo(unix) {
    // Should use a pipe for this, but pipes seem to break the App Shell :(
    let date = +new Date(unix*1000);
    let seconds: number = Math.floor((+new Date() - date) / 1000);
    let interval: number = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + ' years old';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months old';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days old';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours old';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes old';
    }
    
    return 'a few seconds old';
  }
}