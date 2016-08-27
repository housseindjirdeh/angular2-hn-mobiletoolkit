import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdProgressBar } from '@angular2-material/progress-bar';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FromUnixPipe, TimeAgoPipe } from 'angular2-moment/src';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

export interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: Date;
  title: string;
  type: string;
  url: string;
}

@Component({
  moduleId: module.id,
  selector: 'item',
  template:` 
  <div class="loading-bars" *ngIf="!item$">
    <md-progress-bar mode="indeterminate" color="warn" class="long"></md-progress-bar>
    <md-progress-bar mode="indeterminate" color="warn" class="short"></md-progress-bar>
  </div>
  <div *ngIf="item$">
    <p *ngIf="item$.url"> 
      <a class="title" href="{{item$.url}}">
        {{item$.title}}
      </a>
      <span class="domain">{{shortenDomain(item$.url)}}</span>
    </p>
    <p *ngIf="!item$.url">
      <a class="title" [routerLink]="['/item', item$.id]" routerLinkActive="active">
        {{item$.title}}
      </a>
    </p>
    <div class="subtext-laptop">
      <span *ngIf="item$.type !== 'job'">
        {{item$.score}} points by 
        <a [routerLink]="['/user', item$.by]" routerLinkActive="active">{{item$.by}}</a>
      </span> 
      <span [class.item-details]="item$.type !== 'job'">
        {{ (item$.time | amFromUnix) | amTimeAgo }}
        <span *ngIf="item$.type !== 'job'"> |
          <a [routerLink]="['/item', item$.id]" routerLinkActive="active">
            <span *ngIf="item$.descendants !== 0">
              {{item$.descendants}}
              <span *ngIf="item$.descendants === 1">comment</span>
              <span *ngIf="item$.descendants > 1">comments</span>
            </span>
            <span *ngIf="item$.descendants === 0">discuss</span>
          </a>
        </span>
      </span> 
    </div>
    <div class="subtext-palm">
      <div class="details" *ngIf="item$.type !== 'job'">
        <span class="name"> <a [routerLink]="['/user', item$.by]" routerLinkActive="active">{{item$.by}}</a></span>
        <span class="right">{{item$.score}} ★</span>
      </div>
      <div class="details">
      {{ (item$.time | amFromUnix) | amTimeAgo }}
      <span *ngIf="item$.type !== 'job'"> • 
        <a [routerLink]="['/item', item$.id]" routerLinkActive="active">
          <span *ngIf="item$.descendants !== 0">
            {{item$.descendants}}
            <span *ngIf="item$.descendants === 1">comment</span>
            <span *ngIf="item$.descendants > 1">comments</span>
          </span>
          <span *ngIf="item$.descendants === 0">discuss</span>
        </a>
      </span>
      </div>
    </div>
  </div>
   `,
  pipes: [FromUnixPipe, TimeAgoPipe],
  providers: [HackerNewsAPIService],
  styles: [`
    p {
      margin: 2px 0;
    }

    @media screen and (max-width: 768px) {
      p {
        margin-bottom: 5px;
        margin-top: 0;
      }
    }

    a {
      color: #000;
      cursor: pointer;
      text-decoration: none;
    }

    .title {
      font-size: 16px;
    }

    .title:visited {
      color: #828282;
    }

    .subtext-laptop {
      font-size: 12px;
    }

    .subtext-palm {
      font-size: 13px;
    }

    .upvotes-icon {
      font-size: 15px;
    }

    .domain,
    .subtext-laptop, .subtext-palm {
      color: #828282;
      font-weight: bold;
      letter-spacing: 0.5px;
    }

    .domain a,
    .subtext-laptop a,
    .subtext-palm a {
      color: #B13138;
    }

    .subtext-laptop a:hover,
    .subtext-palm a:hover {
      text-decoration: underline;
    }

    .subtext-palm .details {
      margin-top: 5px;
    }

    .subtext-palm .details .right {
      float: right;
    }

    @media screen and (max-width: 768px) {
      .subtext-laptop {
        display: none;
      }
    }

    @media screen and (min-width: 769px) {
      .subtext-palm {
        display: none;
      }
    }

    .item-details {
      padding: 10px;
    }

    .long {
      margin: 0px 20px 0;
      width: 20%;
    }

    .short {
      margin: 8px 20px;
      width: 10%;
    }

    .loading-bars {
      margin: -12px 0 0 -20px;
    }

    @media screen and (max-width: 768px) {
      .loading-bars {
        margin: 15px 0 15px -20px;
      }
    }
  `],
  directives: [MdProgressBar, ROUTER_DIRECTIVES]
})
export default class ItemComponent {
  @Input() itemID: number;
  item$: Observable<Item>; 

  constructor(private _hackerNewsAPIService: HackerNewsAPIService) {}

  ngOnInit() {
    this._hackerNewsAPIService.fetchItem(this.itemID).subscribe(data => {
      this.item$ = data;
    }, error => console.log('Could not load item'));
  }

  shortenDomain(url) {
    // Should use a pipe for this, but pipes seem to break the App Shell :(
    if (url) {
      var domain = '(' + url.split('/')[2] + ')';
      return domain ? domain.replace('www.', '') : '';
    }
  }
}